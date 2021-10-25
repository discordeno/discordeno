import type { Bot } from "../../../bot.ts";

/** Removes a user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. */
export async function removeThreadMember(bot: Bot, threadId: bigint, userId: bigint) {
  // const thread = await bot.cache.threads.get(threadId);
  // if (thread) {
  //   if (thread.archived) throw new Error(bot.constants.Errors.CANNOT_REMOVE_FROM_ARCHIVED_THREAD);

  //   if (thread.ownerId !== bot.id) {
  //     const channel = await bot.cache.channels.get(thread.parentId);
  //     if (channel) await bot.utils.requireBotChannelPermissions(bot, channel, ["MANAGE_THREADS"]);
  //   }
  // }

  // return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.THREAD_USER(threadId, userId));
}
