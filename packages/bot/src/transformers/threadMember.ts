import type { DiscordThreadMember } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'
import type { DiscordThreadMemberGuildCreate } from '../types.js'

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember) {
  const threadMember = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    flags: payload.flags,
  }

  return threadMember as Optionalize<typeof threadMember>
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate) {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  }

  return threadMember as Optionalize<typeof threadMember>
}

export interface ThreadMember extends ReturnType<typeof transformThreadMember> {}
export interface ThreadMemberGuildCreate extends ReturnType<typeof transformThreadMemberGuildCreate> {}
