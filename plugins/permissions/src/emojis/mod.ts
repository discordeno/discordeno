import { BotWithCache } from "../../deps.ts";
import { createEmoji } from "./createEmoji.ts";
import { deleteEmoji } from "./deleteEmoji.ts";
import { editEmoji } from "./editEmoji.ts";

export function emojis(bot: BotWithCache) {
  createEmoji(bot);
  deleteEmoji(bot);
  editEmoji(bot);
}
