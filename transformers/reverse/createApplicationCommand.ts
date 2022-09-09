import { Bot } from "../../bot.ts";
import {
  CreateApplicationCommand,
  DiscordCreateApplicationCommand,
  isContextApplicationCommand,
} from "../../types/mod.ts";

export function transformCreateApplicationCommandToDiscordCreateApplicationCommand(
  bot: Bot,
  payload: CreateApplicationCommand,
): DiscordCreateApplicationCommand {
  if (isContextApplicationCommand(payload)) {
    return {
      name: payload.name,
      name_localizations: payload.nameLocalizations,
      description: "",
      description_localizations: {},
      type: payload.type,
      default_member_permissions: payload.defaultMemberPermissions
        ? bot.utils.calculateBits(payload.defaultMemberPermissions)
        : null,
      dm_permission: payload.dmPermission,
    };
  }

  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    type: payload.type,
    options: payload.options?.map((option) => bot.transformers.reverse.applicationCommandOption(bot, option)),
    default_member_permissions: payload.defaultMemberPermissions
      ? bot.utils.calculateBits(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission,
  };
}
