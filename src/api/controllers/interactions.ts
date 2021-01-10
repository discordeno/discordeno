import { snakeKeysToCamelCase, structures } from "../../../mod.ts";
import { eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  Interaction,
  MessageApplicationPayload,
} from "../../types/mod.ts";

export async function handleInternalInteractionCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as Interaction;
  await structures.createMember(payload.member, payload.guild_id);

  eventHandlers.interactionCreate?.(snakeKeysToCamelCase(payload));
}

export function handleInternalApplicationCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as MessageApplicationPayload);
}
