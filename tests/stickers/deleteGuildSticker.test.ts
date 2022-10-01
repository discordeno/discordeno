import { assertRejects } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Delete guild sticker", async () => {
  const bot = loadBot();
  const sticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker name",
    description: "sticker description",
    tags: "sticker tags",
    file: {
      blob: await (await fetch("https://cdn.discordapp.com/emojis/785403373817823272.png")).blob(),
      name: "ddlogo.png",
    },
  });
  await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker.id);
  await assertRejects(() => bot.helpers.getGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker.id));
});
