import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";
import { processReactionString } from "./getReactions.ts";

// TODO: Improve typing of the `reaction` parameter.

/**
 * Deletes a reaction added by the bot user from a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reaction from is in.
 * @param messageId - The ID of the message to delete the reaction from.
 * @param reaction - The reaction to delete from the message.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Fires a _Message Reaction Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-own-reaction}
 */
export async function deleteOwnReaction(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );
}

/**
 * Deletes a user's reaction from a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reaction from is in.
 * @param messageId - The ID of the message to delete the reaction from.
 * @param userId - The ID of the user whose reaction to delete.
 * @param reaction - The reaction to delete from the message.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Reaction Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-user-reaction}
 */
export async function deleteUserReaction(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  userId: BigString,
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
