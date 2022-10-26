import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[voice] Get voice regions",
  async fn() {
    const bot = loadBot();
    const regions = await bot.helpers.getVoiceRegions(CACHED_COMMUNITY_GUILD_ID);
    assertEquals(regions.size > 1, true);
  },
});
