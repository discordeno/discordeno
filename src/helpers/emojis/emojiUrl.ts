import { Bot } from "../../bot.ts";

/** Creates a url to the emoji from the Discord CDN. */
export function emojiUrl(bot: Bot, id: bigint, animated = false) {
  return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
}
