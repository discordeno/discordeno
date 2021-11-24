import type { ModifyThread } from "../../../types/channels/threads/modifyThread.ts";
import type { Bot } from "../../../bot.ts";
import { Channel } from "../../../types/channels/channel.ts";
// import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";

/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editThread(bot: Bot, threadId: bigint, options: ModifyThread, reason?: string) {
  const result = await bot.rest.runMethod<Channel>(bot.rest, "patch", bot.constants.endpoints.CHANNEL_BASE(threadId), {
    name: options.name,
    archived: options.archived,
    auto_archive_duration: options.autoArchiveDuration,
    locked: options.locked,
    rate_limit_per_user: options.rateLimitPerUser,
    reason,
  });

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}
