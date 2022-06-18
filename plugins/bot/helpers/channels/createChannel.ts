import { Bot } from "../../bot.ts";
import { DiscordChannel, ChannelTypes } from "../../deps.ts";
import { OverwriteReadable } from "./editChannelOverwrite.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(bot: Bot, guildId: bigint, options?: CreateGuildChannel, reason?: string) {
  // BITRATE IS IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
  if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.GUILD_CHANNELS(guildId),
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
        default_auto_archive_duration: options?.defaultAutoArchiveDuration,
      }
      : {},
  );

  return bot.transformers.channel(bot, { channel: result, guildId });
}

export interface CreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string;
  /** The type of channel */
  type?: ChannelTypes;
  /** Channel topic (0-1024 characters) */
  topic?: string;
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** The user limit of the voice channel (voice only) */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** Sorting position of the channel */
  position?: number;
  /** The channel's permission overwrites */
  permissionOverwrites?: OverwriteReadable[];
  /** Id of the parent category for a channel */
  parentId?: bigint;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  defaultAutoArchiveDuration?: number;
}
