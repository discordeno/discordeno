import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followChannel(
  sourceChannelId: string,
  targetChannelId: string,
) {
  await requireBotChannelPermissions(targetChannelId, ["MANAGE_WEBHOOKS"]);

  const data = (await RequestManager.post(
    endpoints.CHANNEL_FOLLOW(sourceChannelId),
    {
      webhook_channel_id: targetChannelId,
    },
  )) as FollowedChannelPayload;

  return data.webhook_id;
}
