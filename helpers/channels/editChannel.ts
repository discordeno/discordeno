import type { Bot } from "../../bot.ts";
import { WithReason } from "../../mod.ts";
import { Channel } from "../../transformers/channel.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { OverwriteReadable } from "../../types/discordeno.ts";
import { BigString, ChannelTypes, VideoQualityModes } from "../../types/shared.ts";

/**
 * Edits a channel's settings.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to edit.
 * @param options - The parameters for the edit of the channel.
 * @returns An instance of the edited {@link Channel}.
 *
 * @remarks
 * If editing a channel of type {@link ChannelTypes.GroupDm}:
 * - Fires a _Channel Update_ gateway event.
 *
 * If editing a thread channel:
 * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
 *
 * - Fires a _Thread Update_ gateway event.
 *
 * If editing a guild channel:
 * - Requires the `MANAGE_CHANNELS` permission.
 *
 * - If modifying permission overrides:
 *   - Requires the `MANAGE_ROLES` permission.
 *
 *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
 *
 * - If modifying a channel of type {@link ChannelTypes.GuildCategory}:
 *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
 * - Otherwise:
 *     - Fires a _Channel Update_ gateway event.
 */
export async function editChannel(bot: Bot, channelId: BigString, options: ModifyChannel): Promise<Channel> {
  if (options.name || options.topic) {
    const request = editChannelNameTopicQueue.get(channelId);
    if (!request) {
      // If this hasn't been done before simply add 1 for it
      editChannelNameTopicQueue.set(channelId, {
        channelId: channelId,
        amount: 1,
        // 10 minutes from now
        timestamp: Date.now() + 600000,
        items: [],
      });
    } else if (request.amount === 1) {
      // Start queuing future requests to this channel
      request.amount = 2;
      request.timestamp = Date.now() + 600000;
    } else {
      return new Promise<Channel>((resolve, reject) => {
        // 2 have already been used add to queue
        request.items.push({ channelId, options, resolve, reject });
        if (editChannelProcessing) return;
        editChannelProcessing = true;
        processEditChannelQueue(bot);
      });
    }
  }

  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL(channelId),
    {
      name: options.name,
      topic: options.topic,
      bitrate: options.bitrate,
      user_limit: options.userLimit,
      rate_limit_per_user: options.rateLimitPerUser,
      position: options.position,
      parent_id: options.parentId === null ? null : options.parentId?.toString(),
      nsfw: options.nsfw,
      type: options.type,
      archived: options.archived,
      auto_archive_duration: options.autoArchiveDuration,
      locked: options.locked,
      invitable: options.invitable,
      permission_overwrites: options.permissionOverwrites
        ? options.permissionOverwrites?.map((overwrite) => ({
          id: overwrite.id.toString(),
          type: overwrite.type,
          allow: overwrite.allow ? bot.utils.calculateBits(overwrite.allow) : null,
          deny: overwrite.deny ? bot.utils.calculateBits(overwrite.deny) : null,
        }))
        : undefined,
      available_tags: options.availableTags
        ? options.availableTags.map((availableTag) => ({
          id: availableTag.id,
          name: availableTag.name,
          moderated: availableTag.moderated,
          emoji_id: availableTag.emojiId,
          emoji_name: availableTag.emojiName,
        }))
        : undefined,
      default_reaction_emoji: options.defaultReactionEmoji
        ? {
          emoji_id: options.defaultReactionEmoji.emojiId,
          emoji_name: options.defaultReactionEmoji.emojiName,
        }
        : undefined,
      reason: options.reason,
    },
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelId: BigString;
  items: {
    channelId: BigString;
    options: ModifyChannel;
    resolve: (channel: Channel) => void;
    // deno-lint-ignore no-explicit-any
    reject: (error: any) => void;
  }[];
}

const editChannelNameTopicQueue = new Map<BigString, EditChannelRequest>();
let editChannelProcessing = false;

function processEditChannelQueue(bot: Bot): void {
  if (!editChannelProcessing) return;

  const now = Date.now();
  editChannelNameTopicQueue.forEach(async (request) => {
    bot.events.debug(`Running forEach loop in edit_channel file.`);
    if (now < request.timestamp) return;
    // 10 minutes have passed so we can reset this channel again
    if (!request.items.length) {
      return editChannelNameTopicQueue.delete(request.channelId);
    }
    request.amount = 0;
    // There are items to process for this request
    const details = request.items.shift();

    if (!details) return;

    await bot.helpers
      .editChannel(details.channelId, details.options)
      .then((result) => details.resolve(result))
      .catch(details.reject);
    const secondDetails = request.items.shift();
    if (!secondDetails) return;

    await bot.helpers
      .editChannel(secondDetails.channelId, secondDetails.options)
      .then((result) => secondDetails.resolve(result))
      .catch(secondDetails.reject);
    return;
  });

  if (editChannelNameTopicQueue.size) {
    setTimeout(() => {
      bot.events.debug(`Running setTimeout in EDIT_CHANNEL file.`);
      processEditChannelQueue(bot);
    }, 60000);
  } else {
    editChannelProcessing = false;
  }
}

export interface ModifyChannel extends WithReason {
  /** 1-100 character channel name */
  name?: string;
  /** The type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes;
  /** The position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean | null;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number | null;
  /** The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  userLimit?: number | null;
  /** Channel or category-specific permissions */
  permissionOverwrites?: OverwriteReadable[] | null;
  /** Id of the new parent category for a channel */
  parentId?: BigString | null;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel */
  videoQualityMode?: VideoQualityModes;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;

  /** The set of tags that can be used in a GUILD_FORUM channel */
  availableTags?: {
    /** The id of the tag */
    id: string;
    /** The name of the tag (0-20 characters) */
    name: string;
    /** Whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean;
    /** The id of a guild's custom emoji At most one of emoji_id and emoji_name may be set. */
    emojiId: string;
    /** The unicode character of the emoji */
    emojiName: string;
  }[];
  /** the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel */
  defaultReactionEmoji?: {
    /** The id of a guild's custom emoji */
    emojiId: string;
    /** The unicode character of the emoji */
    emojiName: string | null;
  };
  /** the initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  defaultThreadRateLimitPerUser?: number;
}
