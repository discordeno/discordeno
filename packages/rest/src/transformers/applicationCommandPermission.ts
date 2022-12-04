import {
  DiscordGuildApplicationCommandPermissions,
  Optionalize
} from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandPermission (
  rest: RestManager,
  payload: DiscordGuildApplicationCommandPermissions
) {
  const applicationCommandPermission = {
    id: rest.transformers.snowflake(payload.id),
    applicationId: rest.transformers.snowflake(payload.application_id),
    guildId: rest.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: rest.transformers.snowflake(perm.id),
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
