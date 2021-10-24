import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { VoiceState } from "../../types/voice/voice_state.ts";
import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<VoiceState>;
  if (!payload.guild_id) return;

  const guildId = bot.transformers.snowflake(payload.guild_id);
  const voiceState = bot.transformers.voiceState(bot, { voiceState: payload, guildId });

  const guild = await bot.cache.guilds.get(guildId);
  if (guild) {
    guild.voiceStates.set(voiceState.userId, voiceState);
    await bot.cache.guilds.set(guild.id, guild);
  }

  const member = payload.member ? bot.transformers.member(bot, payload.member, guildId) : undefined;
  const user = payload.member ? bot.transformers.user(bot, payload.member.user) : undefined;

  bot.events.voiceStateUpdate(bot, voiceState, { guild, member, user });
}
