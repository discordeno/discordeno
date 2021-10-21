import type { Channel } from "../../types/channels/channel.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Bot } from "../../bot.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleChannelDelete(bot: Bot, data: SnakeCasedPropertiesDeep<DiscordGatewayPayload>) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;

  const channel = await bot.cache.channels.get(bot.transformers.snowflake(payload.id));
  if (!channel) return;

  if ([DiscordChannelTypes.GuildVoice, DiscordChannelTypes.GuildStageVoice].includes(channel.type)) {
    channel.voiceStates?.forEach((vs, key) => {
      if (vs.channelId !== channel.id) return;

      // Since this channel was deleted all voice states for this channel should be deleted
      channel.voiceStates?.delete(key);

      bot.events.voiceChannelLeave(bot, vs, channel);
    });
  } else if (
    [
      DiscordChannelTypes.GuildText,
      DiscordChannelTypes.DM,
      DiscordChannelTypes.GroupDm,
      DiscordChannelTypes.GuildNews,
    ].includes(payload.type)
  ) {
    await bot.cache.channels.forEach("DELETE_MESSAGES_FROM_CHANNEL", {
      channelId: bot.transformers.snowflake(payload.id),
    });
  }

  await bot.cache.channels.delete(bot.transformers.snowflake(payload.id));

  bot.events.channelDelete(bot, channel);
}
