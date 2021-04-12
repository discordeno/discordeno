import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordTypingStart,
  TypingStart,
} from "../../types/misc/typing_start.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleTypingStart(data: DiscordGatewayPayload) {
  eventHandlers.typingStart?.(
    snakeKeysToCamelCase<TypingStart>(data.d as DiscordTypingStart),
  );
}
