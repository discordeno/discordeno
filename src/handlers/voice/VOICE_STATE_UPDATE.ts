import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordGuildMemberWithUser } from "../../types/mod.ts";
import {
  DiscordVoiceState,
  VoiceState,
} from "../../types/voice/voice_state.ts";
import {
  camelKeysToSnakeCase,
  snakeKeysToCamelCase,
} from "../../util/utils.ts";

export async function handleVoiceStateUpdate(data: DiscordGatewayPayload) {
  const payload = snakeKeysToCamelCase<VoiceState>(
    data.d as DiscordVoiceState,
  );
  if (!payload.guildId) return;

  const guild = await cacheHandlers.get("guilds", payload.guildId);
  if (!guild) return;

  const member = payload.member
    ? await structures.createDiscordenoMember(
      camelKeysToSnakeCase<DiscordGuildMemberWithUser>(payload),
      guild.id,
    )
    : await cacheHandlers.get("members", payload.userId);
  if (!member) return;

  // No cached state before so lets make one for em
  const cachedState = guild.voiceStates.get(payload.userId);

  guild.voiceStates.set(
    payload.userId,
    payload,
  );

  await cacheHandlers.set("guilds", payload.guildId, guild);

  if (cachedState?.channelId !== payload.channelId) {
    // Either joined or moved channels
    if (payload.channelId) {
      if (cachedState?.channelId) { // Was in a channel before
        eventHandlers.voiceChannelSwitch?.(
          member,
          payload.channelId,
          cachedState.channelId,
        );
      } else { // Was not in a channel before so user just joined
        eventHandlers.voiceChannelJoin?.(member, payload.channelId);
      }
    } // Left the channel
    else if (cachedState?.channelId) {
      guild.voiceStates.delete(payload.userId);
      eventHandlers.voiceChannelLeave?.(member, cachedState.channelId);
    }
  }

  eventHandlers.voiceStateUpdate?.(member, payload);
}
