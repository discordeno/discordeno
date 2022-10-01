import { StickerFormatTypes } from "../../mod.ts";
import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test("[stickers] Create guild sticker", async () => {
  const bot = loadBot();
  const sticker = await bot.helpers.createGuildSticker(CACHED_COMMUNITY_GUILD_ID, {
    name: "sticker name",
    description: "sticker description",
    tags: "sticker tags",
    file: "https://cdn.discordapp.com/emojis/785403373817823272.png",
  });

  assertEquals(sticker.name, "sticker name");
  assertEquals(sticker.description, "sticker description");
  assertEquals(sticker.tags, "sticker tags");

  const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "test" });
  const message = await bot.helpers.sendMessage(channel.id, { stickerIds: [sticker.id] });

  assertEquals(message.stickerItems?.[0].formatType, StickerFormatTypes.Png);
  assertEquals(message.stickerItems?.[0].id, sticker.id);
  assertEquals(message.stickerItems?.[0].name, sticker.name);

  await bot.helpers.deleteGuildSticker(CACHED_COMMUNITY_GUILD_ID, sticker.id);
  await bot.helpers.deleteChannel(channel.id);
});
