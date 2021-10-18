import type { Bot } from "../../bot.ts";

/** Removes a reaction from the given user on this message, defaults to bot. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function removeReaction(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
  options?: { userId?: bigint }
) {
  if (options?.userId) {
    await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);
  }

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    options?.userId
      ? bot.constants.endpoints.CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, reaction, options.userId)
      : bot.constants.endpoints.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction)
  );
}
