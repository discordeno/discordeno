import { BotWithCache } from "../../deps.ts";
import { createWebhook } from "./createWebhook.ts";
import { deleteWebhook } from "./deleteWebhook.ts";
import { editWebhook } from "./editWebhook.ts";

export function webhooks(bot: BotWithCache) {
  createWebhook(bot);
  deleteWebhook(bot);
  editWebhook(bot);
}
