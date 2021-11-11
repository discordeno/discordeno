import type { Bot } from "../../../bot.ts";

/** Delete a thread in your server. Bot needs MANAGE_THREADS permissions in the server. */
export async function deleteThread(bot: Bot, threadId: bigint, reason?: string) {
  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.CHANNEL_BASE(threadId), {
    reason,
  });
}
