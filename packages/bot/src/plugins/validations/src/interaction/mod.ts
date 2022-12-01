import { Bot } from '../../deps.js'
import { commands } from './commands/index.js'
import { responses } from './responses/index.js'

export function interactions (bot: Bot) {
  commands(bot)
  responses(bot)
}
