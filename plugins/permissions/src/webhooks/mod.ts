import { BotWithCache } from "../../deps.ts";
import { createWebhook } from "./createWebhook.ts";
import { deleteWebhook } from "./deleteWebhook.ts";
import { editWebhook } from "./editWebhook.ts";
import { editWebhookMessage } from "./editWebhookMessage.ts";
import { sendWebhookMessage } from "./sendWebhook.ts";

export function webhooks(bot: BotWithCache) {
  createWebhook(bot);
  deleteWebhook(bot);
  editWebhook(bot);
  editWebhookMessage(bot);
  sendWebhookMessage(bot);
}
