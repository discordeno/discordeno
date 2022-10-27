import { assertExists } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[thread] Delete a thread",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "threads" });
    const message = await bot.helpers.sendMessage(channel.id, { content: "thread message" });
    const thread = await bot.helpers.startThreadWithMessage(channel.id, message.id, {
      reason: "idk",
      rateLimitPerUser: 5,
      name: "tread carefully",
      autoArchiveDuration: 60,
    });

    const threadMessage = await bot.helpers.sendMessage(thread.id, { content: "message in a bottle" });
    assertExists(threadMessage.id);

    await bot.helpers.deleteChannel(thread.id);

    await bot.helpers.deleteChannel(channel.id);
  },
});
