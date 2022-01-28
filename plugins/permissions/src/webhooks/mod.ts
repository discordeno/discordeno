import { BotWithCache } from "../../deps.ts";
import createWebhook from "./createWebhook.ts";
import deleteWebhook from "./deleteWebhook.ts";
import editWebhook from "./editWebhook.ts";
import setupMessageWebhookPermChecks from "./message.ts";

export default function setupWebhooksPermChecks(bot: BotWithCache) {
  createWebhook(bot);
  deleteWebhook(bot);
  editWebhook(bot);
  setupMessageWebhookPermChecks(bot);
}
