import { Bot } from '../../deps.js'
import { commands } from './commands/mod.js'
import { responses } from './responses/mod.js'

export function interactions(bot: Bot) {
  commands(bot)
  responses(bot)
}
