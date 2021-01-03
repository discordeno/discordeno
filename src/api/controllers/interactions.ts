import { eventHandlers } from "../../bot.ts";
import { GatewayPayload, Interaction } from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";

export async function handleInternalInteractionCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as Interaction;
  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: await structures.createMember(payload.member, payload.guild_id),
    },
  );
}

export async function handleInternalApplicationCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as Application);
}
