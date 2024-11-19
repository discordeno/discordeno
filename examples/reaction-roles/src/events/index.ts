import type { bot } from '../bot.js'
import { event as interactionCreateEvent } from './interactionCreate.js'
import { event as readyEvent } from './ready.js'

export const events = {
  interactionCreate: interactionCreateEvent,
  ready: readyEvent,
} as typeof bot.events

export default events
