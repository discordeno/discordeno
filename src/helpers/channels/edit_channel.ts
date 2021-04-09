import { eventHandlers } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { ModifyChannel } from "../../types/channels/modify_channel.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotChannelPermissions,
} from "../../util/permissions.ts";

/** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editChannel(
  channelId: string,
  options: ModifyChannel,
  reason?: string,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_CHANNELS"]);

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
      // 2 have already been used add to queue
      request.items.push({ channelId, options });
      if (editChannelProcessing) return;
      editChannelProcessing = true;
      processEditChannelQueue();
      return;
    }
  }

  const payload = {
    ...options,
    // deno-lint-ignore camelcase
    rate_limit_per_user: options.rateLimitPerUser,
    // deno-lint-ignore camelcase
    parent_id: options.parentId,
    // deno-lint-ignore camelcase
    user_limit: options.userLimit,
    // deno-lint-ignore camelcase
    permission_overwrites: options.permissionOverwrites?.map((overwrite) => {
      return {
        ...overwrite,
        allow: calculateBits(overwrite.allow),
        deny: calculateBits(overwrite.deny),
      };
    }),
  };

  const result = await rest.runMethod(
    "patch",
    endpoints.CHANNEL_BASE(channelId),
    {
      ...payload,
      reason,
    },
  );

  return result;
}

const editChannelNameTopicQueue = new Map<string, EditChannelRequest>();
let editChannelProcessing = false;

function processEditChannelQueue() {
  if (!editChannelProcessing) return;

  const now = Date.now();
  editChannelNameTopicQueue.forEach((request) => {
    eventHandlers.debug(
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
      eventHandlers.debug(
        "loop",
        `Running setTimeout in EDIT_CHANNEL file.`,
      );
      processEditChannelQueue();
    }, 600000);
  } else {
    editChannelProcessing = false;
  }
}
