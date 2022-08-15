import type { Bot } from "../../../bot.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Localization } from "../../../mod.ts";
import { DiscordApplicationCommand, DiscordApplicationCommandOption } from "../../../types/discord.ts";
import { AtLeastOne, PermissionStrings } from "../../../types/shared.ts";

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
    "POST",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.routes.COMMANDS(bot.applicationId),
    isContextApplicationCommand(options)
      ? { name: options.name, name_localizations: options.nameLocalizations, type: options.type }
      : {
        name: options.name,
        name_localizations: options.nameLocalizations,
        description: options.description,
        description_localizations: options.descriptionLocalizations,
        type: options.type,
        options: options.options ? makeOptionsForCommand(options.options) : undefined,
        default_member_permissions: options.defaultMemberPermissions
          ? bot.utils.calculateBits(options.defaultMemberPermissions)
          : undefined,
        dm_permission: options.dmPermission,
      },
  );

  return bot.transformers.applicationCommand(bot, result);
}

export function makeOptionsForCommand(options: ApplicationCommandOption[]): DiscordApplicationCommandOption[] {
  return options.map((option) => ({
    type: option.type,
    name: option.name,
    name_localizations: option.nameLocalizations,
    description: option.description,
    description_localizations: option.descriptionLocalizations,
    required: option.required,
    choices: option.choices?.map((choice) => ({
      name: choice.name,
      name_localizations: choice.nameLocalizations,
      value: choice.value,
    })),
    options: option.options ? makeOptionsForCommand(option.options) : undefined,
    channel_types: option.channelTypes,
    autocomplete: option.autocomplete,
    min_value: option.minValue,
    max_value: option.maxValue,
  }));
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateApplicationCommand {
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string;
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization;
  /** 1-100 character description */
  description: string;
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization;
  /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
  type?: ApplicationCommandTypes;
  /** Parameters for the command */
  options?: ApplicationCommandOption[];
  /** Set of permissions represented as a bit set */
  defaultMemberPermissions?: PermissionStrings[];
  /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dmPermission?: boolean;
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateContextApplicationCommand extends Omit<CreateApplicationCommand, "options"> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User;
}

export function isContextApplicationCommand(
  cmd: AtLeastOne<CreateContextApplicationCommand> | AtLeastOne<CreateApplicationCommand>,
): cmd is AtLeastOne<CreateContextApplicationCommand> {
  return cmd.type === ApplicationCommandTypes.Message || cmd.type === ApplicationCommandTypes.User;
}
