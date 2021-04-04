import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordTypingStart } from "../../types/misc/typing_start.ts";

export function handleTypingStart(data: DiscordGatewayPayload) {
  eventHandlers.typingStart?.(data.d as DiscordTypingStart);
}
