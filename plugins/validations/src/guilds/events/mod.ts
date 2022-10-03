import { Bot } from "../../../deps.ts";
import { createScheduledEvent } from "./createScheduledEvent.ts";

export function events(bot: Bot) {
  createScheduledEvent(bot);
}
