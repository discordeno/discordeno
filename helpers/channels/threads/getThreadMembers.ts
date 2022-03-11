import type { Bot } from "../../../bot.ts";
import { DiscordThreadMember } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot: Bot, threadId: bigint) {
  const result = await bot.rest.runMethod<DiscordThreadMember[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.THREAD_MEMBERS(threadId),
  );
  // return result;

  return new Collection(result.map(res => {
    const member = bot.transformers.threadMember(bot, res);
    return [member.id, member];
  }))
}
