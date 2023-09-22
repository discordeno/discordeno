import type { DiscordThreadMember } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { DiscordThreadMemberGuildCreate } from '../typings.js'

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember): ThreadMember {
  const threadMember = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    flags: payload.flags,
  } as ThreadMember

  return bot.transformers.customizers.threadMember(bot, payload, threadMember)
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate): ThreadMemberGuildCreate {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  } as ThreadMemberGuildCreate

  return threadMember
}

export interface ThreadMember {
  id?: bigint
  userId?: bigint
  flags: number
  joinTimestamp: number
}

export interface ThreadMemberGuildCreate {
  joinTimestamp: number
}
