import { Bot } from '../../../deps.js'
import { createScheduledEvent } from './createScheduledEvent.js'

export function events(bot: Bot) {
  createScheduledEvent(bot)
}
