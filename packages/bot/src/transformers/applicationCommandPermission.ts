import { DiscordGuildApplicationCommandPermissions, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommandPermission (bot: Bot, payload: DiscordGuildApplicationCommandPermissions) {
  const applicationCommandPermission = {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission
    }))
  }

  return applicationCommandPermission as Optionalize<typeof applicationCommandPermission>
}

export interface ApplicationCommandPermission extends ReturnType<typeof transformApplicationCommandPermission> { }
