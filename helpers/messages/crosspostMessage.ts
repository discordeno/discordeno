import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";

/** Crosspost a message in a News Channel to following channels. */
export async function crosspostMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId),
  );

  return bot.transformers.message(bot, result);
}
