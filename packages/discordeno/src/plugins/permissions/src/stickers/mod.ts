import { BotWithCache } from "../../deps.ts";
import { createGuildSticker } from "./createGuildSticker.ts";
import { deleteGuildSticker } from "./deleteGuildSticker.ts";
import { editGuildSticker } from "./editGuildSticker.ts";

export function stickers(bot: BotWithCache) {
  createGuildSticker(bot);
  deleteGuildSticker(bot);
  editGuildSticker(bot);
}
