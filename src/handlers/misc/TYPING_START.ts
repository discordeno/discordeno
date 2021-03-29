import { eventHandlers } from "../../bot.ts";

export function handleTypingStart(data: DiscordGatewayPayload) {
  eventHandlers.typingStart?.(data.d as DiscordTypingStart);
}
