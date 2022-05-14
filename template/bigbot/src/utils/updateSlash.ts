import { DEV_GUILD_ID } from "../../configs.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Bot } from "../../deps.ts";
import { BotClient } from "../bot/botClient.ts";
import { updateCommandVersion } from "../bot/database/commandVersion.ts";
import commands from "../bot/events/interactions/mod.ts";
import { serverLanguages, translate } from "../bot/languages/translate.ts";
import { ArgumentDefinition } from "../bot/types/command.ts";

export async function updateDevCommands(bot: Bot) {
  if (!DEV_GUILD_ID) return;

  const cmds = Object.entries(commands)
    // ONLY DEV COMMANDS
    .filter(([_name, command]) => command.dev);

  if (!cmds.length) return;

  // DEV RELATED COMMANDS
  await bot.helpers.upsertApplicationCommands(
    cmds.map(([name, command]) => {
      const translatedName = translate(bot, DEV_GUILD_ID, command.name);
      const translatedDescription = command.description ? translate(bot, DEV_GUILD_ID, command.description) : "";

      if (command.type && command.type !== ApplicationCommandTypes.ChatInput) {
        return {
          name: (translatedName || name).toLowerCase(),
          type: command.type,
        };
      }

      return {
        name: (translatedName || name).toLowerCase(),
        description: translatedDescription || command!.description,
        options: command.options ? createOptions(bot, DEV_GUILD_ID, command.options, command.name) : undefined,
      };
    }),
    DEV_GUILD_ID,
  );
}

// USED TO CACHE CONVERTED COMMANDS AFTER START TO PREVENT UNNECESSARY LOOPS
const convertedCache = new Map<string, ApplicationCommandOption[]>();

/** Creates the commands options including subcommands. Also translates them. */
function createOptions(
  bot: Bot,
  guildId: bigint | "english",
  options: ArgumentDefinition[],
  commandName?: string,
): ApplicationCommandOption[] | undefined {
  const language = guildId === "english" ? "english" : serverLanguages.get(guildId) ?? "english";
  if (commandName && convertedCache.has(`${language}-${commandName}`)) {
    return convertedCache.get(`${language}-${commandName}`)!;
  }

  const newOptions: ApplicationCommandOption[] = [];

  for (const option of options || []) {
    const optionName = translate(bot, guildId, option.name);
    const optionDescription = translate(bot, guildId, option.description);

    // TODO: remove this ts ignore
    // @ts-ignore ts stop being dumb
    const choices = option.choices?.map((choice) => ({
      ...choice,
      name: translate(bot, guildId, choice.name),
    }));

    newOptions.push({
      ...option,
      name: optionName.toLowerCase(),
      description: optionDescription || "No description available.",
      choices,
      // @ts-ignore fix this
      options: option.options
        ? // @ts-ignore fix this
          createOptions(bot, guildId, option.options)
        : undefined,
    } as ApplicationCommandOption);
  }
  if (commandName) convertedCache.set(`${language}-${commandName}`, newOptions);

  return newOptions;
}

export async function updateGlobalCommands(bot: Bot) {
  // UPDATE GLOBAL COMMANDS
  await bot.helpers.upsertApplicationCommands(
    Object.entries(commands)
      // ONLY GLOBAL COMMANDS
      .filter(([_name, command]) => command?.global && !command.dev)
      .map(([name, command]) => {
        return {
          name,
          description: translate(bot, "english", command.description),
          options: createOptions(bot, "english", command.options, command.name),
        };
      }),
  );
}

export async function updateGuildCommands(bot: BotClient, guildId: bigint) {
  if (guildId === DEV_GUILD_ID) return await updateDevCommands(bot);

  await updateCommandVersion(bot, guildId);

  Object.entries(commands)
    // ONLY GUILD COMMANDS
    .filter(([_name, command]) => !command.global && !command.dev)
    .map(([name, command]) => {
      // USER OPTED TO USE BASIC VERSION ONLY
      if (command.advanced === false) {
        return {
          name,
          description: translate(bot, "english", command.description),
          options: command.options,
        };
      }

      // ADVANCED VERSION WILL ALLOW TRANSLATION
      const translatedName = translate(bot, guildId, command.name);
      const translatedDescription = translate(bot, guildId, command.description);

      return {
        name: translatedName.toLowerCase(),
        description: translatedDescription,
        options: createOptions(bot, guildId, command.options, command.name),
      };
    }),
    // GUILD RELATED COMMANDS
    await bot.helpers.upsertApplicationCommands(
      Object.entries(commands)
        // ONLY GUILD COMMANDS
        .filter(([_name, command]) => !command.global && !command.dev)
        .map(([name, command]) => {
          // USER OPTED TO USE BASIC VERSION ONLY
          if (command.advanced === false) {
            return {
              name,
              description: command!.description || "No description available.",
              options: command!.options,
            };
          }

          // ADVANCED VERSION WILL ALLOW TRANSLATION
          const translatedName = translate(bot, guildId, command.name);
          const translatedDescription = translate(bot, guildId, command.description);

          return {
            name: (translatedName || name).toLowerCase(),
            description: translatedDescription || command!.description,
            options: createOptions(bot, guildId, command.options, command.name),
          };
        }),
      guildId,
    );
}
