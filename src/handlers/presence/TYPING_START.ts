import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, TypingStartPayload } from "../../types/mod.ts";

export function handleTypingStart(data: DiscordPayload) {
  eventHandlers.typingStart?.(data.d as TypingStartPayload);
}
