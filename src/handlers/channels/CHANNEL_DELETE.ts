import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleChannelDelete(data: DiscordGatewayPayload) {
  const payload = data.d as Channel;

  const cachedChannel = await cacheHandlers.get(
    "channels",
    snowflakeToBigint(payload.id),
  );
  if (!cachedChannel) return;

  if (
    cachedChannel.type === DiscordChannelTypes.GUILD_VOICE && payload.guildId
  ) {
    const guild = await cacheHandlers.get("guilds", cachedChannel.guildId);

    if (guild) {
      return Promise.all(guild.voiceStates.map(async (vs, key) => {
        if (vs.channelId !== cachedChannel.id) return;

        // Since this channel was deleted all voice states for this channel should be deleted
        guild.voiceStates.delete(key);

        const member = await cacheHandlers.get("members", vs.userId);
        if (!member) return;

        eventHandlers.voiceChannelLeave?.(member, vs.channelId);
      }));
    }
  }

  await cacheHandlers.delete("channels", snowflakeToBigint(payload.id));
  cacheHandlers.forEach("messages", (message) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach messages loop in CHANNEL_DELTE file.`,
    );
    if (message.channelId === snowflakeToBigint(payload.id)) {
      cacheHandlers.delete("messages", message.id);
    }
  });
  eventHandlers.channelDelete?.(cachedChannel);
}
