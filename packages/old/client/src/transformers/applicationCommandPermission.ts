import type {
  DiscordGuildApplicationCommandPermissions,
  Optionalize
} from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandPermission (
  client: Client,
  payload: DiscordGuildApplicationCommandPermissions
) {
  const applicationCommandPermission = {
    id: client.transformers.snowflake(payload.id),
    applicationId: client.transformers.snowflake(payload.application_id),
    guildId: client.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: client.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission
    }))
  }

  return applicationCommandPermission as Optionalize<
    typeof applicationCommandPermission
  >
}

export interface ApplicationCommandPermission
  extends ReturnType<typeof transformApplicationCommandPermission> {}
