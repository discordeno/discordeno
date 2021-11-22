import { assertExists } from "../deps.ts";
import { bot, channel } from "../mod.ts";

Deno.test("[webhooks] Delete a webhook with token", async () => {
  const webhook = await bot.helpers.createWebhook(channel.id, {
    name: "amethyst",
  });

  assertExists(webhook.token);

  await bot.helpers.deleteWebhookWithToken(webhook.id, webhook.token);
});
