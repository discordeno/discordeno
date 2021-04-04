import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(channelId: string, webhookId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  const result = await rest.runMethod(
    "delete",
    endpoints.WEBHOOK_ID(webhookId),
  );

  return result;
}
