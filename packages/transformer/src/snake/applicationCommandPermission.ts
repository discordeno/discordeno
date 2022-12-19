import type {
  Camelize,
  DiscordGuildApplicationCommandPermissions
} from '@discordeno/types'

export function s1nakelize1ApplicationCommandPermission (
  payload: Camelize<DiscordGuildApplicationCommandPermissions>
): DiscordGuildApplicationCommandPermissions {
  return {
    id: payload.id,
    permissions: payload.permissions,

    guild_id: payload.guildId,
    application_id: payload.applicationId
  }
}
