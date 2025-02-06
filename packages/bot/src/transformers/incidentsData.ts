import type { DiscordIncidentsData } from '@discordeno/types'
import type { IncidentsData, InternalBot } from '../index.js'

export function transformIncidentsData(bot: InternalBot, payload: DiscordIncidentsData): typeof bot.transformers.$inferredTypes.incidentsData {
  const props = bot.transformers.desiredProperties.incidentsData
  const incidentsData = {} as IncidentsData

  if (props.invitesDisabledUntil && payload.invites_disabled_until) incidentsData.invitesDisabledUntil = Date.parse(payload.invites_disabled_until)
  if (props.dmsDisabledUntil && payload.dms_disabled_until) incidentsData.dmsDisabledUntil = Date.parse(payload.dms_disabled_until)
  if (props.dmSpamDetectedAt && payload.dm_spam_detected_at) incidentsData.dmSpamDetectedAt = Date.parse(payload.dm_spam_detected_at)
  if (props.raidDetectedAt && payload.raid_detected_at) incidentsData.raidDetectedAt = Date.parse(payload.raid_detected_at)

  return bot.transformers.customizers.incidentsData(bot, payload, incidentsData)
}
