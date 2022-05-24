import type { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";

/** Get pinned messages in this channel. */
export async function getPins(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordMessage[]>(
    bot.rest,
    "GET",
    bot.constants.endpoints.CHANNEL_PINS(channelId),
  );

  return result.map((msg) => bot.transformers.message(bot, msg));
}
