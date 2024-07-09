import type { DiscordGuildApplicationCommandPermissions } from '@discordeno/types'
import type { Bot, GuildApplicationCommandPermissions } from '../index.js'

export function transformApplicationCommandPermission(
  bot: Bot,
  payload: DiscordGuildApplicationCommandPermissions,
): GuildApplicationCommandPermissions {
  const applicationCommandPermission = {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission,
    })),
  } as GuildApplicationCommandPermissions

  return bot.transformers.customizers.applicationCommandPermission(bot, payload, applicationCommandPermission)
}
