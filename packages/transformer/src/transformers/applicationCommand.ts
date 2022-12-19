import type { Camelize, DiscordApplicationCommand } from '@discordeno/types'
import { c1amelize1ApplicationCommandOption } from './applicationCommandOption.js'

export function c1amelize1ApplicationCommand (
  payload: DiscordApplicationCommand
): Camelize<DiscordApplicationCommand> {
  return {
    id: payload.id,
    type: payload.type,
    applicationId: payload.application_id,
    guildId: payload.guild_id,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    options: payload.options?.map((option) =>
      c1amelize1ApplicationCommandOption(option)
    ),
    defaultMemberPermissions: payload.default_member_permissions,
    dmPermission: payload.dm_permission ?? false,
    nsfw: payload.nsfw ?? false,
    version: payload.version
  }
}
