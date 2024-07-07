import { PresenceStatus, type DiscordPresenceUpdate } from '@discordeno/types'
import type { Bot, PresenceUpdate } from '../index.js'

export function transformPresence(bot: Bot, payload: DiscordPresenceUpdate): PresenceUpdate {
  const presence = {
    user: bot.transformers.user(bot, payload.user),
    guildId: bot.transformers.snowflake(payload.guild_id),
    status: PresenceStatus[payload.status],
    activities: payload.activities.map((activity) => bot.transformers.activity(bot, activity)),
    desktop: payload.client_status.desktop,
    mobile: payload.client_status.mobile,
    web: payload.client_status.web,
  } as PresenceUpdate

  return bot.transformers.customizers.presence(bot, payload, presence)
}
