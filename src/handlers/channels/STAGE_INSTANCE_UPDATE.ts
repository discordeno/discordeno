import { eventHandlers } from "../../bot.ts";
import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleStageInstanceUpdate(data: DiscordGatewayPayload) {
  eventHandlers.stageInstanceUpdate?.(data.d as StageInstance);
}
