import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("[voice] Get voice regions", async () => {
  const regions = await bot.helpers.getVoiceRegions(guild.id);
  assertEquals(regions.size > 1, true);
});
