import { Bot } from '../../deps.js'
import { threads } from './threads/mod.js'

export function channels(bot: Bot) {
  threads(bot)
}
