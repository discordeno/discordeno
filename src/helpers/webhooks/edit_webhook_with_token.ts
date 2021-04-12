import { rest } from "../../rest/rest.ts";
import { ModifyWebhook } from "../../types/webhooks/modify_webhook.ts";
import { Webhook } from "../../types/webhooks/webhook.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  webhookId: string,
  webhookToken: string,
  options: Omit<ModifyWebhook, "channelId">,
) {
  const result = await rest.runMethod(
    "patch",
    endpoints.WEBHOOK(webhookId, webhookToken),
    options,
  );

  return snakeKeysToCamelCase(result) as Webhook;
}
