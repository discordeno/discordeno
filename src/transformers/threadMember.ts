import { Bot } from "../bot.ts";
import { ThreadMember } from "../types/channels/threads/threadMember.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformThreadMember(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<ThreadMember>
): DiscordenoThreadMember {
  return {
    id: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    threadId: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
  };
}

export interface DiscordenoThreadMember {
  /** The id of the user */
  id?: bigint;
  /** The id of the thread */
  threadId?: bigint;
  /** The time the current user last joined the thread */
  joinTimestamp: number;
  // COMMENTED OUT AS THIS IS USELESS FOR BOTS ATM
  /** Any user-thread settings, currently only used for notifications */
  //   flags: number;
}
