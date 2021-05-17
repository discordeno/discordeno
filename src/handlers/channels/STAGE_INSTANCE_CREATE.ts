import { eventHandlers } from "../../bot.ts";
import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleStageInstanceCreate(data: DiscordGatewayPayload) {
  eventHandlers.stageInstanceCreate?.(data.d as StageInstance);
}
