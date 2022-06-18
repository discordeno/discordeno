import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload,DiscordChannelPinsUpdate } from "../../deps.ts";

export async function handleChannelPinsUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannelPinsUpdate;

  bot.events.channelPinsUpdate(bot, {
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    channelId: bot.transformers.snowflake(payload.channel_id),
    lastPinTimestamp: payload.last_pin_timestamp ? Date.parse(payload.last_pin_timestamp) : undefined,
  });
}
