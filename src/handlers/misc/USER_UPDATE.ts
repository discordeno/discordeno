import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway.ts";

export async function handleUserUpdate(data: DiscordGatewayPayload) {
  const userData = data.d as DiscordUser;

  const member = await cacheHandlers.get("members", userData.id);
  if (!member) return;

  Object.entries(userData).forEach(([key, value]) => {
    // @ts-ignore index signatures
    if (member[key] !== value) return member[key] = value;
  });

  await cacheHandlers.set("members", userData.id, member);

  eventHandlers.botUpdate?.(userData);
}
