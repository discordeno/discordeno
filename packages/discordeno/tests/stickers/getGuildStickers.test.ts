import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[stickers] Get guild stickers",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const sticker1 = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
      name: "sticker 1",
      description: "sticker 1",
      tags: "sticker tags 1",
      file: {
        blob: await (await fetch("https://i.imgur.com/ejqd6Ro.png")).blob(),
        name: "ddlogo.png",
      },
    });
    const sticker2 = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
      name: "sticker 2",
      description: "sticker 2",
      tags: "sticker tags 2",
      file: {
        blob: await (await fetch("https://i.imgur.com/ejqd6Ro.png")).blob(),
        name: "ddlogo.png",
      },
    });
    const stickers = await bot.helpers.getGuildStickers(CACHED_COMMUNITY_GUILD_ID);
    assertEquals(stickers.size > 1, true);
    await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker1.id);
    await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker2.id);
  },
});
