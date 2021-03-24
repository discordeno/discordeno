import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followChannel(
  sourceChannelID: string,
  targetChannelID: string,
) {
  await requireBotChannelPermissions(targetChannelID, ["MANAGE_WEBHOOKS"]);

  const data = (await RequestManager.post(
    endpoints.CHANNEL_FOLLOW(sourceChannelID),
    {
      webhook_channel_id: targetChannelID,
    },
  )) as FollowedChannelPayload;

  return data.webhook_id;
}
