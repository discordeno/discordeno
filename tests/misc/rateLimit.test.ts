import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[Misc] Rate Limit Test", async () => {
  const bot = loadBot();
  const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID);
  for (let i = 0; i < 15; i += 1) await bot.helpers.sendMessage(channel.id, { content: "Rate Limit Test" });
  await bot.helpers.deleteChannel(channel.id);
});
