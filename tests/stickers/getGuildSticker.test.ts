import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Get guild sticker", async () => {
  const bot = loadBot();
  const createSticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker name",
    description: "sticker description",
    tags: "sticker tags",
    file: { blob: new Blob(), name: "sticker file name" },
  });
  const getSticker = await bot.helpers.getGuildSticker(CACHED_COMMUNITY_GUILD_ID, createSticker.id);
  assertEquals(getSticker.name, "sticker name");
  assertEquals(getSticker.description, "sticker description");
  assertEquals(getSticker.tags, "sticker tags");

  await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, getSticker.id);
});
