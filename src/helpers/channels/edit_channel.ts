import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { ModifyChannel } from "../../types/channels/modify_channel.ts";
import { ModifyThread } from "../../types/channels/threads/modify_thread.ts";
import {
  Channel,
  DiscordChannelTypes,
  PermissionStrings,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotChannelPermissions,
  requireOverwritePermissions,
} from "../../util/permissions.ts";
import { camelKeysToSnakeCase, hasOwnProperty } from "../../util/utils.ts";

//TODO: implement DM group channel edit
/** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editChannel(
  channelId: string,
  options: ModifyChannel | ModifyThread,
  reason?: string,
) {
  const channel = await cacheHandlers.get("channels", channelId);

  if (channel) {
    if (
      [
        DiscordChannelTypes.GuildNewsThread,
        DiscordChannelTypes.GuildPivateThread,
        DiscordChannelTypes.GuildPublicThread,
      ].includes(channel.type)
    ) {
      const permissions = new Set<PermissionStrings>();

      if (hasOwnProperty(options, "archive") && options.archive === false) {
        permissions.add("SEND_MESSAGES");
      }

      // TODO(threads): change this to a better check
      // hacky way of checking if more is being modified
      if (Object.keys(options).length > 1) {
        permissions.add("MANAGE_THREADS");
      }

      await requireBotChannelPermissions(channel.parentId ?? "", [
        ...permissions,
      ]);
    }

    if (
      hasOwnProperty<ModifyChannel>(
        options,
        "permissionOverwrites",
      ) && Array.isArray(options.permissionOverwrites)
    ) {
      await requireOverwritePermissions(
        channel.guildId,
        options.permissionOverwrites,
      );
    }
  }

  if (options.name || (options as ModifyChannel).topic) {
    const request = editChannelNameTopicQueue.get(channelId);
    if (!request) {
      // If this hasnt been done before simply add 1 for it
      editChannelNameTopicQueue.set(channelId, {
        channelId: channelId,
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
      request.items.push({ channelId, options });
      if (editChannelProcessing) return;
      editChannelProcessing = true;
      processEditChannelQueue();
      return;
    }
  }

  const payload = {
    ...camelKeysToSnakeCase<{}>(options),
    // deno-lint-ignore camelcase
    permission_overwrites:
      hasOwnProperty<ModifyChannel>(options, "permissionOverwrites")
        ? options.permissionOverwrites?.map((overwrite) => {
          return {
            ...overwrite,
            allow: calculateBits(overwrite.allow),
            deny: calculateBits(overwrite.deny),
          };
        })
        : undefined,
  };

  return await rest.runMethod<Channel>(
    "patch",
    endpoints.CHANNEL_BASE(channelId),
    {
      ...payload,
      reason,
    },
  );
}

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelId: string;
  items: {
    channelId: string;
    options: ModifyChannel;
  }[];
}

const editChannelNameTopicQueue = new Map<string, EditChannelRequest>();

let editChannelProcessing = false;

function processEditChannelQueue() {
  if (!editChannelProcessing) return;

  const now = Date.now();
  editChannelNameTopicQueue.forEach((request) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach loop in edit_channel file.`,
    );
    if (now > request.timestamp) return;
    // 10 minutes have passed so we can reset this channel again
    if (!request.items.length) {
      return editChannelNameTopicQueue.delete(request.channelId);
    }
    request.amount = 0;
    // There are items to process for this request
    const details = request.items.shift();

    if (!details) return;

    editChannel(details.channelId, details.options);
    const secondDetails = request.items.shift();
    if (!secondDetails) return;

    return editChannel(secondDetails.channelId, secondDetails.options);
  });

  if (editChannelNameTopicQueue.size) {
    setTimeout(() => {
      eventHandlers.debug?.(
        "loop",
        `Running setTimeout in EDIT_CHANNEL file.`,
      );
      processEditChannelQueue();
    }, 600000);
  } else {
    editChannelProcessing = false;
  }
}
