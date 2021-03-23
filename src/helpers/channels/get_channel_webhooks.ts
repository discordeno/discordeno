import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(channelID: string) {
  await requireBotChannelPermissions(channelID, ["MANAGE_WEBHOOKS"]);

  const result = await RequestManager.get(
    endpoints.CHANNEL_WEBHOOKS(channelID),
  );

  return result as WebhookPayload[];
}
