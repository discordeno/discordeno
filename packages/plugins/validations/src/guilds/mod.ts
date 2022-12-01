import { Bot } from '../../deps.js'
import { createGuild } from './createGuild.js'
import { events } from './events/index.js'

export function guilds (bot: Bot) {
  events(bot)
  createGuild(bot)
}
