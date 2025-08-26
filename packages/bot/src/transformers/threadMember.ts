import type { BigString, DiscordThreadMember, DiscordThreadMemberGuildCreate } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { ThreadMember, ThreadMemberGuildCreate } from './types.js'

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember, extra?: ThreadMemberTransformerExtra): ThreadMember {
  const threadMember = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    flags: payload.flags,
    member: payload.member
      ? bot.transformers.member(bot, payload.member, {
          guildId: extra?.guildId,
          userId: payload.user_id,
        })
      : undefined,
  } as ThreadMember

  return bot.transformers.customizers.threadMember(bot, payload, threadMember, extra)
}

export interface ThreadMemberTransformerExtra {
  /**
   * Provide this parameter if you want it to be passed down to the `threadMember.member` object (when `withMembers` is set to `true`),
   * since Discord does not include a `guildId` in that payload.
   *
   * This allows you to cache member objects in the member customizer.
   */
  guildId?: BigString
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate): ThreadMemberGuildCreate {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  } as ThreadMemberGuildCreate

  return bot.transformers.customizers.threadMemberGuildCreate(bot, payload, threadMember)
}
