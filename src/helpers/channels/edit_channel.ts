import { RequestManager } from "../../rest/request_manager.ts";
import { ModifyChannel } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotChannelPermissions,
} from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editChannel(
  channelId: string,
  options: ModifyChannel,
  reason?: string,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_CHANNELS"]);

  const payload = {
    ...snakeKeysToCamelCase(options),
    permission_overwrites: options.permissionOverwrites?.map((overwrite) => {
      return {
        ...overwrite,
        allow: calculateBits(overwrite.allow),
        deny: calculateBits(overwrite.deny),
      };
    }),
    reason,
  };

  const result = await RequestManager.patch(
    endpoints.CHANNEL_BASE(channelId),
    payload,
  );

  return result;
}
