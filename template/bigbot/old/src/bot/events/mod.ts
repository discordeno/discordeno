import { setInteractionCreateEvent } from "./handlers/interactionCreate.ts";
import { logger } from "../../utils/logger.ts";

const log = logger({ name: "EventHandlers" });

export function setupEventHandlers() {
  log.debug("Adding Event Handlers!");
  setInteractionCreateEvent();
}
