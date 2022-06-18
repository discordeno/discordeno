import { Bot } from "../../bot.ts";
import { DiscordChannel, DiscordGatewayPayload } from "../../deps.ts";

export async function handleChannelDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  if (!payload.guild_id) return;

  bot.events.channelDelete(
    bot,
    bot.transformers.channel(bot, {
      channel: payload,
      guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    }),
  );
}
