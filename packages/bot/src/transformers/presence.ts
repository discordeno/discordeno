import { type DiscordPresenceUpdate, PresenceStatus } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import type { PresenceUpdate, User } from './types.js'

export function transformPresence(bot: Bot, payload: DiscordPresenceUpdate): PresenceUpdate {
  const presence = {} as SetupDesiredProps<PresenceUpdate, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (payload.user) presence.user = bot.transformers.user(bot, payload.user) as User
  if (payload.guild_id) presence.guildId = bot.transformers.snowflake(payload.guild_id)
  if (payload.status) presence.status = PresenceStatus[payload.status]
  if (payload.activities) presence.activities = payload.activities.map((activity) => bot.transformers.activity(bot, activity))
  if (payload.client_status.desktop) presence.desktop = payload.client_status.desktop
  if (payload.client_status.mobile) presence.mobile = payload.client_status.mobile
  if (payload.client_status.web) presence.web = payload.client_status.web

  return bot.transformers.customizers.presence(bot, payload, presence)
}
