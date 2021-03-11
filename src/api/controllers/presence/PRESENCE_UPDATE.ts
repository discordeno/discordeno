import { eventHandlers } from "../../../bot.ts";
import { DiscordPayload, PresenceUpdatePayload } from "../../../types/mod.ts";
import { cacheHandlers } from "../../../cache.ts";

export async function handlePresenceUpdate(data: DiscordPayload) {
  const payload = data.d as PresenceUpdatePayload;
  const oldPresence = await cacheHandlers.get("presences", payload.user.id);
  await cacheHandlers.set("presences", payload.user.id, payload);

  eventHandlers.presenceUpdate?.(payload, oldPresence);
}
