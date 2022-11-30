import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Gets the pinned messages for a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get the pinned messages for.
 * @returns A collection of {@link Message} objects assorted by message ID.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * If getting a message from a guild channel:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-pinned-messages}
 */
export async function getPinnedMessages(bot: Bot, channelId: BigString): Promise<Collection<bigint, Message>> {
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
