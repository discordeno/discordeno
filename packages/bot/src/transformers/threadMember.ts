import type { BigString, DiscordThreadMember, DiscordThreadMemberGuildCreate } from '@discordeno/types'
import type { Bot, ThreadMember, ThreadMemberGuildCreate } from '../index.js'

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember, extra?: { guildId?: BigString }): ThreadMember {
  const threadMember = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
    flags: payload.flags,
    member: payload.member ? bot.transformers.member(bot, payload.member, undefined, bot.transformers.snowflake(payload.user_id)) : undefined,
  } as ThreadMember

  return bot.transformers.customizers.threadMember(bot, payload, threadMember, extra)
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate): ThreadMemberGuildCreate {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  } as ThreadMemberGuildCreate

  return bot.transformers.customizers.threadMemberGuildCreate(bot, payload, threadMember)
}
