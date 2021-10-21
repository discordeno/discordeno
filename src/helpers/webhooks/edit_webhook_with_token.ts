import type { ModifyWebhook } from "../../types/webhooks/modify_webhook.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import type {Bot} from "../../bot.ts";
import type {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
    bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  options: Omit<ModifyWebhook, "channelId">
) {
  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<Webhook>>(bot.rest,"patch", bot.constants.endpoints.WEBHOOK(webhookId, webhookToken), {
    name: options.name,
    avatar: options.avatar
  });
}
