import {
  bgBlack,
  bgGreen,
  bgMagenta,
  bgYellow,
  black,
  green,
  Interaction,
  InteractionResponseTypes,
  red,
  sendPrivateInteractionResponse,
  white,
} from "../../../../deps.ts";
import logger from "../../../../src/utils/logger.ts";
import { optionParser, translateOptionNames } from "../../../utils/options.ts";
import { privateReplyToInteraction, replyToInteraction } from "../../../utils/replies.ts";
import slashLogWebhook from "../../../utils/slashWebhook.ts";
import { BotClient } from "../../botClient.ts";
import { loadLanguage, serverLanguages, translate } from "../../languages/translate.ts";
import { Command, ConvertArgumentDefinitionsToArgs } from "../../types/command.ts";
import commands from "./mod.ts";

function logCommand(
  info: Interaction,
  type: "Failure" | "Success" | "Trigger" | "Slowmode" | "Missing" | "Inhibit",
  commandName: string,
) {
  const command = `[COMMAND: ${bgYellow(black(commandName || "Unknown"))} - ${
    bgBlack(
      ["Failure", "Slowmode", "Missing"].includes(type) ? red(type) : type === "Success" ? green(type) : white(type),
    )
  }]`;

  const user = bgGreen(
    black(
      `${info.user.username}#${info.user.discriminator}(${info.id})`,
    ),
  );
  const guild = bgMagenta(
    black(`${info.guildId ? `Guild ID: (${info.guildId})` : "DM"}`),
  );

  logger.info(`${command} by ${user} in ${guild} with MessageID: ${info.id}`);
}

export async function executeSlashCommand(
  bot: BotClient,
  interaction: Interaction,
) {
  const data = interaction.data;
  const name = data?.name as keyof typeof commands;

  // deno-lint-ignore no-explicit-any
  const command: Command<any> | undefined = commands[name];

  // Command could not be found
  if (!command?.execute) {
    return await sendPrivateInteractionResponse(bot, interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: translate(
          bot,
          interaction.guildId!,
          "EXECUTE_COMMAND_NOT_FOUND",
        ),
      },
    })
      .catch(logger.error);
  }

  // HAVE TO CONVERT OUTSIDE OF TRY SO IT CAN BE USED IN CATCH TOO
  try {
    logCommand(interaction, "Trigger", name);

    // Load the language for this guild
    if (interaction.guildId && !serverLanguages.has(interaction.guildId)) {
      // TODO: Check if this is deferrable
      await replyToInteraction(bot, interaction, {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      });
      loadLanguage(interaction.guildId);
    } // Load the language for this guild
    else if (command.acknowledge) {
      // Acknowledge the command
      await replyToInteraction(bot, interaction, {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      });
    }

    // FIRST GET THE TRANSLATIONS FOR ALL OPTIONS
    const translatedOptionNames = interaction.guildId && command.options
      ? translateOptionNames(bot, interaction.guildId, command.options)
      : {};

    // PARSE THE OPTIONS TO A NICE OBJECT AND TRANSLATE THE KEYS TO ENGLISH
    const parsedArguments = optionParser(
      interaction.data?.options,
      interaction.data?.resolved,
      translatedOptionNames,
    );

    await command.execute(
      bot,
      interaction,
      // deno-lint-ignore no-explicit-any
      parsedArguments as ConvertArgumentDefinitionsToArgs<any>,
    );
    logCommand(interaction, "Success", name);
  } catch (error) {
    console.error(error);
    logCommand(interaction, "Failure", name);
    await slashLogWebhook(bot, interaction, name).catch(logger.error);
    return await privateReplyToInteraction(bot, interaction, {
      content: translate(bot, interaction.id, "EXECUTE_COMMAND_ERROR"),
    }).catch(logger.error);
  }
}
