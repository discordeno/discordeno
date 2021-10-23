import type { Bot } from "../../../bot.ts";

/** Delete a thread in your server. Bot needs MANAGE_THREADS permissions in the server. */
export async function deleteThread(bot: Bot, threadId: bigint, reason?: string) {
  const thread = await bot.cache.threads.get(threadId);
  if (thread) {
    const channel = await bot.cache.channels.get(thread?.parentId);
    if (channel?.guildId) await bot.utils.requireBotGuildPermissions(bot, channel.guildId, ["MANAGE_THREADS"]);
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.CHANNEL_BASE(threadId), {
    reason,
  });
}
