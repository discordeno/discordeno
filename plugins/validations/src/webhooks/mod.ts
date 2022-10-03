import { Bot } from "../../deps.ts";
import { createWebhook } from "./createWebhook.ts";
import { editWebhook } from "./editWebhook.ts";
import { editWebhookMessage } from "./editWebhookMessage.ts";
import { sendWebhookMessage } from "./sendWebhookMessage.ts";

export function webhooks(bot: Bot) {
  createWebhook(bot);
  editWebhookMessage(bot);
  editWebhook(bot);
  sendWebhookMessage(bot);
}
