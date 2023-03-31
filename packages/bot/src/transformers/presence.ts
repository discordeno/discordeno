import { PresenceStatus, type DiscordPresenceUpdate } from '@discordeno/types'
import { iconHashToBigInt, type Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'
import { UserToggles } from './toggles/user.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformPresence(bot: Bot, payload: DiscordPresenceUpdate) {
  const presence = {
    user: {
      id: bot.transformers.snowflake(payload.user.id || ''),
      username: payload.user.username ?? undefined,
      discriminator: payload.user.discriminator ?? undefined,
      avatar: payload.user.avatar ? iconHashToBigInt(payload.user.avatar) : undefined,
      locale: payload.user.locale ?? undefined,
      email: payload.user.email ?? undefined,
      flags: payload.user.flags ?? undefined,
      premiumType: payload.user.premium_type ?? undefined,
      publicFlags: payload.user.public_flags ?? undefined,
      toggles: new UserToggles(payload.user),
    },
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
