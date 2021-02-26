import { RequestManager } from "../../rest/request_manager.ts";
import {
  ChannelEditOptions,
  ChannelTypes,
  CreateInviteOptions,
  Errors,
  FollowedChannelPayload,
  GetMessages,
  GetMessagesAfter,
  GetMessagesAround,
  GetMessagesBefore,
  InvitePayload,
  MessageContent,
  MessageCreateOptions,
  Permission,
  Permissions,
  RawOverwrite,
  WebhookPayload,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  botHasChannelPermissions,
  botHasPermission,
  calculateBits,
} from "../../util/permissions.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { structures } from "../structures/mod.ts";

/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildID: string,
  id: string,
  overwrites: RawOverwrite[],
  permissions: Permission[],
) {
  const overwrite = overwrites.find((perm) => perm.id === id) ||
    overwrites.find((perm) => perm.id === guildID);

  return permissions.every((perm) => {
    if (overwrite) {
      const allowBits = overwrite.allow;
      const denyBits = overwrite.deny;
      if (BigInt(denyBits) & BigInt(Permissions[perm])) return false;
      if (BigInt(allowBits) & BigInt(Permissions[perm])) return true;
    }
    return false;
  });
}

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(
  channelID: string,
  id: string,
) {
  const hasViewChannelPerm = await botHasChannelPermissions(
    channelID,
    ["VIEW_CHANNEL"],
  );
  if (
    !hasViewChannelPerm
  ) {
    throw new Error(Errors.MISSING_VIEW_CHANNEL);
  }

  const hasReadMessageHistoryPerm = await botHasChannelPermissions(
    channelID,
    ["READ_MESSAGE_HISTORY"],
  );
  if (
    !hasReadMessageHistoryPerm
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
  const hasViewChannelPerm = await botHasChannelPermissions(
    channelID,
    ["VIEW_CHANNEL"],
  );
  if (
    !hasViewChannelPerm
  ) {
    throw new Error(Errors.MISSING_VIEW_CHANNEL);
  }

  const hasReadMessageHistoryPerm = await botHasChannelPermissions(
    channelID,
    ["READ_MESSAGE_HISTORY"],
  );
  if (
    !hasReadMessageHistoryPerm
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

/**
 * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
 * However, if a bot is responding to a command and expects the computation to take a few seconds,
 * this endpoint may be called to let the user know that the bot is processing their message.
 */
export async function startTyping(channelID: string) {
  const result = await RequestManager.post(endpoints.CHANNEL_TYPING(channelID));

  return result;
}

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channelID: string,
  content: string | MessageContent,
) {
  if (typeof content === "string") content = { content };

  const channel = await cacheHandlers.get("channels", channelID);
  // If the channel is cached, we can do extra checks/safety
  if (channel) {
    if (
      ![ChannelTypes.DM, ChannelTypes.GUILD_NEWS, ChannelTypes.GUILD_TEXT]
        .includes(channel.type)
    ) {
      throw new Error(Errors.CHANNEL_NOT_TEXT_BASED);
    }

    const hasSendMessagesPerm = await botHasChannelPermissions(
      channelID,
      ["SEND_MESSAGES"],
    );
    if (
      !hasSendMessagesPerm
    ) {
      throw new Error(Errors.MISSING_SEND_MESSAGES);
    }

    const hasSendTtsMessagesPerm = await botHasChannelPermissions(
      channelID,
      ["SEND_TTS_MESSAGES"],
    );
    if (
      content.tts &&
      !hasSendTtsMessagesPerm
    ) {
      throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
    }

    const hasEmbedLinksPerm = await botHasChannelPermissions(
      channelID,
      ["EMBED_LINKS"],
    );
    if (
      content.embed &&
      !hasEmbedLinksPerm
    ) {
      throw new Error(Errors.MISSING_EMBED_LINKS);
    }

    if (content.mentions?.repliedUser) {
      if (
        !(await botHasChannelPermissions(
          channelID,
          ["READ_MESSAGE_HISTORY"],
        ))
      ) {
        throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
      }
    }
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

  const result = await RequestManager.post(
    endpoints.CHANNEL_MESSAGES(channelID),
    {
      ...content,
      allowed_mentions: content.mentions
        ? {
          ...content.mentions,
          replied_user: content.mentions.repliedUser,
        }
        : undefined,
      ...(content.replyMessageID
        ? {
          message_reference: {
            message_id: content.replyMessageID,
          },
        }
        : {}),
    },
  ) as MessageCreateOptions;

  return structures.createMessage(result);
}

/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export async function deleteMessages(
  channelID: string,
  ids: string[],
  reason?: string,
) {
  const hasManageMessages = await botHasChannelPermissions(
    channelID,
    ["MANAGE_MESSAGES"],
  );
  if (
    !hasManageMessages
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

  const result = await RequestManager.post(
    endpoints.CHANNEL_BULK_DELETE(channelID),
    {
      messages: ids.splice(0, 100),
      reason,
    },
  );

  return result;
}

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(channelID: string) {
  const hasManagaChannels = await botHasChannelPermissions(
    channelID,
    ["MANAGE_CHANNELS"],
  );
  if (
    !hasManagaChannels
  ) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  const result = await RequestManager.get(endpoints.CHANNEL_INVITES(channelID));

  return result;
}

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(
  channelID: string,
  options: CreateInviteOptions,
) {
  const hasCreateInstantInvitePerm = await botHasChannelPermissions(
    channelID,
    ["CREATE_INSTANT_INVITE"],
  );
  if (
    !hasCreateInstantInvitePerm
  ) {
    throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE);
  }

  const result = await RequestManager.post(
    endpoints.CHANNEL_INVITES(channelID),
    options,
  );

  return result;
}

/** Returns an invite for the given code. */
export async function getInvite(inviteCode: string) {
  const result = await RequestManager.get(
    endpoints.INVITE(inviteCode),
  );

  return result as InvitePayload;
}

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(
  channelID: string,
  inviteCode: string,
) {
  const hasPerm = await botHasChannelPermissions(channelID, [
    "MANAGE_CHANNELS",
  ]);

  if (!hasPerm) {
    const channel = await cacheHandlers.get("channels", channelID);

    const hasManageGuildPerm = await botHasPermission(channel!.guildID, [
      "MANAGE_GUILD",
    ]);

    if (!hasManageGuildPerm) {
      throw new Error(Errors.MISSING_MANAGE_CHANNELS);
    }
  }

  const result = await RequestManager.delete(
    endpoints.INVITE(inviteCode),
  );

  return result as InvitePayload;
}

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(channelID: string) {
  const hasManageWebhooksPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_WEBHOOKS"],
  );
  if (
    !hasManageWebhooksPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  const result = await RequestManager.get(
    endpoints.CHANNEL_WEBHOOKS(channelID),
  );

  return result as WebhookPayload[];
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

/** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editChannel(
  channelID: string,
  options: ChannelEditOptions,
  reason?: string,
) {
  const hasManageChannelsPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_CHANNELS"],
  );
  if (
    !hasManageChannelsPerm
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
    // deno-lint-ignore camelcase
    rate_limit_per_user: options.slowmode,
    // deno-lint-ignore camelcase
    parent_id: options.parentID,
    // deno-lint-ignore camelcase
    user_limit: options.userLimit,
    // deno-lint-ignore camelcase
    permission_overwrites: options.overwrites?.map(
      (overwrite) => {
        return {
          ...overwrite,
          allow: calculateBits(overwrite.allow),
          deny: calculateBits(overwrite.deny),
        };
      },
    ),
  };

  const result = await RequestManager.patch(
    endpoints.CHANNEL_BASE(channelID),
    {
      ...payload,
      reason,
    },
  );

  return result;
}

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followChannel(
  sourceChannelID: string,
  targetChannelID: string,
) {
  const hasManageWebhooksPerm = await botHasChannelPermissions(
    targetChannelID,
    ["MANAGE_WEBHOOKS"],
  );
  if (
    !hasManageWebhooksPerm
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

/**
 * Checks whether a channel is synchronized with its parent/category channel or not.
 * @param channelID The ID of the channel to test for synchronization
 * @return Returns `true` if the channel is synchronized, otherwise `false`. Returns `false` if the channel is not cached.
 */
export async function isChannelSynced(channelID: string) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel?.parentID) return false;

  const parentChannel = await cacheHandlers.get("channels", channel.parentID);
  if (!parentChannel) return false;

  return channel.permissionOverwrites?.every((overwrite) => {
    const permission = parentChannel.permissionOverwrites?.find((ow) =>
      ow.id === overwrite.id
    );
    if (!permission) return false;
    return !(overwrite.allow !== permission.allow ||
      overwrite.deny !== permission.deny);
  });
}
