import type { Bot } from "../../../bot.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { StartThreadBase } from "../../../types/discordeno.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function startThreadWithMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  options: StartThreadBase,
) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "post",
    bot.constants.endpoints.THREAD_START_PUBLIC(channelId, messageId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
    },
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}
