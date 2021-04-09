import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleChannelDelete(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;

  const cachedChannel = await cacheHandlers.get("channels", payload.id);
  if (!cachedChannel) return;

  if (
    cachedChannel.type === DiscordChannelTypes.GUILD_VOICE && payload.guild_id
  ) {
    const guild = await cacheHandlers.get("guilds", payload.guild_id);

    if (guild) {
      return Promise.all(guild.voiceStates.map(async (vs, key) => {
        if (vs.channelId !== payload.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = await cacheHandlers.get("members", vs.userId);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelId);
      }));
    }
  }

  await cacheHandlers.delete("channels", payload.id);
  cacheHandlers.forEach("messages", (message) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach messages loop in CHANNEL_DELTE file.`,
    );
    if (message.channelId === payload.id) {
      cacheHandlers.delete("messages", message.id);
    }
  });
  eventHandlers.channelDelete?.(cachedChannel);
}
