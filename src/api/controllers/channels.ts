import { eventHandlers } from "../../bot.ts";
import {
  ChannelCreatePayload,
  ChannelTypes,
  DiscordPayload,
  InviteCreateEvent,
  InviteDeleteEvent,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalChannelCreate(data: DiscordPayload) {
  if (data.t !== "CHANNEL_CREATE") return;

  const payload = data.d as ChannelCreatePayload;
  const channel = await structures.createChannel(payload);
  await cacheHandlers.set("channels", channel.id, channel);

  eventHandlers.channelCreate?.(channel);
}

export async function handleInternalChannelDelete(data: DiscordPayload) {
  if (data.t !== "CHANNEL_DELETE") return;

  const payload = data.d as ChannelCreatePayload;

  const cachedChannel = await cacheHandlers.get("channels", payload.id);
  if (!cachedChannel) return;

  if (cachedChannel.type === ChannelTypes.GUILD_VOICE && payload.guild_id) {
    const guild = await cacheHandlers.get("guilds", payload.guild_id);

    if (guild) {
      return Promise.all(guild.voiceStates.map(async (vs, key) => {
        if (vs.channelID !== payload.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = await cacheHandlers.get("members", vs.userID);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelID);
      }));
    }
  }

  await cacheHandlers.delete("channels", payload.id);
  cacheHandlers.forEach("messages", (message) => {
    if (message.channelID === payload.id) {
      cacheHandlers.delete("messages", message.id);
    }
  });
  eventHandlers.channelDelete?.(cachedChannel);
}

export async function handleInternalChannelUpdate(data: DiscordPayload) {
  if (data.t !== "CHANNEL_UPDATE") return;

  const payload = data.d as ChannelCreatePayload;
  const cachedChannel = await cacheHandlers.get("channels", payload.id);
  const channel = await structures.createChannel(payload);
  await cacheHandlers.set("channels", channel.id, channel);

  if (!cachedChannel) return;

  eventHandlers.channelUpdate?.(channel, cachedChannel);
}

export async function handleInternalInviteCreate(data: DiscordPayload) {
  if (data.t !== "INVITE_CREATE") return;

  const payload = data.d as InviteCreateEvent;
  const channel = await cacheHandlers.get("channels", payload.channnel_id);
  if (!channel) return;

  eventHandlers.inviteCreate?.(payload, channel);
}

export async function handleInternalInviteDelete(data: DiscordPayload) {
  if (data.t !== "INVITE_DELETE") return;

  const payload = data.d as InviteDeleteEvent;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  eventHandlers.inviteDelete?.(payload, channel);
}
