import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordVoiceState } from "../../types/discord.ts";

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordVoiceState;
  if (!payload.guild_id) return;

  const guildId = bot.transformers.snowflake(payload.guild_id);

  bot.events.voiceStateUpdate(bot, bot.transformers.voiceState(bot, { voiceState: payload, guildId }));
}
