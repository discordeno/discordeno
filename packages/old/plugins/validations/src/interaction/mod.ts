import type { Bot } from '../../deps.js'
import { commands } from './commands/index.js.js'
import { responses } from './responses/index.js.js'

export function interactions (bot: Bot) {
  commands(bot)
  responses(bot)
}
