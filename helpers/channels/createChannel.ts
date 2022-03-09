import type { Channel } from "../../types/channels/channel.ts";
import type { CreateGuildChannel } from "../../types/guilds/createGuildChannel.ts";
import type { Bot } from "../../bot.ts";
import { ChannelTypes } from "../../types/shared.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(bot: Bot, guildId: bigint, options?: CreateGuildChannel, reason?: string) {
  // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
  if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

  const result = await bot.rest.runMethod<Channel>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_CHANNELS(guildId),
    options
      ? {
        name: options.name,
        topic: options.topic,
        bitrate: options.bitrate,
        user_limit: options.userLimit,
        rate_limit_per_user: options.rateLimitPerUser,
        position: options.position,
        parent_id: options.parentId?.toString(),
        nsfw: options.nsfw,
        permission_overwrites: options?.permissionOverwrites?.map((overwrite) => ({
          id: overwrite.id.toString(),
          type: overwrite.type,
          allow: overwrite.allow ? bot.utils.calculateBits(overwrite.allow) : null,
          deny: overwrite.deny ? bot.utils.calculateBits(overwrite.deny) : null,
        })),
        type: options?.type || ChannelTypes.GuildText,
        reason,
      }
      : {},
  );

  return bot.transformers.channel(bot, { channel: result, guildId });
}
