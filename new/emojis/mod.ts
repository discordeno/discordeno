import createEmoji from "./createEmoji.ts";
import { Emoji } from "../../transformers/emoji.ts";
import deleteEmoji from "./deleteEmoji.ts";
import editEmoji from "./editEmoji.ts";
import emojiUrl from "./emojiUrl.ts";
import getEmoji from "./getEmoji.ts";
import getEmojis from "./getEmojis.ts";
import { sanitizeMode } from "../constants.ts";
Deno.test({
  name: "Emojis",
  async fn(t) {
    let emoji: Emoji;
    await t.step({
      name: "createEmoji: Create an emoji",
      async fn() {
        emoji = await createEmoji();
      },
    });
    await t.step({
      name: "editEmoji: Edit an emoji",
      async fn() {
        await editEmoji(emoji);
      },
    });
    await t.step({
      name: "emojiUrl: Get an emoji url",
      async fn(t) {
        await emojiUrl(t);
      },
    });
    await t.step({
      name: "getEmoji: Get an emoji",
      async fn() {
        await getEmoji(emoji);
      },
    });
    await t.step({
      name: "getEmojis: Get emojis",
      async fn() {
        await getEmojis();
      },
    });
    await t.step({
      name: "deleteEmoji: Delete an emoji",
      async fn() {
        await deleteEmoji(emoji);
      },
    });
  },
  sanitizeOps: sanitizeMode.sanitizeOps,
  sanitizeExit: sanitizeMode.sanitizeExit,
  sanitizeResources: sanitizeMode.sanitizeResources,
});
