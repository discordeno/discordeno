import type { BigString, DiscordChannel, DiscordForumTag } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ChannelToggles } from './toggles/channel.js';
import { Permissions } from './toggles/Permissions.js';
import type { Channel, ForumTag } from './types.js';

const Mask = (1n << 64n) - 1n;

export function packOverwrites(allow: string, deny: string, id: string, type: number): bigint {
  return pack64(allow, 0) | pack64(deny, 1) | pack64(id, 2) | pack64(type, 3);
}
function unpack64(v: bigint, shift: number): bigint {
  return (v >> BigInt(shift * 64)) & Mask;
}
function pack64(v: string | number, shift: number): bigint {
  const b = BigInt(v);
  if (b < 0 || b > Mask) throw new Error('should have been a 64 bit unsigned integer: ' + v.toString());
  return b << BigInt(shift * 64);
}
export function separateOverwrites(v: bigint): [number, bigint, bigint, bigint] {
  return [Number(unpack64(v, 3)), unpack64(v, 2), unpack64(v, 0), unpack64(v, 1)] as [number, bigint, bigint, bigint];
}

export const baseChannel: Channel = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as Channel),

  get archived() {
    return !!this.toggles?.archived;
  },
  get invitable() {
    return !!this.toggles?.invitable;
  },
  get locked() {
    return !!this.toggles?.locked;
  },
  get nsfw() {
    return !!this.toggles?.nsfw;
  },
  get newlyCreated() {
    return !!this.toggles?.newlyCreated;
  },
  get managed() {
    return !!this.toggles?.managed;
  },
  get permissionOverwrites() {
    return (
      this.internalOverwrites?.map((overwrite) => {
        const [type, id, allow, deny] = separateOverwrites(overwrite);
        return {
          type,
          id,
          allow,
          deny,
        };
      }) ?? []
    );
  },
  get threadMetadata() {
    return {
      archiveTimestamp: this.internalThreadMetadata?.archiveTimestamp,
      createTimestamp: this.internalThreadMetadata?.createTimestamp,
      autoArchiveDuration: this.internalThreadMetadata?.autoArchiveDuration,
      locked: !!this.toggles?.locked,
      invitable: !!this.toggles?.invitable,
      archived: !!this.toggles?.archived,
    };
  },
};

export function transformChannel(bot: Bot, payload: Partial<DiscordChannel>, extra?: { guildId?: BigString; partial?: boolean }) {
  const channel = Object.create(baseChannel) as SetupDesiredProps<Channel, TransformersDesiredProperties, DesiredPropertiesBehavior>;
  const props = bot.transformers.desiredProperties.channel;
  channel.toggles = new ChannelToggles(payload);

  if (props.id && payload.id) channel.id = bot.transformers.snowflake(payload.id);
  if (props.guildId && (extra?.guildId ?? payload.guild_id))
    channel.guildId = extra?.guildId ? bot.transformers.snowflake(extra.guildId) : bot.transformers.snowflake(payload.guild_id!);
  if (props.type && payload.type !== undefined) channel.type = payload.type;
  if (props.position) channel.position = payload.position;
  if (props.name && payload.name) channel.name = payload.name;
  if (props.topic && payload.topic) channel.topic = payload.topic;
  if (props.lastMessageId && payload.last_message_id) channel.lastMessageId = bot.transformers.snowflake(payload.last_message_id);
  if (props.bitrate && payload.bitrate) channel.bitrate = payload.bitrate;
  if (props.userLimit) channel.userLimit = payload.user_limit;
  if (props.rateLimitPerUser) channel.rateLimitPerUser = payload.rate_limit_per_user;
  if (props.ownerId && payload.owner_id) channel.ownerId = bot.transformers.snowflake(payload.owner_id);
  if (props.lastPinTimestamp && payload.last_pin_timestamp) channel.lastPinTimestamp = Date.parse(payload.last_pin_timestamp);
  if (props.rtcRegion && payload.rtc_region) channel.rtcRegion = payload.rtc_region;
  if (props.videoQualityMode && payload.video_quality_mode) channel.videoQualityMode = payload.video_quality_mode;
  if (props.messageCount) channel.messageCount = payload.message_count;
  if (props.memberCount) channel.memberCount = payload.member_count;
  if (props.threadMetadata) {
    channel.internalThreadMetadata = {} as NonNullable<Channel['internalThreadMetadata']>;
    if (payload.thread_metadata?.archive_timestamp)
      channel.internalThreadMetadata.archiveTimestamp = Date.parse(payload.thread_metadata.archive_timestamp);
    if (payload.thread_metadata?.create_timestamp)
      channel.internalThreadMetadata.createTimestamp = Date.parse(payload.thread_metadata.create_timestamp);
    if (payload.thread_metadata?.auto_archive_duration)
      channel.internalThreadMetadata.autoArchiveDuration = payload.thread_metadata.auto_archive_duration;
  }
  if (props.defaultAutoArchiveDuration && payload.default_auto_archive_duration)
    channel.defaultAutoArchiveDuration = payload.default_auto_archive_duration;
  if (props.permissions && payload.permissions) channel.permissions = new Permissions(payload.permissions);
  if (props.flags) channel.flags = payload.flags;
  if (props.permissionOverwrites && payload.permission_overwrites)
    channel.internalOverwrites = payload.permission_overwrites.map((o) => packOverwrites(o.allow ?? '0', o.deny ?? '0', o.id, o.type));
  if (props.parentId && payload.parent_id) channel.parentId = bot.transformers.snowflake(payload.parent_id);
  if (props.recipients && payload.recipients) channel.recipients = payload.recipients.map((u) => bot.transformers.user(bot, u));
  if (props.icon && payload.icon) channel.icon = iconHashToBigInt(payload.icon);
  if (props.applicationId && payload.application_id) channel.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.member && payload.member) channel.member = bot.transformers.threadMember(bot, payload.member, { guildId: extra?.guildId });
  if (props.totalMessageSent && payload.total_message_sent !== undefined) channel.totalMessageSent = payload.total_message_sent;
  if (props.availableTags && payload.available_tags) channel.availableTags = payload.available_tags.map((x) => bot.transformers.forumTag(bot, x));
  if (props.appliedTags && payload.applied_tags) channel.appliedTags = payload.applied_tags.map((x) => bot.transformers.snowflake(x));
  if (props.defaultReactionEmoji && payload.default_reaction_emoji)
    channel.defaultReactionEmoji = bot.transformers.defaultReactionEmoji(bot, payload.default_reaction_emoji);
  if (props.defaultThreadRateLimitPerUser && payload.default_thread_rate_limit_per_user)
    channel.defaultThreadRateLimitPerUser = payload.default_thread_rate_limit_per_user;
  if (props.defaultSortOrder && payload.default_sort_order !== undefined) channel.defaultSortOrder = payload.default_sort_order;
  if (props.defaultForumLayout && payload.default_forum_layout !== undefined) channel.defaultForumLayout = payload.default_forum_layout;

  return callCustomizer('channel', bot, payload, channel, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
    partial: extra?.partial ?? false,
  });
}

export function transformForumTag(bot: Bot, payload: Partial<DiscordForumTag>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.forumTag;
  const forumTag = {} as SetupDesiredProps<ForumTag, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) forumTag.id = bot.transformers.snowflake(payload.id);
  if (props.name && payload.name) forumTag.name = payload.name;
  if (props.moderated && payload.moderated) forumTag.moderated = payload.moderated;
  if (props.emojiId && payload.emoji_id) forumTag.emojiId = bot.transformers.snowflake(payload.emoji_id);
  if (props.emojiName && payload.emoji_name) forumTag.emojiName = payload.emoji_name;

  return callCustomizer('forumTag', bot, payload, forumTag, {
    partial: extra?.partial ?? false,
  });
}
