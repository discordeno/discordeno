import type {
  DiscordThreadMember,
  DiscordThreadMemberGuildCreate,
  Optionalize
} from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformThreadMember (
  rest: RestManager,
  payload: DiscordThreadMember
) {
  const threadMember = {
    id: payload.id ? rest.transformers.snowflake(payload.id) : undefined,
    userId: payload.user_id
      ? rest.transformers.snowflake(payload.user_id)
      : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
    flags: payload.flags
  }

  return threadMember as Optionalize<typeof threadMember>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformThreadMemberGuildCreate (
  rest: RestManager,
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
