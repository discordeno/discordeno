import { setInteractionCreateEvent } from './interactions/mod.js'
import { setMessageCreateEvent } from './messages/create.js'
import { setRawEvent } from './raw.js'

export function setupEventHandlers(): void {
  setInteractionCreateEvent()
  setRawEvent()
  setMessageCreateEvent()
}
