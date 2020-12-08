import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/structures.ts";
import {
  ChannelCreatePayload,
  ChannelTypes,
  DiscordPayload,
} from "../types/types.ts";
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
      guild.voiceStates.forEach(async (vs, key) => {
        if (vs.channelID !== payload.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = await cacheHandlers.get("members", vs.userID);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelID);
      });
    }
  }

  cacheHandlers.delete("channels", payload.id);
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
  cacheHandlers.set("channels", channel.id, channel);

  if (!cachedChannel) return;

  eventHandlers.channelUpdate?.(channel, cachedChannel);
}
