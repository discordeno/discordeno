import { Bot } from "../../../bot.ts";
import { DiscordThreadMember } from "../../../deps.ts";
import { BotCollection as Collection } from "../../../util/collection.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot: Bot, threadId: bigint) {
  const result = await bot.rest.runMethod<DiscordThreadMember[]>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_MEMBERS(threadId),
  );
  // return result;

  return new Collection(result.map((res) => {
    const member = bot.transformers.threadMember(bot, res);
    return [member.id, member];
  }));
}
