import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import {
  DiscordGatewayPayload,
  DiscordPresenceUpdate,
} from "../../types/gateway.ts";

export async function handlePresenceUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordPresenceUpdate;
  const oldPresence = await cacheHandlers.get("presences", payload.user.id);
  await cacheHandlers.set("presences", payload.user.id, payload);

  eventHandlers.presenceUpdate?.(payload, oldPresence);
}
