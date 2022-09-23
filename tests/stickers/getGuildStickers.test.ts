import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Get guild stickers", async () => {
  const bot = loadBot();
  const sticker1 = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker 1",
    description: "sticker 1",
    tags: "sticker tags 1",
    file: { blob: new Blob(), name: "test1.png" },
  });
  const sticker2 = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker 2",
    description: "sticker 2",
    tags: "sticker tags 2",
    file: { blob: new Blob(), name: "test2.png" },
  });
  const stickers = await bot.helpers.getGuildStickers(CACHED_COMMUNITY_GUILD_ID);
  assertEquals(stickers.size > 1, true);
  await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker1.id);
  await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker2.id);
});
