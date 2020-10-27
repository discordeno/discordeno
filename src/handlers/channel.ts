import { endpoints } from "../constants/discord.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { RequestManager } from "../module/requestManager.ts";
import { structures } from "../structures/mod.ts";
import {
  ChannelEditOptions,
  ChannelTypes,
  CreateInviteOptions,
  FollowedChannelPayload,
  GetMessages,
  GetMessagesAfter,
  GetMessagesAround,
  GetMessagesBefore,
  MessageContent,
} from "../types/channel.ts";
import { Errors } from "../types/errors.ts";
import type { RawOverwrite } from "../types/guild.ts";
import type { MessageCreateOptions } from "../types/message.ts";
import { Permissions } from "../types/permission.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";

/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildID: string,
  id: string,
  overwrites: RawOverwrite[],
  permissions: Permissions[],
) {
  const overwrite = overwrites.find((perm) => perm.id === id) ||
    overwrites.find((perm) => perm.id === guildID);

  return permissions.every((perm) => {
    if (overwrite) {
      if (BigInt(overwrite.deny) & BigInt(perm)) return false;
      if (BigInt(overwrite.allow) & BigInt(perm)) return true;
    }
    return false;
  });
}

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(
  channelID: string,
  id: string,
) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.VIEW_CHANNEL])
  ) {
    throw new Error(Errors.MISSING_VIEW_CHANNEL);
  }
  if (
    !botHasChannelPermissions(
      channelID,
      [Permissions.READ_MESSAGE_HISTORY],
    )
  ) {
    throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
  }

  const result = await RequestManager.get(
    endpoints.CHANNEL_MESSAGE(channelID, id),
  ) as MessageCreateOptions;
  return structures.createMessage(result);
}

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  channelID: string,
  options?:
    | GetMessagesAfter
    | GetMessagesBefore
    | GetMessagesAround
    | GetMessages,
) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.VIEW_CHANNEL])
  ) {
    throw new Error(Errors.MISSING_VIEW_CHANNEL);
  }
  if (
    !botHasChannelPermissions(
      channelID,
      [Permissions.READ_MESSAGE_HISTORY],
    )
  ) {
    throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
  }

  if (options?.limit && options.limit > 100) return;

  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGES(channelID),
    options,
  )) as MessageCreateOptions[];
  return Promise.all(result.map((res) => structures.createMessage(res)));
}

/** Get pinned messages in this channel. */
export async function getPins(channelID: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_PINS(channelID),
  )) as MessageCreateOptions[];
  return Promise.all(result.map((res) => structures.createMessage(res)));
}

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channelID: string,
  content: string | MessageContent,
) {
  if (typeof content === "string") content = { content };
  if (
    !botHasChannelPermissions(channelID, [Permissions.SEND_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_SEND_MESSAGES);
  }
  if (
    content.tts &&
    !botHasChannelPermissions(
      channelID,
      [Permissions.SEND_TTS_MESSAGES],
    )
  ) {
    throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
  }

  if (
    content.embed &&
    !botHasChannelPermissions(channelID, [Permissions.EMBED_LINKS])
  ) {
    throw new Error(Errors.MISSING_EMBED_LINKS);
  }

  // Use ... for content length due to unicode characters and js .length handling
  if (content.content && [...content.content].length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (content.mentions) {
    if (content.mentions.users?.length) {
      if (content.mentions.parse?.includes("users")) {
        content.mentions.parse = content.mentions.parse.filter((p) =>
          p !== "users"
        );
      }

      if (content.mentions.users.length > 100) {
        content.mentions.users = content.mentions.users.slice(0, 100);
      }
    }

    if (content.mentions.roles?.length) {
      if (content.mentions.parse?.includes("roles")) {
        content.mentions.parse = content.mentions.parse.filter((p) =>
          p !== "roles"
        );
      }

      if (content.mentions.roles.length > 100) {
        content.mentions.roles = content.mentions.roles.slice(0, 100);
      }
    }
  }

  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel) throw new Error(Errors.CHANNEL_NOT_FOUND);
  if (![ChannelTypes.DM, ChannelTypes.GUILD_NEWS, ChannelTypes.GUILD_TEXT].includes(channel.type)) throw new Error(Errors.CHANNEL_NOT_TEXT_BASED)

  const result = await RequestManager.post(
    endpoints.CHANNEL_MESSAGES(channelID),
    {
      ...content,
      allowed_mentions: content.mentions,
    },
  );

  return structures.createMessage(result as MessageCreateOptions);
}

/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export function deleteMessages(
  channelID: string,
  ids: string[],
  reason?: string,
) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_MESSAGES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }
  if (ids.length < 2) {
    throw new Error(Errors.DELETE_MESSAGES_MIN);
  }

  if (ids.length > 100) {
    console.warn(
      `This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`,
    );
  }

  return RequestManager.post(endpoints.CHANNEL_BULK_DELETE(channelID), {
    messages: ids.splice(0, 100),
    reason,
  });
}

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export function getChannelInvites(channelID: string) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_CHANNELS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }
  return RequestManager.get(endpoints.CHANNEL_INVITES(channelID));
}

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export function createInvite(channelID: string, options: CreateInviteOptions) {
  if (
    !botHasChannelPermissions(
      channelID,
      [Permissions.CREATE_INSTANT_INVITE],
    )
  ) {
    throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE);
  }
  return RequestManager.post(endpoints.CHANNEL_INVITES(channelID), options);
}

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export function getChannelWebhooks(channelID: string) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_WEBHOOKS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }
  return RequestManager.get(endpoints.CHANNEL_WEBHOOKS(channelID));
}

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelID: string;
  items: {
    channelID: string;
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

    editChannel(details.channelID, details.options);
    const secondDetails = request.items.shift();
    if (!secondDetails) return;

    return editChannel(
      secondDetails.channelID,
      secondDetails.options,
    );
  });

  if (editChannelNameTopicQueue.size) {
    setTimeout(() => processEditChannelQueue(), 600000);
  } else {
    editChannelProcessing = false;
  }
}

export function editChannel(
  channelID: string,
  options: ChannelEditOptions,
) {
  if (
    !botHasChannelPermissions(channelID, [Permissions.MANAGE_CHANNELS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  if (options.name || options.topic) {
    const request = editChannelNameTopicQueue.get(channelID);
    if (!request) {
      // If this hasnt been done before simply add 1 for it
      editChannelNameTopicQueue.set(channelID, {
        channelID: channelID,
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
      request.items.push({ channelID, options });
      if (editChannelProcessing) return;
      editChannelProcessing = true;
      processEditChannelQueue();
      return;
    }
  }

  const payload = {
    ...options,
    rate_limit_per_user: options.slowmode,
    parent_id: options.parentID,
    user_limit: options.userLimit,
    permission_overwrites: options.overwrites?.map(
      (overwrite) => {
        return {
          ...overwrite,
          allow: overwrite.allow.reduce(
            (bits, perm) => bits |= BigInt(Permissions[perm]),
            BigInt(0),
          ).toString(),
          deny: overwrite.deny.reduce(
            (bits, perm) => bits |= BigInt(Permissions[perm]),
            BigInt(0),
          ).toString(),
        };
      },
    ),
  };

  return RequestManager.patch(
    endpoints.GUILD_CHANNEL(channelID),
    payload,
  );
}

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followChannel(
  sourceChannelID: string,
  targetChannelID: string,
) {
  if (
    !botHasChannelPermissions(targetChannelID, [Permissions.MANAGE_WEBHOOKS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  const data = await RequestManager.post(
    endpoints.CHANNEL_FOLLOW(sourceChannelID),
    {
      webhook_channel_id: targetChannelID,
    },
  ) as FollowedChannelPayload;

  return data.webhook_id;
}
