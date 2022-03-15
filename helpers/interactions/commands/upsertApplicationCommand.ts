import type { Bot } from "../../../bot.ts";
import { makeOptionsForCommand } from "./createApplicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { ApplicationCommandOption } from "../../../transformers/applicationCommandOption.ts";
import { ApplicationCommandTypes } from "../../../types/shared.ts";

/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(
  bot: Bot,
  commandId: bigint,
  options: EditGlobalApplicationCommand,
  guildId?: bigint,
) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "patch",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, commandId),
    {
      name: options.name,
      description: options.description,
      type: options.type,
      options: options.options ? makeOptionsForCommand(options.options) : undefined,
    },
  );

  return bot.transformers.applicationCommand(bot, result);
}

/** https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command-json-params */
export interface EditGlobalApplicationCommand {
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The type of the command */
  type?: ApplicationCommandTypes;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
  /** Whether the command is enabled by default when the app is added to a guild. Default: true */
  defaultPermission?: boolean;
}
