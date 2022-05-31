import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[typing] start typing", async () => {
  const bot = loadBot();
  const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "typing" });
  await bot.helpers.startTyping(channel.id);
});
