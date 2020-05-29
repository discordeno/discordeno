import { Permissions } from "../types/permission.ts";
import { Channel } from "../structures/channel.ts";
import { botHasPermission } from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { endpoints } from "../constants/discord.ts";
import { MessageCreateOptions } from "../types/message.ts";
import { createMessage } from "../structures/message.ts";
import {
  GetMessagesAfter,
  GetMessagesBefore,
  GetMessagesAround,
  GetMessages,
  MessageContent,
  CreateInviteOptions,
  ChannelEditOptions,
} from "../types/channel.ts";
import { logYellow } from "../utils/logger.ts";
import { eventHandlers } from "../module/client.ts";

/** Checks if a user id or a role id has permission in this channel */
export function hasChannelPermission(
  channel: Channel,
  id: string,
  permissions: Permissions[],
) {
  const overwrite =
    channel.permission_overwrites?.find((perm) => perm.id === id) ||
    channel.permission_overwrites?.find((perm) => perm.id === channel.guildID);

  return permissions.every((perm) => {
    if (overwrite) {
      if (overwrite.deny & perm) return false;
      if (overwrite.allow & perm) return true;
    }
    if (channel.guildID) {
      return botHasPermission(channel.guildID, [perm]);
    }
    return false;
  });
}

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(channel: Channel, id: string) {
  if (channel.guildID) {
    if (
      !botHasPermission(channel.guildID, [Permissions.VIEW_CHANNEL])
    ) {
      eventHandlers.error?.(Errors.MISSING_VIEW_CHANNEL);
      throw new Error(Errors.MISSING_VIEW_CHANNEL);
    }
    if (
      !botHasPermission(
        channel.guildID,
        [Permissions.READ_MESSAGE_HISTORY],
      )
    ) {
      eventHandlers.error?.(Errors.MISSING_READ_MESSAGE_HISTORY);
      throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
    }
  }
  const result = await RequestManager.get(
    endpoints.CHANNEL_MESSAGE(channel.id, id),
  ) as MessageCreateOptions;
  return createMessage(result);
}

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  channel: Channel,
  options?:
    | GetMessagesAfter
    | GetMessagesBefore
    | GetMessagesAround
    | GetMessages,
) {
  if (channel.guildID) {
    if (
      !botHasPermission(channel.guildID, [Permissions.VIEW_CHANNEL])
    ) {
      eventHandlers.error?.(Errors.MISSING_VIEW_CHANNEL);
      throw new Error(Errors.MISSING_VIEW_CHANNEL);
    }
    if (
      !botHasPermission(
        channel.guildID,
        [Permissions.READ_MESSAGE_HISTORY],
      )
    ) {
      eventHandlers.error?.(Errors.MISSING_READ_MESSAGE_HISTORY);
      throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
    }
  }

  if (options?.limit && options.limit > 100) return;

  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGES(channel.id),
    options,
  )) as MessageCreateOptions[];
  return result.map((res) => createMessage(res));
}

/** Get pinned messages in this channel. */
export async function getPins(channelID: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_PINS(channelID),
  )) as MessageCreateOptions[];
  return result.map((res) => createMessage(res));
}

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channel: Channel,
  content: string | MessageContent,
) {
  if (typeof content === "string") content = { content };

  if (channel.guildID) {
    if (
      !botHasPermission(channel.guildID, [Permissions.SEND_MESSAGES])
    ) {
      eventHandlers.error?.(Errors.MISSING_SEND_MESSAGES);
      throw new Error(Errors.MISSING_SEND_MESSAGES);
    }
    if (
      content.tts &&
      !botHasPermission(
        channel.guildID,
        [Permissions.SEND_TTS_MESSAGES],
      )
    ) {
      eventHandlers.error?.(Errors.MISSING_SEND_TTS_MESSAGE);
      throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
    }
  }

  if (content.content && content.content.length > 2000) {
    eventHandlers.error?.(Errors.MESSAGE_MAX_LENGTH);
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await RequestManager.post(
    endpoints.CHANNEL_MESSAGES(channel.id),
    content,
  );

  return createMessage(result as MessageCreateOptions);
}

/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export function deleteMessages(
  channel: Channel,
  ids: string[],
  reason?: string,
) {
  if (
    channel.guildID &&
    !botHasPermission(channel.guildID, [Permissions.MANAGE_MESSAGES])
  ) {
    eventHandlers.error?.(Errors.MISSING_MANAGE_MESSAGES);
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  if (ids.length < 2) {
    eventHandlers.error?.(Errors.DELETE_MESSAGES_MIN);
    throw new Error(Errors.DELETE_MESSAGES_MIN);
  }

  if (ids.length > 100) {
    logYellow(
      `This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`,
    );
  }

  return RequestManager.post(endpoints.CHANNEL_BULK_DELETE(channel.id), {
    messages: ids.splice(0, 100),
    reason,
  });
}

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export function getChannelInvites(channel: Channel) {
  if (
    channel.guildID &&
    !botHasPermission(channel.guildID, [Permissions.MANAGE_CHANNELS])
  ) {
    eventHandlers.error?.(Errors.MISSING_MANAGE_CHANNELS);
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }
  return RequestManager.get(endpoints.CHANNEL_INVITES(channel.id));
}

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export function createInvite(channel: Channel, options: CreateInviteOptions) {
  if (
    channel.guildID &&
    !botHasPermission(
      channel.guildID,
      [Permissions.CREATE_INSTANT_INVITE],
    )
  ) {
    eventHandlers.error?.(Errors.MISSING_CREATE_INSTANT_INVITE);
    throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE);
  }
  return RequestManager.post(endpoints.CHANNEL_INVITES(channel.id), options);
}

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export function getChannelWebhooks(channel: Channel) {
  if (
    channel.guildID &&
    !botHasPermission(channel.guildID, [Permissions.MANAGE_WEBHOOKS])
  ) {
    eventHandlers.error?.(Errors.MISSING_MANAGE_WEBHOOKS);
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }
  return RequestManager.get(endpoints.CHANNEL_WEBHOOKS(channel.id));
}

export function editChannel(channel: Channel, options: ChannelEditOptions) {
  return RequestManager.patch(endpoints.GUILD_CHANNELS(channel.id), options);
}
