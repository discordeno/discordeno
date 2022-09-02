import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Get pinned messages in this channel. */
export async function getPinnedMessages(bot: Bot, channelId: bigint): Promise<Collection<bigint, Message>> {
  const results = await bot.rest.runMethod<DiscordMessage[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_PINS(channelId),
  );

  return new Collection(
    results.map((result) => {
      const message = bot.transformers.message(bot, result);
      return [message.id, message];
    }),
  );
}
