import { Permissions } from "../types/permission.ts";
import { Channel } from "../structures/channel.ts";
import {
  botHasPermission,
  botHasChannelPermissions,
} from "../utils/permissions.ts";
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
      !botHasChannelPermissions(channel.id, [Permissions.VIEW_CHANNEL])
    ) {
      throw new Error(Errors.MISSING_VIEW_CHANNEL);
    }
    if (
      !botHasChannelPermissions(
        channel.id,
        [Permissions.READ_MESSAGE_HISTORY],
      )
    ) {
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
      !botHasChannelPermissions(channel.id, [Permissions.VIEW_CHANNEL])
    ) {
      throw new Error(Errors.MISSING_VIEW_CHANNEL);
    }
    if (
      !botHasChannelPermissions(
        channel.id,
        [Permissions.READ_MESSAGE_HISTORY],
      )
    ) {
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
      !botHasChannelPermissions(channel.id, [Permissions.SEND_MESSAGES])
    ) {
      throw new Error(Errors.MISSING_SEND_MESSAGES);
    }
    if (
      content.tts &&
      !botHasChannelPermissions(
        channel.guildID,
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
    !botHasChannelPermissions(channel.id, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  if (ids.length < 2) {
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
    !botHasChannelPermissions(channel.id, [Permissions.MANAGE_CHANNELS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }
  return RequestManager.get(endpoints.CHANNEL_INVITES(channel.id));
}

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export function createInvite(channel: Channel, options: CreateInviteOptions) {
  if (
    channel.guildID &&
    !botHasChannelPermissions(
      channel.id,
      [Permissions.CREATE_INSTANT_INVITE],
    )
  ) {
    throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE);
  }
  return RequestManager.post(endpoints.CHANNEL_INVITES(channel.id), options);
}

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export function getChannelWebhooks(channel: Channel) {
  if (
    !botHasChannelPermissions(channel.id, [Permissions.MANAGE_WEBHOOKS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }
  return RequestManager.get(endpoints.CHANNEL_WEBHOOKS(channel.id));
}

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelID: string;
  items: {
    channel: Channel;
    options: ChannelEditOptions;
  }[];
}

const editChannelNameTopicQueue = new Map<string, EditChannelRequest>();
let editChannelProcessing = false;

function processEditChannelQueue() {
  if (!editChannelProcessing) return;

  const now = Date.now();
  editChannelNameTopicQueue.forEach((request) => {
    if (now > request.timestamp) return;
    // 10 minutes have passed so we can reset this channel again
    if (!request.items.length) {
      return editChannelNameTopicQueue.delete(request.channelID);
    }
    request.amount = 0;
    // There are items to process for this request
    const details = request.items.shift();

    if (!details) return;

    editChannel(details.channel, details.options);
    const secondDetails = request.items.shift();
    if (!secondDetails) return;

    return editChannel(secondDetails.channel, secondDetails.options);
  });

  if (editChannelNameTopicQueue.size) {
    setTimeout(() => processEditChannelQueue(), 600000);
  } else {
    editChannelProcessing = false;
  }
}

export function editChannel(channel: Channel, options: ChannelEditOptions) {
  if (!channel.guildID) throw new Error(Errors.CHANNEL_NOT_IN_GUILD);

  if (
    !botHasChannelPermissions(channel.id, [Permissions.MANAGE_CHANNELS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  if (options.name || options.topic) {
    const request = editChannelNameTopicQueue.get(channel.id);
    if (!request) {
      // If this hasnt been done before simply add 1 for it
      editChannelNameTopicQueue.set(channel.id, {
        channelID: channel.id,
        amount: 1,
        // 10 minutes from now
        timestamp: Date.now() + 600000,
        items: [],
      });
    } else if (request.amount === 1) {
      // Start queuing future requests to this channel
      request.amount = 2;
      request.timestamp = Date.now() + 600000;
    } else {
      // 2 have already been used add to queue
      request.items.push({ channel, options });
      if (editChannelProcessing) return;
      editChannelProcessing = true;
      processEditChannelQueue();
      return;
    }
  }

  const payload = {
    ...options,
    permission_overwrites: options.permission_overwrites?.map(
      (overwrite) => {
        return {
          ...overwrite,
          allow: overwrite.allow.reduce(
            (bits, perm) => bits |= Permissions[perm],
            0,
          ),
          deny: overwrite.deny.reduce(
            (bits, perm) => bits |= Permissions[perm],
            0,
          ),
        };
      },
    ),
  };

  return RequestManager.patch(
    endpoints.GUILD_CHANNEL(channel.id),
    payload,
  );
}
