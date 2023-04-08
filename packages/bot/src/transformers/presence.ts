import { PresenceStatus, type DiscordPresenceUpdate } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformPresence(bot: Bot, payload: DiscordPresenceUpdate) {
  const presence = {
    user: bot.transformers.user(bot, payload.user),
    guildId: bot.transformers.snowflake(payload.guild_id),
    status: PresenceStatus[payload.status],
    activities: payload.activities.map((activity) => bot.transformers.activity(bot, activity)),
    desktop: payload.client_status.desktop,
    mobile: payload.client_status.mobile,
    web: payload.client_status.web,
  }

  return presence as Optionalize<typeof presence>
}

export interface PresenceUpdate extends ReturnType<typeof transformPresence> {}
