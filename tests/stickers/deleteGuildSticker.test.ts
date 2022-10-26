import { assertRejects } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[stickers] Delete guild sticker",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const sticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
      name: "sticker name",
      description: "sticker description",
      tags: "sticker tags",
      file: {
        blob: await (await fetch("https://i.imgur.com/ejqd6Ro.png")).blob(),
        name: "ddlogo.png",
      },
    });
    await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker.id);
    await assertRejects(() => bot.helpers.getGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker.id));
  },
});
