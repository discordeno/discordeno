import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[webhooks] Webhook related tests",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    // Create a channel
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "wbhook" });

    await t.step("[webhooks] Create a webhook", async (t) => {
      const webhook = await bot.helpers.createWebhook(channel.id, {
        name: "idk",
      });
      assertExists(webhook);
      assertEquals(webhook.name, "idk");

      await t.step("[webhooks] Edit a webhook", async (t) => {
        const edited = await bot.helpers.editWebhook(webhook.id, {
          name: "edited",
        });

        assertNotEquals(webhook.name, edited.name);
      });

      await t.step("[webhooks] Edit a webhook with token", async () => {
        assertExists(webhook.token);
        const edited = await bot.helpers.editWebhookWithToken(webhook.id, webhook.token, {
          name: "editedtoken",
        });

        assertNotEquals(webhook.name, edited.name);
      });

      await t.step("[webhooks] Get a webhook", async () => {
        const fetched = await bot.helpers.getWebhook(webhook.id);
        assertExists(fetched);
        assertEquals(webhook.id, fetched.id);
      });

      await t.step("[webhooks] Get a webhook with a token", async () => {
        assertExists(webhook.token);
        const fetched = await bot.helpers.getWebhookWithToken(webhook.id, webhook.token);
        assertEquals(webhook.id, fetched.id);
      });
    });

    await t.step("[webhooks] Get channel webhooks", async (t) => {
      const second = await bot.helpers.createWebhook(channel.id, { name: "what nonsense" });

      assertExists(second);
      const fetched = await bot.helpers.getChannelWebhooks(channel.id);
      assertEquals(fetched.size > 1, true);

      await t.step("[webhooks] Get guild webhooks", async () => {
        const guildWebhooks = await bot.helpers.getGuildWebhooks(channel.guildId);
        assertEquals(guildWebhooks.size > 1, true);
      });
    });

    await bot.helpers.deleteChannel(channel.id);
  },
});
