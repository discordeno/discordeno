import { eventHandlers } from "../../bot.ts";
import {
  DiscordGatewayPayload,
  DiscordTypingStart,
} from "../../types/gateway.ts";

export function handleTypingStart(data: DiscordGatewayPayload) {
  eventHandlers.typingStart?.(data.d as DiscordTypingStart);
}
