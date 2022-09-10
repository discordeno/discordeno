import { BotWithCache } from "../../deps.ts";
import { deleteEmoji, editEmoji } from "./emojis%20copy.ts";
import { createEmoji } from "./emojis.ts";

export function emojis(bot: BotWithCache) {
  createEmoji(bot);
  deleteEmoji(bot);
  editEmoji(bot);
}
