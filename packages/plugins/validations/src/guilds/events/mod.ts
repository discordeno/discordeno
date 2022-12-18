import { Bot } from '../../../deps.js'
import { createScheduledEvent } from './createScheduledEvent.js'

export function events (bot: Bot) {
  createScheduledEvent(bot)

  // TODO: validations editScheduledEvent
  // if (options.name && !validateLength(options.name, { min: 1, max: 100 })) {
  //   throw new Error('Name must be between 1-100 characters.')
  // }
  // if (
  //   options.description &&
  //   !validateLength(options.description, { max: 1000 })
  // ) {
  //   throw new Error('Description must be below 1000 characters.')
  // }
  // if (options.location && !validateLength(options.location, { max: 100 })) {
  //   throw new Error('Location must be below 100 characters.')
  // }
  // if (
  //   options.scheduledStartTime &&
  //   options.scheduledEndTime &&
  //   options.scheduledStartTime > options.scheduledEndTime
  // ) {
  //   throw new Error('Cannot schedule event to end before starting.')
  // }
}
