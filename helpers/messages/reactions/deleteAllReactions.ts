import type { Bot } from "../../../bot.ts";

/** Deletes all reactions for all emojis on this message. */
export async function deleteAllReactions(bot: Bot, channelId: bigint, messageId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId),
  );
}
