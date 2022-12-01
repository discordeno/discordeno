import { Bot } from '../../deps.js'
import { threads } from './threads/index.js'

export function channels (bot: Bot) {
  threads(bot)
}
