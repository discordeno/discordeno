import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordPresenceUpdate } from "../../types/misc/presence_update.ts";

export async function handlePresenceUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordPresenceUpdate;
  const oldPresence = await cacheHandlers.get("presences", payload.user.id);
  await cacheHandlers.set("presences", payload.user.id, payload);

  eventHandlers.presenceUpdate?.(payload, oldPresence);
}
