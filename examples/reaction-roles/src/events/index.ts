import type { EventHandlers } from '@discordeno/bot'
import { event as interactionCreateEvent } from './interactionCreate.js'
import { event as readyEvent } from './ready.js'

export const events = {
  interactionCreate: interactionCreateEvent,
  ready: readyEvent,
} as Partial<EventHandlers>

export default events
