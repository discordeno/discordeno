import { DiscordPayload } from "../types/types.ts";
import { eventHandlers } from "../module/client.ts";

export async function handleInternalInteractionsCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  // TODO: CACHE MEMBER
  console.log(data);
  eventHandlers.interactionCreate?.(data);
}

export async function handleInternalInteractionsCommandCreate(
  data: DiscordPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  console.log(data);
  eventHandlers.interactionCreate?.(data);
}
