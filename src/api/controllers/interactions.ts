import { eventHandlers } from "../../bot.ts";
import { GatewayPayload, Interaction } from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";

export async function handleInternalInteractionsCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as Interaction;

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: await structures.createMember(payload.member, payload.guild_id),
    },
  );
}

export async function handleInternalInteractionsCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "INTERACTION_CREATE") return;

  console.log(data);
  eventHandlers.interactionCreate?.(data);
}
