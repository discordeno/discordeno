import {
  ChannelCreatePayload,
  GetMessagesAfter,
  GetMessagesAround,
  GetMessages,
  GetMessagesBefore,
  MessageContent,
  CreateInviteOptions,
  ChannelEditOptions,
} from "../types/channel.ts";
import { botID, updateChannelCache } from "../module/client.ts";
import { endpoints } from "../constants/discord.ts";
import { createMessage } from "./message.ts";
import { MessageCreateOptions } from "../types/message.ts";
import {
  calculatePermissions,
  botHasPermission,
} from "../utils/permissions.ts";
import { Permissions } from "../types/permission.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { logYellow } from "../utils/logger.ts";

export function createChannel(data: ChannelCreatePayload) {
  const channel = {
    ...data,
    /** The raw channel data */
    raw: data,
    /** The permission overwrites for this channel */
    permissions: data.permission_overwrites
      ? data.permission_overwrites.map((perm) => ({
        ...perm,
        allow: calculatePermissions(perm.allow),
        deny: calculatePermissions(perm.deny),
      }))
      : [],
    /** Whether this channel is nsfw or not */
    nsfw: data.nsfw || false,
    /** The mention of the channel */
    mention: `<#${data.id}>`,

    /** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    getMessage: async (id: string) => {
      if (data.guild_id) {
        if (
          !botHasPermission(data.guild_id, botID, [Permissions.VIEW_CHANNEL])
        ) {
          throw new Error(Errors.MISSING_VIEW_CHANNEL);
        }
        if (
          !botHasPermission(
            data.guild_id,
            botID,
            [Permissions.READ_MESSAGE_HISTORY],
          )
        ) {
          throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
        }
      }
      const result = await RequestManager.get(
        endpoints.CHANNEL_MESSAGE(data.id, id),
      );
      return createMessage(result);
    },
    /** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    getMessages: async (
      options?:
        | GetMessagesAfter
        | GetMessagesBefore
        | GetMessagesAround
        | GetMessages,
    ) => {
      if (data.guild_id) {
        if (
          !botHasPermission(data.guild_id, botID, [Permissions.VIEW_CHANNEL])
        ) {
          throw new Error(Errors.MISSING_VIEW_CHANNEL);
        }
        if (
          !botHasPermission(
            data.guild_id,
            botID,
            [Permissions.READ_MESSAGE_HISTORY],
          )
        ) {
          throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
        }
      }

      if (options?.limit && options.limit > 100) return;

      const result = (await RequestManager.get(
        endpoints.CHANNEL_MESSAGES(data.id),
        options,
      )) as MessageCreateOptions[];
      return result.map((res) => createMessage(res));
    },
    /** Get pinned messages in this channel. */
    getPins: async () => {
      const result = (await RequestManager.get(
        endpoints.CHANNEL_PINS(data.id),
      )) as MessageCreateOptions[];
      return result.map((res) => createMessage(res));
    },
    /** Send a message to the channel. Requires SEND_MESSAGES permission. */
    sendMessage: async (content: string | MessageContent) => {
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

      const result = await RequestManager.post(
        endpoints.CHANNEL_MESSAGES(data.id),
        content,
      );

      return createMessage(result as MessageCreateOptions);
    },

    /** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
    deleteMessages: (ids: string[], reason?: string) => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_MESSAGES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
      if (ids.length < 2) throw new Error(Errors.DELETE_MESSAGES_MIN);

      if (ids.length > 100) {
        logYellow(
          `This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`,
        );
      }

      return RequestManager.post(endpoints.CHANNEL_BULK_DELETE(data.id), {
        messages: ids.splice(0, 100),
        reason,
      });
    },
    /** Gets the invites for this channel. Requires MANAGE_CHANNEL */
    getInvites: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_CHANNELS])
      ) {
        throw new Error(Errors.MISSING_MANAGE_CHANNELS);
      }
      return RequestManager.get(endpoints.CHANNEL_INVITES(data.id));
    },
    /** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
    createInvite: (options: CreateInviteOptions) => {
      if (
        data.guild_id &&
        !botHasPermission(
          data.guild_id,
          botID,
          [Permissions.CREATE_INSTANT_INVITE],
        )
      ) {
        throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE);
      }
      return RequestManager.post(endpoints.CHANNEL_INVITES(data.id), options);
    },
    /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
    getWebhooks: () => {
      if (
        data.guild_id &&
        !botHasPermission(data.guild_id, botID, [Permissions.MANAGE_WEBHOOKS])
      ) {
        throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
      }
      return RequestManager.get(endpoints.CHANNEL_WEBHOOKS(data.id));
    },
    edit: (options: ChannelEditOptions) => {
      return RequestManager.patch(endpoints.GUILD_CHANNELS(data.id), options);
    },
    // TODO: after learning opus and stuff
    /** Join a voice channel. */
    // join: () => {},
    /** Leave a voice channel */
    // leave: () => {}
  };

  updateChannelCache(data.id, channel);
  return channel;
}

export type Channel = ReturnType<typeof createChannel>;
