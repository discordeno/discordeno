import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Get guild stickers", async () => {
  const bot = loadBot();
  const sticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker name",
    description: "sticker description",
    tags: "sticker tags",
    file: { blob: new Blob(), name: "sticker file name" },
  });
  const stickers = await bot.helpers.getGuildStickers(CACHED_COMMUNITY_GUILD_ID);
  assertEquals(stickers.size > 0, true);
});
