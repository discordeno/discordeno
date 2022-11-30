import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[stickers] Edit guild sticker",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const createSticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
      name: "test",
      description: "test",
      tags: "test",
      file: {
        blob: await (await fetch("https://i.imgur.com/ejqd6Ro.png")).blob(),
        name: "ddlogo.png",
      },
    });
    const editSticker = await bot.helpers.editGuildSticker(CACHED_COMMUNITY_GUILD_ID, createSticker.id, {
      name: "sticker name",
      description: "sticker description",
      tags: "sticker tags",
    });
    assertEquals(editSticker.name, "sticker name");
    assertEquals(editSticker.description, "sticker description");
    assertEquals(editSticker.tags, "sticker tags");

    await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, editSticker.id);
  },
});
