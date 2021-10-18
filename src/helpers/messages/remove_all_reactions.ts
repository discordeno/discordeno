import type { Bot } from "../../bot.ts";

/** Removes all reactions for all emojis on this message. */
export async function removeAllReactions(bot: Bot, channelId: bigint, messageId: bigint) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_MESSAGE_REACTIONS(channelId, messageId)
  );
}
