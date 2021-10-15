import type { Bot } from "../../bot.ts";

/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReaction(bot: Bot, channelId: bigint, messageId: bigint, reaction: string) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["ADD_REACTIONS", "READ_MESSAGE_HISTORY"]);

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.endpoints.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction)
  );
}
