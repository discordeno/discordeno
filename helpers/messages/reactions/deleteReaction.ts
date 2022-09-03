import type { Bot } from "../../../bot.ts";
import { processReactionString } from "./getReactions.ts";

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
