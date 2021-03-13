import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(channelID: string, webhookID: string) {
  await requireBotChannelPermissions(channelID, ["MANAGE_WEBHOOKS"]);

  const result = await RequestManager.delete(endpoints.WEBHOOK_ID(webhookID));

  return result;
}
