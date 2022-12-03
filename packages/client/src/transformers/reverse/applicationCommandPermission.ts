import { DiscordGuildApplicationCommandPermissions } from '@discordeno/types'
import { Client } from '../../client.js'
import { ApplicationCommandPermission } from '../applicationCommandPermission.js'

export function transformApplicationCommandPermissionToDiscordApplicationCommandPermission (
  client: Client,
  payload: ApplicationCommandPermission
): DiscordGuildApplicationCommandPermissions {
  return {
    id: client.transformers.reverse.snowflake(payload.id),
    application_id: client.transformers.reverse.snowflake(
      payload.applicationId
    ),
    guild_id: client.transformers.reverse.snowflake(payload.guildId),
    permissions: payload.permissions.map((perm) => ({
      id: client.transformers.reverse.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission
    }))
  }
}
