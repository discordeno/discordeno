import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";
import { processReactionString } from "./getReactions.ts";

// TODO: Improve typing of the `reaction` parameter.

/**
 * Adds a reaction to a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to add a reaction to is in.
 * @param messageId - The ID of the message to add a reaction to.
 * @param reaction - The reaction to add to the message.
 * @returns
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * If nobody else has reacted to the message:
 * - Requires the `ADD_REACTIONS` permission.
 *
 * Fires a _Message Reaction Add_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#create-reaction}
 */
export async function addReaction(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );
}
