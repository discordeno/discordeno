import { cache } from "../utils/cache.ts";
import { ChannelCreatePayload, ChannelTypes } from "../types/channel.ts";
import { createChannel } from "../structures/channel.ts";
import { eventHandlers } from "../module/client.ts";

export const handleInternalChannelCreate = (data: ChannelCreatePayload) => {
  const channel = createChannel(data);
  cache.channels.set(channel.id, channel);
  eventHandlers.channelCreate?.(channel);
};

export const handleInternalChannelUpdate = (data: ChannelCreatePayload) => {
  const cachedChannel = cache.channels.get(data.id);
  const channel = createChannel(data);
  cache.channels.set(channel.id, channel);
  if (!cachedChannel) return;

  eventHandlers.channel_update?.(channel, cachedChannel);
};

export const handleInternalChannelDelete = (data: ChannelCreatePayload) => {
  const cachedChannel = cache.channels.get(data.id);
  if (!cachedChannel) return;

  if (cachedChannel.type === ChannelTypes.GUILD_VOICE && data.guild_id) {
    const guild = cache.guilds.get(data.guild_id);

    guild?.voice_states.forEach((vs) => {
      if (vs.channel_id !== data.id) return;

      const member = guild.members.get(vs.user_id);
      if (!member) return;

      eventHandlers.voiceChannelLeave?.(member, vs.channel_id);
    });

    if (guild) {
      cache.guilds.set(data.guild_id, {
        ...guild,
        voice_states: [
          ...guild.voice_states.filter((vs) => vs.channel_id !== data.id),
        ],
      });
    }
  }

  cache.channels.delete(data.id);
  eventHandlers.channelDelete?.(cachedChannel);
};
