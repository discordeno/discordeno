import type { DiscordGuildApplicationCommandPermissions } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { ApplicationCommandPermission } from '../applicationCommandPermission.js'

export function transformApplicationCommandPermissionToDiscordApplicationCommandPermission (
  rest: RestManager,
  payload: ApplicationCommandPermission
): DiscordGuildApplicationCommandPermissions {
  return {
    id: rest.transformers.reverse.snowflake(payload.id),
    application_id: rest.transformers.reverse.snowflake(payload.applicationId),
    guild_id: rest.transformers.reverse.snowflake(payload.guildId),
    permissions: payload.permissions.map((perm) => ({
      id: rest.transformers.reverse.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission
    }))
  }
}
