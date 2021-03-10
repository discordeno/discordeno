import { eventHandlers } from "../../bot.ts";
import {
  DiscordGuildIntegrationsUpdateEvent,
  DiscordPayload,
} from "../../types/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleGuildIntegrationsUpdate(
  data: DiscordPayload,
) {
  const payload = data.d as DiscordGuildIntegrationsUpdateEvent;

  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  eventHandlers.guildIntegrationsUpdate?.(guild);
}
