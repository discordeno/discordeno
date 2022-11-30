import { BotWithCache } from "../../../deps.ts";
import { createScheduledEvent } from "./createScheduledEvent.ts";
import { editScheduledEvent } from "./editScheduledEvent.ts";

export function events(bot: BotWithCache) {
  createScheduledEvent(bot);
  editScheduledEvent(bot);
}
