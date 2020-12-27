import { eventHandlers, setBotID } from "../../bot.ts";
import {
  DiscordPayload,
  PresenceUpdatePayload,
  ReadyPayload,
  TypingStartPayload,
  UserPayload,
  VoiceStateUpdatePayload,
  WebhookUpdatePayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { delay } from "../../util/utils.ts";
import { allowNextShard } from "../../ws/shard_manager.ts";
import {
  initialMemberLoadQueue,
  structures,
} from "../structures/structures.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalReady(
  data: DiscordPayload,
  shardID: number,
) {
  if (data.t !== "READY") return;

  const payload = data.d as ReadyPayload;
  setBotID(payload.user.id);

  // Triggered on each shard
  eventHandlers.shardReady?.(shardID);
  if (payload.shard && shardID === payload.shard[1] - 1) {
    // Wait for 5 seconds to allow all guild create events to be processed
    await delay(5000);
    cache.isReady = true;
    eventHandlers.ready?.();

    // All the members that came in on guild creates should now be processed 1 by 1
    for (const [guildID, members] of initialMemberLoadQueue.entries()) {
      await Promise.all(
        members.map((member) => structures.createMember(member, guildID)),
      );
    }
  }

  // Wait 5 seconds to spawn next shard
  await delay(5000);
  allowNextShard();
}

export async function handleInternalPresenceUpdate(data: DiscordPayload) {
  if (data.t !== "PRESENCE_UPDATE") return;

  const payload = data.d as PresenceUpdatePayload;
  const oldPresence = await cacheHandlers.get("presences", payload.user.id);
  cacheHandlers.set("presences", payload.user.id, payload);

  return eventHandlers.presenceUpdate?.(payload, oldPresence);
}

export function handleInternalTypingStart(data: DiscordPayload) {
  if (data.t !== "TYPING_START") return;
  eventHandlers.typingStart?.(data.d as TypingStartPayload);
}

export async function handleInternalUserUpdate(data: DiscordPayload) {
  if (data.t !== "USER_UPDATE") return;

  const userData = data.d as UserPayload;

  const member = await cacheHandlers.get("members", userData.id);
  if (!member) return;

  Object.entries(userData).forEach(([key, value]) => {
    // @ts-ignore
    if (member[key] !== value) return member[key] = value;
  });
  return eventHandlers.botUpdate?.(userData);
}

export async function handleInternalVoiceStateUpdate(data: DiscordPayload) {
  if (data.t !== "VOICE_STATE_UPDATE") return;

  const payload = data.d as VoiceStateUpdatePayload;
  if (!payload.guild_id) return;

  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = payload.member
    ? await structures.createMember(payload.member, guild.id)
    : await cacheHandlers.get("members", payload.user_id);
  if (!member) return;

  // No cached state before so lets make one for em
  const cachedState = guild.voiceStates.get(payload.user_id);

  guild.voiceStates.set(payload.user_id, {
    ...payload,
    guildID: payload.guild_id,
    channelID: payload.channel_id || "",
    userID: payload.user_id,
    sessionID: payload.session_id,
    selfDeaf: payload.self_deaf,
    selfMute: payload.self_mute,
    selfStream: payload.self_stream || false,
  });

  if (cachedState?.channelID !== payload.channel_id) {
    // Either joined or moved channels
    if (payload.channel_id) {
      cachedState?.channelID
        ? // Was in a channel before
          eventHandlers.voiceChannelSwitch?.(
            member,
            payload.channel_id,
            cachedState.channelID,
          )
        : // Was not in a channel before so user just joined
          eventHandlers.voiceChannelJoin?.(member, payload.channel_id);
    } // Left the channel
    else if (cachedState?.channelID) {
      guild.voiceStates.delete(payload.user_id);
      eventHandlers.voiceChannelLeave?.(member, cachedState.channelID);
    }
  }

  eventHandlers.voiceStateUpdate?.(member, payload);
}

export function handleInternalWebhooksUpdate(data: DiscordPayload) {
  if (data.t !== "WEBHOOKS_UPDATE") return;

  const options = data.d as WebhookUpdatePayload;
  return eventHandlers.webhooksUpdate?.(
    options.channel_id,
    options.guild_id,
  );
}
