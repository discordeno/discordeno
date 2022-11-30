import { Bot } from '../../../deps.js'
import { createGlobalApplicationCommand } from './createGlobalApplicationCommand.js'
import { createGuildApplicationCommand } from './createGuildApplicationCommand.js'

export function commands(bot: Bot) {
  createGlobalApplicationCommand(bot)
  createGuildApplicationCommand(bot)
}
