import type { EventHandlers } from '@discordeno/bot'
import { bot } from '../index.js'

export const event: EventHandlers['ready'] = () => {
  // Print to the console when the bot has connected to discord and is ready to handle the events
  bot.logger.info('The bot is ready!')
}
