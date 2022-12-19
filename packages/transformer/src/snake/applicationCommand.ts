import type { Camelize, DiscordApplicationCommand } from '@discordeno/types'
import { s1nakelize1ApplicationCommandOption } from './applicationCommandOption.js'

export function s1nakelize1ApplicationCommand (payload: Camelize<DiscordApplicationCommand>): DiscordApplicationCommand {
  return {
    id: payload.id,
    name: payload.name,
    type: payload.type,
    nsfw: payload.nsfw,
    version: payload.version,
    description: payload.description,

    guild_id: payload.guildId,
    application_id: payload.applicationId,
    dm_permission: payload.dmPermission,
    name_localizations: payload.nameLocalizations,
    default_member_permissions: payload.defaultMemberPermissions,
    description_localizations: payload.descriptionLocalizations,

    options: payload.options?.map((option) =>
      s1nakelize1ApplicationCommandOption(option)
    )
  }
}
