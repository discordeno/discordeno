import type { Bot } from "../../../bot.ts";
import { ThreadMember } from "../../../transformers/threadMember.ts";
import { DiscordThreadMember } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot: Bot, threadId: bigint): Promise<Collection<bigint, ThreadMember>> {
  const result = await bot.rest.runMethod<DiscordThreadMember[]>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_MEMBERS(threadId),
  );

  return new Collection(result.map((res) => {
    const member = bot.transformers.threadMember(bot, res);
    return [member.id!, member];
  }));
}
