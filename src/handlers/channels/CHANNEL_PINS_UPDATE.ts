import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleChannelPinsUpdate(data: DiscordPayload) {
  const payload = data.d as DiscordChannelPinsUpdateEvent;

  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  const guild = payload.guild_id
    ? await cacheHandlers.get("guilds", payload.guild_id)
    : undefined;

  eventHandlers.channelPinsUpdate?.(channel, guild, payload.last_pin_timestamp);
}
