import { Bot, Channel, ModifyThread } from "../deps.ts";

/** Sets a thread channel to be archived. */
export async function archiveThread(bot: Bot, threadId: bigint) {
  return await editThread(bot, threadId, { archived: true });
}

/** Sets a thread channel to be unarchived. */
export async function unarchiveThread(bot: Bot, threadId: bigint) {
  return await editThread(bot, threadId, { archived: false });
}

/** Sets a thread channel to be locked. */
export async function lockThread(bot: Bot, threadId: bigint) {
  return await editThread(bot, threadId, { locked: true });
}

/** Sets a thread channel to be unlocked. */
export async function unlockThread(bot: Bot, threadId: bigint) {
  return await editThread(bot, threadId, { locked: false });
}

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