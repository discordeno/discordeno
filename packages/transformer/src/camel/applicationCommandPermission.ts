import type {
  Camelize,
  DiscordGuildApplicationCommandPermissions
} from '@discordeno/types'

export function c1amelize1ApplicationCommandPermission (
  payload: DiscordGuildApplicationCommandPermissions
): Camelize<DiscordGuildApplicationCommandPermissions> {
  return {
    id: payload.id,
    applicationId: payload.application_id,
    guildId: payload.guild_id,
    permissions: payload.permissions.map((perm) => ({
      id: perm.id,
      type: perm.type,
      permission: perm.permission
    }))
  }
}
