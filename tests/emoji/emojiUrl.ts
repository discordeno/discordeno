import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test("[emoji] Create an emoji url", async () => {
  assertEquals(
    bot.helpers.emojiUrl(785403373817823272n, false),
    "https://cdn.discordapp.com/emojis/785403373817823272.png"
  );
  assertEquals(bot.helpers.emojiUrl(785403373817823272n, true), "https://cdn.discordapp.com/emojis/785403373817823272.gif");
});
