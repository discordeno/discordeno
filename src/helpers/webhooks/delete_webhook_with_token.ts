import type {Bot} from "../../bot.ts";

/** Delete a webhook permanently. Returns a undefined on success */
export async function deleteWebhookWithToken(bot: Bot, webhookId: bigint, webhookToken: string) {
  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.WEBHOOK(webhookId, webhookToken));
}
