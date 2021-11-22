import { bot, channel } from "../mod.ts";
import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";

Deno.test("[webhooks] Webhook related tests", async (t) => {
  let webhook = await bot.helpers.createWebhook(channel.id, {
    name: "idk",
  });

  await t.step("[webhooks] Create a webhook", async () => {
    assertExists(webhook);
    assertEquals(webhook.name, "idk");
  });

  await t.step("[webhooks] Edit a webhook", async () => {
    const edited = await bot.helpers.editWebhook(channel.id, webhook.id, {
      name: "edited",
    });

    assertNotEquals(webhook.name, edited.name);

    webhook = edited;
  });

  await t.step("[webhooks] Edit a webhook with token", async () => {
    assertExists(webhook.token);
    const edited = await bot.helpers.editWebhookWithToken(webhook.id, webhook.token, {
      name: "editedtoken",
    });

    assertNotEquals(webhook.name, edited.name);

    webhook = edited;
  });

  await t.step("[webhooks] Get a webhook", async () => {
    const fetched = await bot.helpers.getWebhook(webhook.id);
    assertEquals(webhook.id, fetched.id);
    assertEquals(webhook.name, fetched.name);
  });

  await t.step("[webhooks] Get channel webhooks", async (t) => {
    const second = await bot.helpers.createWebhook(channel.id, { name: "what nonsense" });

    assertExists(second);
    const fetched = await bot.helpers.getChannelWebhooks(channel.id);
    assertEquals(fetched.size > 1, true);

    await t.step("[webhooks] Get guild webhooks", async () => {
      const guildWebhooks = await bot.helpers.getWebhooks(channel.guildId);
      assertEquals(guildWebhooks.size > 1, true);
    });
  });

  await t.step("[webhooks] Get a webhook with a token", async () => {
    assertExists(webhook.token);
    const fetched = await bot.helpers.getWebhookWithToken(webhook.id, webhook.token);
    assertEquals(webhook.id, fetched.id);
    assertEquals(webhook.name, fetched.name);
  });
});
