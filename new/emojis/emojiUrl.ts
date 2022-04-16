import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

export default async function (t: Deno.TestContext) {
  await t.step({
    name: "animated: false",
    fn() {
      assertEquals(
        bot.helpers.emojiUrl(785403373817823272n, false),
        "https://cdn.discordapp.com/emojis/785403373817823272.png",
      );
    },
  });
  await t.step({
    name: "animated: true",
    fn() {
      assertEquals(
        bot.helpers.emojiUrl(785403373817823272n, true),
        "https://cdn.discordapp.com/emojis/785403373817823272.gif",
      );
    },
  });
}
