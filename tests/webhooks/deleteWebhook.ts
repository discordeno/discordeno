import { bot, channel } from "../mod.ts";

Deno.test("[webhooks] Delete a webhook", async () => {
  const webhook = await bot.helpers.createWebhook(channel.id, {
    name: "natico",
  });
  await bot.helpers.deleteWebhook(webhook.id);
});
