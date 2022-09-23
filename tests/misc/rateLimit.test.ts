import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[Misc] Rate Limit Test", async () => {
  const bot = loadBot();
  const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID);
  await Promise.all(Array(10).map(() => bot.helpers.sendMessage(channel.id, { content: "Rate Limit Test" })));
  await bot.helpers.deleteChannel(channel.id);
});
