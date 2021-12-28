import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";
import { bot, channel } from "../mod.ts";

Deno.test("[webhooks] Send a message with a webhook", async (t) => {
  const webhook = await bot.helpers.createWebhook(channel.id, {
    name: "gigi",
  });

  assertExists(webhook.token);
  const message = await bot.helpers.sendWebhook(webhook.id, webhook.token, {
    content: "discordeno is best lib",
    wait: true,
  });

  assertExists(message);

  await t.step("[webhooks] Get a webhook message", async () => {
    const fetched = await bot.helpers.getWebhookMessage(webhook.id, webhook.token!, message.id);

    assertExists(fetched);
    assertEquals(fetched.content, message.content);
  });

  await t.step("[webhooks] Edit a webhook message", async () => {
    const edited = await bot.helpers.editWebhookMessage(webhook.id, webhook.token!, {
      messageId: message.id,
      content: "different",
    });

    assertExists(edited);
    assertNotEquals(edited.content, message.content);
  });

  await t.step("[webhooks] Delete a webhook message", async () => {
    assertExists(webhook.token);
    await bot.helpers.deleteWebhookMessage(webhook.id, webhook.token, message.id);
  });
});
