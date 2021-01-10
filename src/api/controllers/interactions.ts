import { eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  Interaction,
  MessageApplicationPayload,
} from "../../types/mod.ts";

export function handleInternalInteractionCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as Interaction;

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: payload.member,
    },
  );
}

export function handleInternalApplicationCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as MessageApplicationPayload);
}
