import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { VoiceServerUpdate } from "../../types/voice/voiceServerUpdate.ts";

export async function handleVoiceServerUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<VoiceServerUpdate>;

  bot.events.voiceServerUpdate(bot, {
    token: payload.token,
    guildId: bot.transformers.snowflake(payload.guild_id),
    endpoint: payload.endpoint ?? undefined,
  });
}
