import { bot } from '../../bot.js'
import { processMessageCollectors } from '../../utils/collectors.js'

export function setMessageCreateEvent(): void {
  bot.events.messageCreate = async function (_, message) {
    processMessageCollectors(message)

    await Promise.allSettled([
      // SETUP-DD-TEMP: Add any functions you want to run on every message here. For example, automoderation filters.
    ]).catch(console.log)
  }
}
