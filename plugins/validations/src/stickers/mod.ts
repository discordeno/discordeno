import { Bot } from "../../../../bot.ts";
import { createGuildSticker } from "./createGuildSticker.ts";
import { editGuildSticker } from "./editGuildSticker.ts";

export function stickers(bot: Bot) {
  createGuildSticker(bot);
  editGuildSticker(bot);
}
