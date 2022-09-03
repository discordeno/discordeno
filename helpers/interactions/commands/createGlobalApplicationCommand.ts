import type { Bot } from "../../../bot.ts";
import { ApplicationCommand, ApplicationCommandOption, ApplicationCommandTypes, Localization } from "../../../mod.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { PermissionStrings } from "../../../types/shared.ts";

export async function createGlobalApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "POST",
    bot.constants.routes.COMMANDS(bot.applicationId),
    transformCreateApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}

export type CreateApplicationCommand = CreateSlashApplicationCommand | CreateContextApplicationCommand;

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateSlashApplicationCommand {
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
export interface CreateContextApplicationCommand
  extends Omit<CreateSlashApplicationCommand, "options" | "description" | "descriptionLocalizations"> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User;
}

export function isContextApplicationCommand(
  command: CreateApplicationCommand,
): command is CreateContextApplicationCommand {
  return command.type === ApplicationCommandTypes.Message || command.type === ApplicationCommandTypes.User;
}

export function transformCreateApplicationCommand(bot: Bot, command: CreateApplicationCommand) {
  if (isContextApplicationCommand(command)) {
    return {
      name: command.name,
      name_localizations: command.nameLocalizations,
      type: command.type,
      default_member_permissions: command.defaultMemberPermissions
        ? bot.utils.calculateBits(command.defaultMemberPermissions)
        : undefined,
      dm_permission: command.dmPermission,
    };
  }

  return {
    name: command.name,
    name_localizations: command.nameLocalizations,
    description: command.description,
    description_localizations: command.descriptionLocalizations,
    type: command.type,
    options: command.options?.map((option) => bot.transformers.reverse.applicationCommandOption(bot, option)),
    default_member_permissions: command.defaultMemberPermissions
      ? bot.utils.calculateBits(command.defaultMemberPermissions)
      : undefined,
    dm_permission: command.dmPermission,
  };
}
