import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[webhooks] Send a message with a webhook",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "webhooks" });
    assertExists(channel?.id);

    const webhook = await bot.helpers.createWebhook(channel.id, {
      name: "gigi",
    });

    assertExists(webhook.token);

    const message = await bot.helpers.sendWebhookMessage(webhook.id, webhook.token, {
      content: "discordeno is best lib",
      wait: true,
    });

    assertExists(message?.id);

    await t.step("[webhooks] Get a webhook message", async () => {
      const fetched = await bot.helpers.getWebhookMessage(webhook.id, webhook.token!, message.id);

      assertExists(fetched);
      assertEquals(fetched.content, message.content);
    });

    await t.step("[webhooks] Edit a webhook message", async () => {
      const edited = await bot.helpers.editWebhookMessage(webhook.id, webhook.token!, message.id, {
        content: "different",
      });

      assertExists(edited);
      assertNotEquals(edited.content, message.content);
    });

    await t.step("[webhooks] Delete a webhook message", async () => {
      assertExists(webhook.token);
      await bot.helpers.deleteWebhookMessage(webhook.id, webhook.token, message.id);
    });

    await bot.helpers.deleteChannel(channel.id);
  },
});
