import {
  DiscordThreadMember,
  DiscordThreadMemberGuildCreate,
  Optionalize
} from '@discordeno/types'
import { Bot } from '../bot.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformThreadMember (bot: Bot, payload: DiscordThreadMember) {
  const threadMember = {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id
      ? bot.transformers.snowflake(payload.user_id)
      : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    flags: payload.flags
  }

  return threadMember as Optionalize<typeof threadMember>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformThreadMemberGuildCreate (
  bot: Bot,
  payload: DiscordThreadMemberGuildCreate
) {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp)
  }

  return threadMember as Optionalize<typeof threadMember>
}

export interface ThreadMember
  extends ReturnType<typeof transformThreadMember> {}
export interface ThreadMemberGuildCreate
  extends ReturnType<typeof transformThreadMemberGuildCreate> {}
