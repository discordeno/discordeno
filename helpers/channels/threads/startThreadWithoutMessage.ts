import type { Bot } from "../../../bot.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { StartThreadWithoutMessage } from "../../../types/discordeno.ts";

/** Creates a new private thread. Returns a thread channel. */
export async function startThreadWithoutMessage(bot: Bot, channelId: bigint, options: StartThreadWithoutMessage) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "post",
    bot.constants.endpoints.THREAD_START_PRIVATE(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
    },
  );

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}
