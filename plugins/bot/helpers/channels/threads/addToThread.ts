import { Bot } from "../../../bot.ts";

/** Adds a user to a thread. Requires the ability to send messages in the thread. Requires the thread is not archived. */
export async function addToThread(bot: Bot, threadId: bigint, userId: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "PUT", bot.constants.routes.THREAD_USER(threadId, userId));
}
