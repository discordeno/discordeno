import { Channel } from "../types/channels/channel.ts";
import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { ChannelTypes } from "../types/channels/channelTypes.ts";
import type { DiscordenoVoiceState } from "./voiceState.ts";
import { Collection } from "../util/collection.ts";
import { DiscordenoUser } from "./member.ts";
import { VideoQualityModes } from "../types/channels/videoQualityModes.ts";

const Mask = (1n << 64n) - 1n;

export function packOverwrites(allow: string, deny: string, id: string, type: number) {
  return pack64(allow, 0) | pack64(deny, 1) | pack64(id, 2) | pack64(type, 3);
}
function unpack64(v: bigint, shift: number) {
  return (v >> BigInt(shift * 64)) & Mask;
}
function pack64(v: string | number, shift: number) {
  const b = BigInt(v);
  if (b < 0 || b > Mask) throw new Error("should have been a 64 bit unsigned integer: " + v);
  return b << BigInt(shift * 64);
}
export function separateOverwrites(v: bigint) {
  return [Number(unpack64(v, 3)), unpack64(v, 2), unpack64(v, 0), unpack64(v, 1)] as [number, bigint, bigint, bigint];
}

export function transformChannel(
  bot: Bot,
  payload: { channel: SnakeCasedPropertiesDeep<Channel> } & { guildId?: bigint }
): DiscordenoChannel {
  return {
    // UNTRANSFORMED STUFF HERE
    type: payload.channel.type,
    position: payload.channel.position,
    name: payload.channel.name,
    topic: payload.channel.topic,
    nsfw: payload.channel.nsfw,
    bitrate: payload.channel.bitrate,
    userLimit: payload.channel.user_limit,
    rateLimitPerUser: payload.channel.rate_limit_per_user,
    recipients: payload.channel.recipients?.map((r) => bot.transformers.user(bot, r)),
    icon: payload.channel.icon ? bot.utils.iconHashToBigInt(payload.channel.icon) : undefined,
    rtcRegion: payload.channel.rtc_region,
    videoQualityMode: payload.channel.video_quality_mode,
    guildId: payload.guildId || (payload.channel.guild_id ? bot.transformers.snowflake(payload.channel.guild_id) : 0n),
    lastPinTimestamp: payload.channel.last_pin_timestamp ? Date.parse(payload.channel.last_pin_timestamp) : undefined,
    permissionOverwrites: payload.channel.permission_overwrites
      ? // TODO: fix this
        // @ts-ignore
        payload.channel.permission_overwrites.map((o) => packOverwrites(o.allow, o.deny, o.id, o.type))
      : [],

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.channel.id),
    permissions: payload.channel.permissions ? bot.transformers.snowflake(payload.channel.permissions) : undefined,
    lastMessageId: payload.channel.last_message_id
      ? bot.transformers.snowflake(payload.channel.last_message_id)
      : undefined,
    ownerId: payload.channel.owner_id ? bot.transformers.snowflake(payload.channel.owner_id) : undefined,
    applicationId: payload.channel.application_id
      ? bot.transformers.snowflake(payload.channel.application_id)
      : undefined,
    parentId: payload.channel.parent_id ? bot.transformers.snowflake(payload.channel.parent_id) : undefined,
    // TODO: stage channels?
    voiceStates: payload.channel.type === ChannelTypes.GuildVoice ? new Collection() : undefined,

    memberCount: payload.channel.member_count,
    messageCount: payload.channel.message_count,
    archiveTimestamp: payload.channel.thread_metadata?.archive_timestamp
      ? Date.parse(payload.channel.thread_metadata.archive_timestamp)
      : undefined,
    autoArchiveDuration: payload.channel.thread_metadata?.auto_archive_duration,
    botIsMember: Boolean(payload.channel.member),
    archived: payload.channel.thread_metadata?.archived,
    locked: payload.channel.thread_metadata?.locked,
    invitable: payload.channel.invitable,
    createTimestamp: payload.channel.create_timestamp,
  };
}

export interface DiscordenoChannel {
  /** The type of channel */
  type: ChannelTypes;
  /** Sorting position of the channel */
  position?: number;
  /** The name of the channel (1-100 characters) */
  name?: string;
  /** The channel topic (0-1024 characters) */
  topic?: string | null;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** The user limit of the voice channel */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** The recipients of the DM */
  recipients?: DiscordenoUser[];
  /** Icon hash */
  icon?: bigint;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  lastPinTimestamp?: number;
  /** Voice region id for the voice channel, automatic when set to null */
  rtcRegion?: string | null;
  /** The camera video quality mode of the voice channel, 1 when not present */
  videoQualityMode?: VideoQualityModes;
  // TODO(threads): consider a ThreadChannel object
  /** An approximate count of messages in a thread, stops counting at 50 */
  messageCount?: number;
  /** An approximate count of users in a thread, stops counting at 50 */
  memberCount?: number;
  /** Thread-specifig fields not needed by other channels */
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archiveTimestamp?: number;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** The time the current user last joined the thread */
  threadJoinTimestamp?: number;
  /** Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  defaultAutoArchiveDuration?: number;
  /** Whether or not the bot is part of this channel thread. */
  botIsMember: boolean;
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a application command interaction */
  permissions?: bigint;

  permissionOverwrites: bigint[];
  /** The id of the channel */
  id: bigint;
  /** The id of the guild, 0n if it is a DM */
  guildId: bigint;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint;
  /** id of the DM creator or thread */
  ownerId?: bigint;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: bigint;
  /** Id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parentId?: bigint;
  /** The voice states that are in this channel assuming it is a voice channel. */
  voiceStates?: Collection<bigint, DiscordenoVoiceState>;
  /** timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  createTimestamp?: number;
}
