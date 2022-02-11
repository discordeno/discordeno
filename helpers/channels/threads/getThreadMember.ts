import type { Bot } from "../../../bot.ts";
import { ThreadMember } from "../../../types/channels/threads/threadMember.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMember(bot: Bot, threadId: bigint, userId: bigint) {
  const result = await bot.rest.runMethod<ThreadMember>(
    bot.rest,
    "get",
    bot.constants.endpoints.THREAD_USER(threadId, userId),
  );

  return {
    id: result.id ? bot.transformers.snowflake(result.id) : undefined,
    userId: result.user_id ? bot.transformers.snowflake(result.user_id) : undefined,
    joinTimestamp: Date.parse(result.join_timestamp),
    flags: result.flags,
  };
}
