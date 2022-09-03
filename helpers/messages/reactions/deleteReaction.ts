import type { Bot } from "../../../bot.ts";

/** Deletes a reaction from the given user on this message, defaults to bot. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function deleteOwnReaction(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );
}

export async function deleteUserReaction(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  userId: bigint,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION_USER(
      channelId,
      messageId,
      reaction,
      userId,
    ),
  );
}

function processReactionString(reaction: string): string {
  if (reaction.startsWith("<:")) {
    return reaction.substring(2, reaction.length - 1);
  }

  if (reaction.startsWith("<a:")) {
    return reaction.substring(3, reaction.length - 1);
  }

  return reaction;
}
