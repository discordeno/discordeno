import { BigString, Bot, DiscordChannel } from "../deps.ts";

/** Sets a thread channel to be archived. */
export async function archiveThread(bot: Bot, threadId: BigString) {
  return await editThread(bot, threadId, { archived: true });
}

/** Sets a thread channel to be unarchived. */
export async function unarchiveThread(bot: Bot, threadId: BigString) {
  return await editThread(bot, threadId, { archived: false });
}

/** Sets a thread channel to be locked. */
export async function lockThread(bot: Bot, threadId: BigString) {
  return await editThread(bot, threadId, { locked: true });
}

/** Sets a thread channel to be unlocked. */
export async function unlockThread(bot: Bot, threadId: BigString) {
  return await editThread(bot, threadId, { locked: false });
}

/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editThread(bot: Bot, threadId: BigString, options: ModifyThread, reason?: string) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL(threadId),
    {
      name: options.name,
      archived: options.archived,
      auto_archive_duration: options.autoArchiveDuration,
      locked: options.locked,
      rate_limit_per_user: options.rateLimitPerUser,
      reason,
    },
  );

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}

/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread */
export interface ModifyThread {
  /** 1-100 character thread name */
  name?: string;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES`, `MANAGE_THREAD` or `MANAGE_CHANNEL` are unaffected */
  rateLimitPerUser?: number;
}
