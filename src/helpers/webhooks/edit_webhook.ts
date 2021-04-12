import { rest } from "../../rest/rest.ts";
import { ModifyWebhook } from "../../types/webhooks/modify_webhook.ts";
import { DiscordWebhook, Webhook } from "../../types/webhooks/webhook.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(
  channelId: string,
  webhookId: string,
  options: ModifyWebhook,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  const result: DiscordWebhook = await rest.runMethod(
    "patch",
    endpoints.WEBHOOK_ID(webhookId),
    {
      ...options,
      channel_id: options.channelId,
    },
  );

  return snakeKeysToCamelCase<Webhook>(result);
}
