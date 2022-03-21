import type { Bot } from "../../../bot.ts";
import { ApplicationCommandOption, ApplicationCommandTypes } from "../../../mod.ts";
import { DiscordApplicationCommand, DiscordApplicationCommandOption } from "../../../types/discord.ts";

/**
 * There are two kinds of Application Commands: global commands and guild commands. Global commands are available for every guild that adds your app; guild commands are specific to the guild you specify when making them. Command names are unique per application within each scope (global and guild). That means:
 *
 * - Your app **cannot** have two global commands with the same name
 * - Your app **cannot** have two guild commands within the same name **on the same guild**
 * - Your app **can** have a global and guild command with the same name
 * - Multiple apps **can** have commands with the same names
 *
 * Global commands are cached for **1 hour**. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
 * Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
 */
export async function createApplicationCommand(
  bot: Bot,
  options: CreateApplicationCommand | CreateContextApplicationCommand,
  guildId?: bigint,
) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "post",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId),
    isContextApplicationCommand(options) ? { name: options.name, type: options.type } : {
      name: options.name,
      description: options.description,
      type: options.type,
      options: options.options ? makeOptionsForCommand(options.options) : undefined,
    },
  );

  return bot.transformers.applicationCommand(bot, result);
}

export function makeOptionsForCommand(options: ApplicationCommandOption[]): DiscordApplicationCommandOption[] {
  return options.map((option) => ({
    type: option.type,
    name: option.name,
    description: option.description,
    required: option.required,
    choices: option.choices,
    options: option.options ? makeOptionsForCommand(option.options) : undefined,
    channel_types: option.channelTypes,
    autocomplete: option.autocomplete,
    min_value: option.minValue,
    max_value: option.maxValue,
  }));
}

/** https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command-json-params */
export interface CreateApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** The type of the command */
  type?: ApplicationCommandTypes;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
  /** Whether the command is enabled by default when the app is added to a guild. Default: true */
  defaultPermission?: boolean;
}

/** https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command-json-params */
export interface CreateContextApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User;
}

export function isContextApplicationCommand(
  cmd: CreateContextApplicationCommand | CreateApplicationCommand,
): cmd is CreateContextApplicationCommand {
  return cmd.type === ApplicationCommandTypes.Message || cmd.type === ApplicationCommandTypes.User;
}
