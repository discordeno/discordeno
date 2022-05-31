import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[webhook] delete a webhook",
  fn: async () => {
    const bot = loadBot();

    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "deleteWebhook" });
    assertExists(channel?.id);

    const webhook = await bot.helpers.createWebhook(channel.id, { name: "delete" });
    assertExists(webhook?.id);

    await bot.helpers.deleteWebhook(webhook.id);

    // Fetch the webhook to validate it was deleted
    const deletedWebhook = await bot.helpers.getWebhook(webhook.id);

    assertEquals(deletedWebhook, undefined);

    await bot.helpers.deleteChannel(channel.id);
  },
});
