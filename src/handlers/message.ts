import { delay } from "../../deps.ts";
import { endpoints } from "../constants/discord.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { botID } from "../module/client.ts";
import { RequestManager } from "../module/requestManager.ts";
import { Message } from "../structures/message.ts";
import { structures } from "../structures/mod.ts";
import { MessageContent } from "../types/channel.ts";
import { Errors } from "../types/errors.ts";
import { UserPayload } from "../types/guild.ts";
import { MessageCreateOptions } from "../types/message.ts";
import { Permissions } from "../types/permission.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessageByID(
  channelID: string,
  messageID: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageID);
  if (message) return deleteMessage(message, reason, delayMilliseconds);

  if (delayMilliseconds) await delay(delayMilliseconds);

  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(channelID, messageID),
    { reason },
  );
}

/** Delete a message */
export async function deleteMessage(
  message: Message,
  reason?: string,
  delayMilliseconds = 0,
) {
  if (message.author.id !== botID) {
    // This needs to check the channels permission not the guild permission
    if (
      !botHasChannelPermissions(
        message.channelID,
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
export function pin(channelID: string, messageID: string) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.put(endpoints.CHANNEL_MESSAGE(channelID, messageID));
}

/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
export function unpin(channelID: string, messageID: string) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(channelID, messageID),
  );
}

/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export function addReaction(
  channelID: string,
  messageID: string,
  reaction: string,
) {
  if (!botHasChannelPermissions(channelID, [Permissions.ADD_REACTIONS])) {
    throw new Error(Errors.MISSING_ADD_REACTIONS);
  }

  if (
    !botHasChannelPermissions(channelID, [Permissions.READ_MESSAGE_HISTORY])
  ) {
    throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
  }

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  return RequestManager.put(
    endpoints.CHANNEL_MESSAGE_REACTION_ME(
      channelID,
      messageID,
      reaction,
    ),
  );
}

/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReactions(
  channelID: string,
  messageID: string,
  reactions: string[],
  ordered = false,
) {
  if (!ordered) {
    reactions.forEach((reaction) =>
      addReaction(channelID, messageID, reaction)
    );
  } else {
    for (const reaction of reactions) {
      await addReaction(channelID, messageID, reaction);
    }
  }
}

/** Removes a reaction from the bot on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export function removeReaction(
  channelID: string,
  messageID: string,
  reaction: string,
) {
  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION_ME(
      channelID,
      messageID,
      reaction,
    ),
  );
}

/** Removes a reaction from the specified user on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export function removeUserReaction(
  channelID: string,
  messageID: string,
  reaction: string,
  userID: string,
) {
  if (!botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }

  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION_USER(
      channelID,
      messageID,
      reaction,
      userID,
    ),
  );
}

/** Removes all reactions for all emojis on this message. */
export function removeAllReactions(channelID: string, messageID: string) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTIONS(channelID, messageID),
  );
}

/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export function removeReactionEmoji(
  channelID: string,
  messageID: string,
  reaction: string,
) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  return RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction),
  );
}

/** Get a list of users that reacted with this emoji. */
export async function getReactions(message: Message, reaction: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGE_REACTION(message.channelID, message.id, reaction),
  )) as UserPayload[];
  const guild = await cacheHandlers.get("guilds", message.guildID);

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
  return structures.createMessage(result as MessageCreateOptions);
}

export async function publishMessage(channelID: string, messageID: string) {
  const data = await RequestManager.post(
    endpoints.CHANNEL_MESSAGE_CROSSPOST(channelID, messageID),
  ) as MessageCreateOptions;

  return structures.createMessage(data);
}
