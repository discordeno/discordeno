import { cache } from "../utils/cache.ts";
import { ChannelCreatePayload, ChannelTypes } from "../types/channel.ts";
import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import { DiscordPayload } from "../types/discord.ts";

export function handleInternalChannelCreate(data: DiscordPayload) {
  if (data.t !== "CHANNEL_CREATE") return;

  const payload = data.d as ChannelCreatePayload;
  const channel = structures.createChannel(payload);
  cache.channels.set(channel.id, channel);

  if (channel.guildID) {
    const guild = cache.guilds.get(channel.guildID);
    guild?.channels.set(channel.id, channel);
  }

  eventHandlers.channelCreate?.(channel);
}

export function handleInternalChannelDelete(data: DiscordPayload) {
  if (data.t !== "CHANNEL_DELETE") return;

  const payload = data.d as ChannelCreatePayload;

  const cachedChannel = cache.channels.get(payload.id);
  if (!cachedChannel) return;

  if (cachedChannel.type === ChannelTypes.GUILD_VOICE && payload.guild_id) {
    const guild = cache.guilds.get(payload.guild_id);

    if (guild) {
      guild.voiceStates.forEach((vs, key) => {
        if (vs.channelID !== payload.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = guild.members.get(vs.userID);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelID);
      });
    }

    guild?.channels.delete(payload.id);
  }

  cache.channels.delete(payload.id);
  cache.messages.forEach((message) => {
    if (message.channelID === payload.id) cache.messages.delete(message.id);
  });
  eventHandlers.channelDelete?.(cachedChannel);
}

export function handleInternalChannelUpdate(data: DiscordPayload) {
  if (data.t !== "CHANNEL_UPDATE") return;

  const payload = data.d as ChannelCreatePayload;
  const cachedChannel = cache.channels.get(payload.id);
  const channel = structures.createChannel(payload);
  cache.channels.set(channel.id, channel);
  if (!cachedChannel) return;

  if (channel.guildID) {
    const guild = cache.guilds.get(channel.guildID);
    guild?.channels.set(channel.id, channel);
  }

  eventHandlers.channelUpdate?.(channel, cachedChannel);
}
