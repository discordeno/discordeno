import type { ApplicationCommandPermissionTypes, DiscordGuildApplicationCommandPermissions } from '@discordeno/types'
import type { Bot } from '../index.js'

export function transformApplicationCommandPermission(bot: Bot, payload: DiscordGuildApplicationCommandPermissions): ApplicationCommandPermission {
  const applicationCommandPermission = {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission,
    })),
  } as ApplicationCommandPermission

  return bot.transformers.customizers.applicationCommandPermission(bot, payload, applicationCommandPermission)
}

export interface ApplicationCommandPermission {
  id: bigint
  guildId: bigint
  applicationId: bigint
  permissions: Array<{
    id: bigint
    type: ApplicationCommandPermissionTypes
    permission: boolean
  }>
}
