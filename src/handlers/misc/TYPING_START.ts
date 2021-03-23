import { eventHandlers } from "../../bot.ts";

export function handleTypingStart(data: DiscordPayload) {
  eventHandlers.typingStart?.(data.d as TypingStartPayload);
}
