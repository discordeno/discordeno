import type { EventHandlers } from '@discordeno/bot'
import { event as interactionCreateEvent } from './interactionCreate.js'
import { event as readyEvent } from './ready.js'

export default {
  interactionCreate: interactionCreateEvent,
  ready: readyEvent,
} as Partial<EventHandlers>
