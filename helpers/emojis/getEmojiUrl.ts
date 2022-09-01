import { Bot } from "../../bot.ts";

/** Creates a url to the emoji from the Discord CDN. */
export function getEmojiURL(_bot: Bot, id: bigint, animated = false): string {
  return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
}
