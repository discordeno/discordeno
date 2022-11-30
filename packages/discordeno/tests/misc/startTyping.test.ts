import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[typing] start typing",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "typing" });
    await bot.helpers.startTyping(channel.id);
    await bot.helpers.deleteChannel(channel.id);
  },
});
