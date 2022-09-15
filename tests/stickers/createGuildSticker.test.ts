import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Create guild sticker", async () => {
  const bot = loadBot();
  const sticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker name",
    description: "sticker description",
    tags: "sticker tags",
    file: { blob: new Blob(), name: "sticker file name" },
  });
  assertEquals(sticker.name, "sticker name");
  assertEquals(sticker.description, "sticker description");
  assertEquals(sticker.tags, "sticker tags");
});
