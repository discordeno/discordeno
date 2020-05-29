import { cache } from "../utils/cache.ts";
import { ChannelCreatePayload, ChannelTypes } from "../types/channel.ts";
import { createChannel } from "../structures/channel.ts";
import { eventHandlers } from "../module/client.ts";

export const handleInternalChannelCreate = (data: ChannelCreatePayload) => {
  const channel = createChannel(data);
  cache.channels.set(channel.id, channel);
  if (channel.guildID) {
    const guild = cache.guilds.get(channel.guildID);
    guild?.channels.set(channel.id, channel);
  }
  eventHandlers.channelCreate?.(channel);
};

export const handleInternalChannelUpdate = (data: ChannelCreatePayload) => {
  const cachedChannel = cache.channels.get(data.id);
  const channel = createChannel(data);
  cache.channels.set(channel.id, channel);
  if (!cachedChannel) return;

  if (channel.guildID) {
    const guild = cache.guilds.get(channel.guildID);
    guild?.channels.set(channel.id, channel);
  }

  eventHandlers.channelUpdate?.(channel, cachedChannel);
};

export const handleInternalChannelDelete = (data: ChannelCreatePayload) => {
  const cachedChannel = cache.channels.get(data.id);
  if (!cachedChannel) return;

  if (cachedChannel.type === ChannelTypes.GUILD_VOICE && data.guild_id) {
    const guild = cache.guilds.get(data.guild_id);

    if (guild) {
      guild.voiceStates.forEach((vs, key) => {
        if (vs.channelID !== data.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = guild.members.get(vs.userID);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelID);
      });
    }

    guild?.channels.delete(data.id);
  }

  cache.channels.delete(data.id);
  cache.messages.forEach((message) => {
    if (message.channelID === data.id) cache.messages.delete(message.id);
  });
  eventHandlers.channelDelete?.(cachedChannel);
};
