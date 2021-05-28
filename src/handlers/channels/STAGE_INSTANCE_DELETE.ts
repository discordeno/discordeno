import { eventHandlers } from "../../bot.ts";
import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleStageInstanceDelete(data: DiscordGatewayPayload) {
  eventHandlers.stageInstanceDelete?.(data.d as StageInstance);
}
