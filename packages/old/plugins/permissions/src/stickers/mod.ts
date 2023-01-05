import type { BotWithCache } from '../../deps.js'
import { createGuildSticker } from './createGuildSticker.js'
import { deleteGuildSticker } from './deleteGuildSticker.js'
import { editGuildSticker } from './editGuildSticker.js'

export function stickers (bot: BotWithCache) {
  createGuildSticker(bot)
  deleteGuildSticker(bot)
  editGuildSticker(bot)
}
