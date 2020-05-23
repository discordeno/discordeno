import { MessageCreateOptions } from "../types/message.ts";
import { endpoints } from "../constants/discord.ts";
import { MessageContent } from "../types/channel.ts";
import { UserPayload } from "../types/guild.ts";
import { botHasPermission } from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { Permissions } from "../types/permission.ts";
import { RequestManager } from "../module/requestManager.ts";
import { botID } from "../module/client.ts";
import { cache } from "../utils/cache.ts";

export function createMessage(data: MessageCreateOptions) {
  const message = {
    ...data,
    channelID: data.channel_id,
    guildID: data.guild_id,
    mentionsEveryone: data.mentions_everyone,
    mentionRoles: data.mention_roles,
    mentionChannels: data.mention_channels,
    webhookID: data.webhook_id,
    messageReference: data.message_reference,
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: data.edited_timestamp
      ? Date.parse(data.edited_timestamp)
      : undefined,
    channel: cache.channels.get(data.channel_id)!,
    guild: () => data.guild_id ? cache.guilds.get(data.guild_id) : undefined,
    member: () => message.guild()?.members.get(data.author.id)!,
    mentions: () =>
      data.mentions.map((mention) =>
        message.guild()?.members.get(mention.id)!
      ),

    /** Delete a message */
    delete: (reason?: string) => {
      if (data.author.id !== botID) {
        // This needs to check the channels permission not the guild permission
        if (
          !message.guildID ||
          !message.channel.hasPermission(botID, [Permissions.MANAGE_MESSAGES])
        ) {
          throw new Error(Errors.MISSING_MANAGE_MESSAGES);
        }
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
        !botHasPermission(data.guild_id, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      RequestManager.put(endpoints.CHANNEL_MESSAGE(data.channel_id, data.id));
    },
    /** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
    unpin: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, [Permissions.MANAGE_MESSAGES])
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
        !botHasPermission(data.guild_id, [Permissions.MANAGE_MESSAGES])
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
        !botHasPermission(data.guild_id, [Permissions.MANAGE_MESSAGES])
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
      const guild = message.guild();

      return result.map((res) => {
        return guild?.members.get(res.id) || res;
      });
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
          !botHasPermission(data.guild_id, [Permissions.SEND_MESSAGES])
        ) {
          throw new Error(Errors.MISSING_SEND_MESSAGES);
        }

        if (
          content.tts &&
          !botHasPermission(
            data.guild_id,
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

  return message;
}

export interface Message extends ReturnType<typeof createMessage> {}
