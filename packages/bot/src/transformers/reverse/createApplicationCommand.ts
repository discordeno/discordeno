import { calculateBits } from '@discordeno/utils'
import type { ApplicationCommandOption, Bot, CreateApplicationCommand, DiscordCreateApplicationCommand } from '../../index.js'

export function transformCreateApplicationCommandToDiscordCreateApplicationCommand(
  bot: Bot,
  payload: CreateApplicationCommand,
): DiscordCreateApplicationCommand {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    type: payload.type,
    options: payload.options?.map((option) => bot.transformers.reverse.applicationCommandOption(bot, option as unknown as ApplicationCommandOption)),
    default_member_permissions: payload.defaultMemberPermissions
      ? typeof payload.defaultMemberPermissions === 'string'
        ? payload.defaultMemberPermissions
        : calculateBits(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission ?? undefined,
  }
}
