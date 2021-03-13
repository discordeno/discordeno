import { RequestManager } from "../../rest/request_manager.ts";
import { WebhookEditOptions, WebhookPayload } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(
  channelID: string,
  webhookID: string,
  options: WebhookEditOptions,
) {
  await requireBotChannelPermissions(channelID, ["MANAGE_WEBHOOKS"]);

  const result = await RequestManager.patch(endpoints.WEBHOOK_ID(webhookID), {
    ...options,
    channel_id: options.channelID,
  });

  return result as WebhookPayload;
}
