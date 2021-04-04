import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordVoiceState } from "../../types/voice/voice_state.ts";

export async function handleVoiceStateUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordVoiceState;
  if (!payload.guild_id) return;

  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = payload.member
    ? await structures.createMemberStruct(payload.member, guild.id)
    : await cacheHandlers.get("members", payload.user_id);
  if (!member) return;

  // No cached state before so lets make one for em
  const cachedState = guild.voiceStates.get(payload.user_id);

  guild.voiceStates.set(payload.user_id, {
    ...payload,
    guildId: payload.guild_id,
    channelId: payload.channel_id || "",
    userId: payload.user_id,
    sessionId: payload.session_id,
    selfDeaf: payload.self_deaf,
    selfMute: payload.self_mute,
    selfStream: payload.self_stream || false,
  });

  await cacheHandlers.set("guilds", payload.guild_id, guild);

  if (cachedState?.channelId !== payload.channel_id) {
    // Either joined or moved channels
    if (payload.channel_id) {
      if (cachedState?.channelId) { // Was in a channel before
        eventHandlers.voiceChannelSwitch?.(
          member,
          payload.channel_id,
          cachedState.channelId,
        );
      } else { // Was not in a channel before so user just joined
        eventHandlers.voiceChannelJoin?.(member, payload.channel_id);
      }
    } // Left the channel
    else if (cachedState?.channelId) {
      guild.voiceStates.delete(payload.user_id);
      eventHandlers.voiceChannelLeave?.(member, cachedState.channelId);
    }
  }

  eventHandlers.voiceStateUpdate?.(member, payload);
}
