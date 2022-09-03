import { Bot } from "../../bot.ts";
import {
  CreateApplicationCommand,
  DiscordCreateApplicationCommand,
  isContextApplicationCommand,
} from "../../types/mod.ts";

export function transformCreateApplicationCommandToDiscordCreateApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
): DiscordCreateApplicationCommand {
  if (isContextApplicationCommand(command)) {
    return {
      name: command.name,
      name_localizations: command.nameLocalizations,
      description: "",
      description_localizations: {},
      type: command.type,
      default_member_permissions: command.defaultMemberPermissions
        ? bot.utils.calculateBits(command.defaultMemberPermissions)
        : null,
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
      : null,
    dm_permission: command.dmPermission,
  };
}
