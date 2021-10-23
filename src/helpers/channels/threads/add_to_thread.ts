import type { Bot } from "../../../bot.ts";

/** Adds a user to a thread. Requires the ability to send messages in the thread. Requires the thread is not archived. */
export async function addToThread(bot: Bot, threadId: bigint, userId: bigint) {
  const thread = await bot.cache.threads.get(threadId);
  if (thread) {
    if (thread.archived) {
      throw new Error(bot.constants.Errors.CANNOT_ADD_USER_TO_ARCHIVED_THREADS);
    }

    // If a user id is provided SEND_MESSAGES is required.
    const channel = await bot.cache.channels.get(thread.parentId);
    // TODO: does MANAGE_THREADS override this????
    if (channel) await bot.utils.requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "put", bot.constants.endpoints.THREAD_USER(threadId, userId));
}
