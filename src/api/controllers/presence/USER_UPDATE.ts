import { eventHandlers } from "../../../bot.ts";
import { DiscordPayload, UserPayload } from "../../../types/mod.ts";
import { cacheHandlers } from "../cache.ts";

export async function handleUserUpdate(data: DiscordPayload) {
  const userData = data.d as UserPayload;

  const member = await cacheHandlers.get("members", userData.id);
  if (!member) return;

  Object.entries(userData).forEach(([key, value]) => {
    // @ts-ignore index signatures
    if (member[key] !== value) return member[key] = value;
  });

  await cacheHandlers.set("members", userData.id, member);

  eventHandlers.botUpdate?.(userData);
}
