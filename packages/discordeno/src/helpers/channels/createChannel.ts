import type { Bot } from "../../bot.ts";
import { WithReason } from "../../mod.ts";
import { Channel } from "../../transformers/channel.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { OverwriteReadable } from "../../types/discordeno.ts";
import { BigString, ChannelTypes, SortOrderTypes } from "../../types/shared.ts";

/**
 * Creates a channel within a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to create the channel within.
 * @param options - The parameters for the creation of the channel.
 * @returns An instance of the created {@link Channel}.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
 *
 * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
 *
 * Fires a _Channel Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
 */
export async function createChannel(bot: Bot, guildId: BigString, options: CreateGuildChannel): Promise<Channel> {
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
        default_sort_order: options.defaultSortOrder,
        reason: options.reason,
        default_auto_archive_duration: options?.defaultAutoArchiveDuration,
        default_reaction_emoji: options.defaultReactionEmoji
          ? {
            emoji_id: options.defaultReactionEmoji.emojiId
              ? bot.transformers.reverse.snowflake(options.defaultReactionEmoji.emojiId)
              : options.defaultReactionEmoji.emojiId,
            emoji_name: options.defaultReactionEmoji.emojiName,
          }
          : undefined,

        available_tags: options.availableTags
          ? options.availableTags.map((availableTag) => ({
            id: bot.transformers.reverse.snowflake(availableTag.id),
            name: availableTag.name,
            moderated: availableTag.moderated,
            emoji_name: availableTag.emojiName,
            emoji_id: availableTag.emojiId ? bot.transformers.reverse.snowflake(availableTag.emojiId) : undefined,
          }))
          : undefined,
      }
      : {},
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(guildId) });
}

export interface CreateGuildChannel extends WithReason {
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
  parentId?: BigString;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  defaultAutoArchiveDuration?: number;
  /** Emoji to show in the add reaction button on a thread in a forum channel */
  defaultReactionEmoji?: {
    /** The id of a guild's custom emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emojiId?: BigString | null;
    /** The unicode character of the emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emojiName?: string | null;
  };
  /** Set of tags that can be used in a forum channel */
  availableTags?: {
    /** The id of the tag */
    id: BigString;
    /** The name of the tag (0-20 characters) */
    name: string;
    /** whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean;
    /** The id of a guild's custom emoji */
    emojiId: BigString;
    /** The unicode character of the emoji */
    emojiName?: string;
  }[];
  /** the default sort order type used to order posts in forum channels */
  defaultSortOrder?: SortOrderTypes | null;
}
