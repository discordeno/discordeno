import { setInteractionCreateEvent } from "./interactions/mod";
import { setMessageCreateEvent } from "./messages/create";
import { setRawEvent } from "./raw";

export function setupEventHandlers() {
  setInteractionCreateEvent();
  setRawEvent();
  setMessageCreateEvent();
}
