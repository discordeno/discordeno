import { BotWithCache } from '../../../deps.js'
import { createScheduledEvent } from './createScheduledEvent.js'
import { editScheduledEvent } from './editScheduledEvent.js'

export function events(bot: BotWithCache) {
  createScheduledEvent(bot)
  editScheduledEvent(bot)
}
