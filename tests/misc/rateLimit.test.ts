import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[Misc] Rate Limit Test",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "test" });
    await Promise.all(Array(10).map(() => bot.helpers.sendMessage(channel.id, { content: "Rate Limit Test" })));
    await bot.helpers.deleteChannel(channel.id);
  },
});
