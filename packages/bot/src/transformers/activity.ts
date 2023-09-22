import type { ActivityTypes, Bot, DiscordActivity } from '../index.js'

export function transformActivity(bot: Bot, payload: DiscordActivity): Activity {
  const activity = {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    createdAt: payload.created_at,
    startedAt: payload.timestamps?.start,
    endedAt: payload.timestamps?.end,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji
      ? {
          name: payload.emoji.name,
          animated: payload.emoji.animated,
          id: payload.emoji.id ? bot.transformers.snowflake(payload.emoji.id) : undefined,
        }
      : undefined,
    partyId: payload.party?.id,
    partyCurrentSize: payload.party?.size?.[0],
    partyMaxSize: payload.party?.size?.[1],
    largeImage: payload.assets?.large_image,
    largeText: payload.assets?.large_text,
    smallImage: payload.assets?.small_image,
    smallText: payload.assets?.small_text,
    join: payload.secrets?.join,
    spectate: payload.secrets?.spectate,
    match: payload.secrets?.match,
    instance: payload.instance,
    flags: payload.flags,
    buttons: payload.buttons,
  } as Activity

  return bot.transformers.customizers.activity(bot, payload, activity)
}

export interface Activity {
  join?: string
  flags?: number
  applicationId?: bigint
  spectate?: string
  url?: string
  startedAt?: number
  endedAt?: number
  details?: string
  state?: string
  emoji?: {
    id?: bigint
    animated?: boolean
    name: string
  }
  partyId?: string
  partyCurrentSize?: number
  partyMaxSize?: number
  largeImage?: string
  largeText?: string
  smallImage?: string
  smallText?: string
  match?: string
  instance?: boolean
  buttons?: Array<{
    url: string
    label: string
  }>
  name: string
  type: ActivityTypes
  createdAt: number
}
