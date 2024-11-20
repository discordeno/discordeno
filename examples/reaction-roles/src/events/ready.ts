import { bot } from '../bot.js'

export const event: typeof bot.events.ready = () => {
  // Print to the console when the bot has connected to discord and is ready to handle the events
  bot.logger.info('The bot is ready!')
}
