import { MessageCreateOptions } from "../types/message.ts";
import { endpoints } from "../constants/discord.ts";
import { MessageContent } from "../types/channel.ts";
import { createUser } from "./user.ts";
import { UserPayload } from "../types/guild.ts";
import { botHasPermission } from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { Permissions } from "../types/permission.ts";
import { RequestManager } from "../module/requestManager.ts";
import { botID } from "../module/client.ts";
import { cache } from "../utils/cache.ts";

export function createMessage(data: MessageCreateOptions) {
  return {
    ...data,
    raw: data,
    mentions: data.mentions.map(user => createUser(user)),
    author: createUser({ ...data.author, avatar: data.author.avatar || "" }),
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: data.edited_timestamp
      ? Date.parse(data.edited_timestamp)
      : undefined,
    channel: cache.channels.get(data.channel_id)!,

    /** Delete a message */
    delete: (reason?: string) => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      if (data.author.id !== botID) {
      }

      return RequestManager.delete(
        endpoints.CHANNEL_MESSAGE(data.channel_id, data.id),
        { reason },
      );
    },
    /** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
    pin: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      RequestManager.put(endpoints.CHANNEL_MESSAGE(data.channel_id, data.id));
    },
    unpin: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      RequestManager.delete(
        endpoints.CHANNEL_MESSAGE(data.channel_id, data.id),
      );
    },
    /** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
    addReaction: (reaction: string) => {
      RequestManager.put(
        endpoints.CHANNEL_MESSAGE_REACTION_ME(
          data.channel_id,
          data.id,
          reaction,
        ),
      );
    },
    /** Removes a reaction from the bot on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
    removeReaction: (reaction: string) => {
      RequestManager.delete(
        endpoints.CHANNEL_MESSAGE_REACTION_ME(
          data.channel_id,
          data.id,
          reaction,
        ),
      );
    },
    /** Removes all reactions for all emojis on this message. */
    removeAllReactions: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      RequestManager.delete(
        endpoints.CHANNEL_MESSAGE_REACTIONS(data.channel_id, data.id),
      );
    },
    /** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
    removeReactionEmoji: (reaction: string) => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      RequestManager.delete(
        endpoints.CHANNEL_MESSAGE_REACTION(data.channel_id, data.id, reaction),
      );
    },
    /** Get a list of users that reacted with this emoji. */
    getReactions: async (reaction: string) => {
      const result = (await RequestManager.get(
        endpoints.CHANNEL_MESSAGE_REACTION(data.channel_id, data.id, reaction),
      )) as UserPayload[];
      return result.map((res) => createUser(res));
    },
    /** Edit the message. */
    edit: async (content: string | MessageContent) => {
      if (
        data.author.id !== botID
      ) {
        throw "You can only edit a message that was sent by the bot.";
      }

      if (typeof content === "string") content = { content };

      if (data.guild_id) {
        if (
          !botHasPermission(data.guild_id, botID, [Permissions.SEND_MESSAGES])
        ) {
          throw new Error(Errors.MISSING_SEND_MESSAGES);
        }

        if (
          content.tts &&
          !botHasPermission(
            data.guild_id,
            botID,
            [Permissions.SEND_TTS_MESSAGES],
          )
        ) {
          throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
        }
      }

      if (content.content && content.content.length > 2000) {
        throw new Error(Errors.MESSAGE_MAX_LENGTH);
      }

      const result = await RequestManager.patch(
        endpoints.CHANNEL_MESSAGE(data.channel_id, data.id),
        content,
      );
      return createMessage(result as MessageCreateOptions);
    },
  };
}

export type Message = ReturnType<typeof createMessage>;
