import { Bot } from '../../../../bot.js'
import { createGuildSticker } from './createGuildSticker.js'
import { editGuildSticker } from './editGuildSticker.js'

export function stickers(bot: Bot) {
  createGuildSticker(bot)
  editGuildSticker(bot)
}
