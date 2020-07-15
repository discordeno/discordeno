import { Message, createMessage } from "../structures/message.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import { botID } from "../module/client.ts";
import { hasChannelPermission } from "./channel.ts";
import { Permissions } from "../types/permission.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { endpoints } from "../constants/discord.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";
import { MessageContent } from "../types/channel.ts";
import { UserPayload } from "../types/guild.ts";
import { MessageCreateOptions } from "../types/message.ts";

/** Delete a message */
export async function deleteMessage(
  message: Message,
  reason?: string,
  delayMilliseconds = 0,
) {
  if (message.author.id !== botID) {
    // This needs to check the channels permission not the guild permission
    if (
      !message.guildID ||
      !hasChannelPermission(
        message.channel,
        botID,
        [Permissions.MANAGE_MESSAGES],
      )
    ) {
      throw new Error(Errors.MISSING_MANAGE_MESSAGES);
    }
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
    { reason },
  );
}

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export function pin(message: Message) {
  if (
    !botHasChannelPermissions(message.channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.put(endpoints.CHANNEL_MESSAGE(message.channelID, message.id));
}

/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
export function unpin(message: Message) {
  if (
    !botHasChannelPermissions(message.channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
  );
}

/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export function addReaction(message: Message, reaction: string) {
  RequestManager.put(
    endpoints.CHANNEL_MESSAGE_REACTION_ME(
      message.channelID,
      message.id,
      reaction,
    ),
  );
}

/** Removes a reaction from the bot on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export function removeReaction(message: Message, reaction: string) {
  RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION_ME(
      message.channelID,
      message.id,
      reaction,
    ),
  );
}

/** Removes all reactions for all emojis on this message. */
export function removeAllReactions(message: Message) {
  if (
    !botHasChannelPermissions(message.channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTIONS(message.channelID, message.id),
  );
}

/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export function removeReactionEmoji(message: Message, reaction: string) {
  if (
    !botHasChannelPermissions(message.channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION(message.channelID, message.id, reaction),
  );
}

/** Get a list of users that reacted with this emoji. */
export async function getReactions(message: Message, reaction: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGE_REACTION(message.channelID, message.id, reaction),
  )) as UserPayload[];
  const guild = message.guild();

  return result.map((res) => {
    return guild?.members.get(res.id) || res;
  });
}

/** Edit the message. */
export async function editMessage(
  message: Message,
  content: string | MessageContent,
) {
  if (
    message.author.id !== botID
  ) {
    throw "You can only edit a message that was sent by the bot.";
  }

  if (typeof content === "string") content = { content };

  if (
    !botHasChannelPermissions(message.channelID, [Permissions.SEND_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_SEND_MESSAGES);
  }

  if (
    content.tts &&
    !botHasChannelPermissions(
      message.channelID,
      [Permissions.SEND_TTS_MESSAGES],
    )
  ) {
    throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
  }

  if (content.content && content.content.length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await RequestManager.patch(
    endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
    content,
  );
  return createMessage(result as MessageCreateOptions);
}
