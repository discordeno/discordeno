import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordVoiceServerUpdate, VoiceServerUpdate } from "../../types/voice/voice_server_update.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export async function handleVoiceServerUpdate(data: DiscordGatewayPayload) {
  const payload = snakeKeysToCamelCase(data.d as DiscordVoiceServerUpdate) as VoiceServerUpdate;

  const guild = await cacheHandlers.get("guilds", payload.guildId);
  if (!guild) return;

  eventHandlers.voiceServerUpdate?.(payload, guild);
}
