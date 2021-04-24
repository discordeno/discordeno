import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { ChannelPinsUpdate } from "../../types/channels/channel_pins_update.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleChannelPinsUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as ChannelPinsUpdate;

  const channel = await cacheHandlers.get("channels", payload.channelId);
  if (!channel) return;

  const guild = payload.guildId
    ? await cacheHandlers.get("guilds", payload.guildId)
    : undefined;

  eventHandlers.channelPinsUpdate?.(channel, guild, payload.lastPinTimestamp);
}
