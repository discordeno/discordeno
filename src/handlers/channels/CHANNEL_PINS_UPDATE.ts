import type { Bot } from "../../bot.ts";
import type { ChannelPinsUpdate } from "../../types/channels/channel_pins_update.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleChannelPinsUpdate(bot: Bot, data: SnakeCasedPropertiesDeep<DiscordGatewayPayload>) {
  const payload = data.d as SnakeCasedPropertiesDeep<ChannelPinsUpdate>;

  bot.events.channelPinsUpdate(bot, {
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    channelId: bot.transformers.snowflake(payload.channel_id),
    lastPinTimestamp: payload.last_pin_timestamp ? Date.parse(payload.last_pin_timestamp) : undefined,
  });
}
