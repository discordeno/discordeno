import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { VoiceServerUpdate } from "../../types/voice/voice_server_update.ts";

export async function handleVoiceServerUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<VoiceServerUpdate>;

  bot.events.voiceServerUpdate(bot, {
    token: payload.token,
    guildId: bot.transformers.snowflake(payload.guild_id),
    endpoint: payload.endpoint ?? undefined,
  });
}
