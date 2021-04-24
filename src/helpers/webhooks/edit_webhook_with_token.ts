import { rest } from "../../rest/rest.ts";
import { ModifyWebhook } from "../../types/webhooks/modify_webhook.ts";
import { Webhook } from "../../types/webhooks/webhook.ts";
import { endpoints } from "../../util/constants.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  webhookId: string,
  webhookToken: string,
  options: Omit<ModifyWebhook, "channelId">,
) {
  return await rest.runMethod<Webhook>(
    "patch",
    endpoints.WEBHOOK(webhookId, webhookToken),
    options,
  );
}
