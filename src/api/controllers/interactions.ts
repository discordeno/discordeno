import { snakeKeysToCamelCase, structures } from "../../../mod.ts";
import { eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  InteractionPayload,
  MessageApplicationPayload,
} from "../../types/mod.ts";

export async function handleInternalInteractionCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as InteractionPayload;
  await structures.createMember(payload.member, payload.guild_id);

  eventHandlers.interactionCreate?.(snakeKeysToCamelCase(payload));
}

export function handleInternalApplicationCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as MessageApplicationPayload);
}
