import type { BotWithCache } from '../../deps.js'
import { createEmoji } from './createEmoji.js'
import { deleteEmoji } from './deleteEmoji.js'
import { editEmoji } from './editEmoji.js'

export function emojis (bot: BotWithCache) {
  createEmoji(bot)
  deleteEmoji(bot)
  editEmoji(bot)
}
