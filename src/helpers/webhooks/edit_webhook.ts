import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(
  channelId: string,
  webhookId: string,
  options: WebhookEditOptions,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.WEBHOOK_ID(webhookId),
    {
      ...options,
      channel_id: options.channelId,
    },
  );

  return result as WebhookPayload;
}
