import type { Bot } from "../../bot.ts";

/** Removes all reactions for all emojis on this message. */
export async function removeAllReactions(bot: Bot, channelId: bigint, messageId: bigint) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId),
  );
}
