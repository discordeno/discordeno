import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import type { DiscordenoChannel } from "../../structures/channel.ts";
import { structures } from "../../structures/mod.ts";
import type { Channel } from "../../types/channels/channel.ts";
import type { ModifyChannel } from "../../types/channels/modify_channel.ts";
import { endpoints } from "../../util/constants.ts";
import { calculateBits, requireOverwritePermissions } from "../../util/permissions.ts";
import { snakelize } from "../../util/utils.ts";

/** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editChannel(channelId: bigint, options: ModifyChannel, reason?: string) {
  const channel = await cacheHandlers.get("channels", channelId);

  if (channel) {
    if (options.permissionOverwrites && Array.isArray(options.permissionOverwrites)) {
      await requireOverwritePermissions(channel.guildId, options.permissionOverwrites);
    }
  }

  if (options.name || options.topic) {
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
      return new Promise<DiscordenoChannel>((resolve, reject) => {
        // 2 have already been used add to queue
        request.items.push({ channelId, options, resolve, reject });
        if (editChannelProcessing) return;
        editChannelProcessing = true;
        processEditChannelQueue();
      });
    }
  }

  const result = await rest.runMethod<Channel>(
    "patch",
    endpoints.CHANNEL_BASE(channelId),
    snakelize({
      ...options,
      permissionOverwrites: options.permissionOverwrites
        ? options.permissionOverwrites?.map((overwrite) => {
            return {
              ...overwrite,
              allow: calculateBits(overwrite.allow),
              deny: calculateBits(overwrite.deny),
            };
          })
        : undefined,
      reason,
    })
  );

  return await structures.createDiscordenoChannel(result);
}

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelId: bigint;
  items: {
    channelId: bigint;
    options: ModifyChannel;
    resolve: (channel: DiscordenoChannel) => void;
    // deno-lint-ignore no-explicit-any
    reject: (error: any) => void;
  }[];
}

const editChannelNameTopicQueue = new Map<bigint, EditChannelRequest>();
let editChannelProcessing = false;

function processEditChannelQueue() {
  if (!editChannelProcessing) return;

  const now = Date.now();
  editChannelNameTopicQueue.forEach(async (request) => {
    eventHandlers.debug?.("loop", `Running forEach loop in edit_channel file.`);
    if (now < request.timestamp) return;
    // 10 minutes have passed so we can reset this channel again
    if (!request.items.length) {
      return editChannelNameTopicQueue.delete(request.channelId);
    }
    request.amount = 0;
    // There are items to process for this request
    const details = request.items.shift();

    if (!details) return;

    await editChannel(details.channelId, details.options)
      .then((result) => details.resolve(result))
      .catch(details.reject);
    const secondDetails = request.items.shift();
    if (!secondDetails) return;

    await editChannel(secondDetails.channelId, secondDetails.options)
      .then((result) => secondDetails.resolve(result))
      .catch(secondDetails.reject);
    return;
  });

  if (editChannelNameTopicQueue.size) {
    setTimeout(() => {
      eventHandlers.debug?.("loop", `Running setTimeout in EDIT_CHANNEL file.`);
      processEditChannelQueue();
    }, 60000);
  } else {
    editChannelProcessing = false;
  }
}
