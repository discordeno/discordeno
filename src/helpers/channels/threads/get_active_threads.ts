import type { Bot } from "../../../bot.ts";
import type { ListActiveThreads } from "../../../types/channels/threads/list_active_threads.ts";
import { Collection } from "../../../util/collection.ts";
// import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";

/** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the VIEW_CHANNEL permission. */
export async function getActiveThreads(bot: Bot, channelId: bigint) {
  // await bot.utils.requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL"]);
  // // TODO: pagination
  // const result = (await bot.rest.runMethod(
  //   bot.rest,
  //   "get",
  //   bot.constants.endpoints.THREAD_ACTIVE(channelId)
  // )) as ListActiveThreads;
  // const threads = new Collection(
  //   result.threads.map((t) => {
  //     const ddThread = channelToThread(t);
  //     return [ddThread.id, ddThread];
  //   })
  // );
  // for (const member of result.members) {
  //   const thread = threads.get(bot.transformers.snowflake(member.id!));
  //   thread?.members.set(bot.transformers.snowflake(member.userId!), {
  //     userId: bot.transformers.snowflake(member.userId!),
  //     flags: member.flags,
  //     joinTimestamp: Date.parse(member.joinTimestamp),
  //   });
  // }
  // return threads;
}
