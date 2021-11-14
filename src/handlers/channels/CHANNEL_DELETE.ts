import type { Channel } from "../../types/channels/channel.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleChannelDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;
  if (!payload.guild_id) return;

  bot.events.channelDelete(
    bot,
    bot.transformers.channel(bot, {
      channel: payload,
      guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    })
  );
}
