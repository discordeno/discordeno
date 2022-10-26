import { assertExists, assertRejects } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[webhook] delete a webhook",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "deleteWebhook" });
    assertExists(channel?.id);

    const webhook = await bot.helpers.createWebhook(channel.id, { name: "delete" });
    assertExists(webhook?.id);
    assertExists(webhook.token);

    await bot.helpers.deleteWebhookWithToken(webhook.id, webhook.token);

    // Fetch the webhook to validate it was deleted
    await assertRejects(() => bot.helpers.getWebhook(webhook.id));

    await bot.helpers.deleteChannel(channel.id);
  },
});
