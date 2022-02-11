import { Bot } from "../../deps.ts";
import createWebhook from "./createWebhook.ts";
import editWebhook from "./editWebhook.ts";
import setupMessageWebhookPermChecks from "./message.ts";

export default function setupWebhooksPermChecks(bot: Bot) {
  createWebhook(bot);
  editWebhook(bot);
  setupMessageWebhookPermChecks(bot);
}
