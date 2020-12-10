import { DiscordPayload } from "../types/types.ts";
import { eventHandlers } from "../module/client.ts";

export async function handleInternalInteractionsCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  console.log(data);
  eventHandlers.interactionCreate?.(data);
}
