import type { Bot } from "../../../bot.ts";
import { ThreadMember } from "../../../types/channels/threads/thread_member.ts";
import { DiscordGatewayIntents } from "../../../types/gateway/gateway_intents.ts";
import { Collection } from "../../../util/collection.ts";
// import { threadMemberModified } from "../../../util/transformers/thread_member_modified.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot: Bot, threadId: bigint) {
  const result = await bot.rest.runMethod<ThreadMember[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.THREAD_MEMBERS(threadId)
  );
  return result;

  // return new Collection(result.map((res) => [bot.transformers.snowflake(result.userId), {
  // id?: string;
  // /** The id of the user */
  // userId?: string;
  // /** The time the current user last joined the thread */
  // joinTimestamp: string;
  // }]));
}
