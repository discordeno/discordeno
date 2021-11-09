import { Channel } from "../types/channels/channel.ts";
import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordOverwrite } from "../types/channels/overwrite.ts";
import { DiscordChannelTypes } from "../types/channels/channel_types.ts";
import type { DiscordenoVoiceState } from "./voice_state.ts";
import { Collection } from "../util/collection.ts";

// function merge(allow: string, deny: string, id: string, type: number) {
//   return BigInt(`0x${type}g${BigInt(id)}g${BigInt(allow).toString(16)}g${BigInt(deny).toString(16)}`);
// }

// export function separate(thing: bigint) {
//   return thing
//     .toString(16)
//     .split("g")
//     .map((x, index) => index ? BigInt(`0x${x}`) : Number(x)) as [number, bigint, bigint, bigint];
// }

const Mask = (1n << 64n) - 1n;

function merge(allow: string, deny: string, id: string, type: number) {
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
export function separate(v: bigint) {
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
    recipients: payload.channel.recipients,
    icon: payload.channel.icon,
    rtcRegion: payload.channel.rtc_region,
    videoQualityMode: payload.channel.video_quality_mode,
    guildId: payload.guildId || (payload.channel.guild_id ? bot.transformers.snowflake(payload.channel.guild_id) : 0n),
    lastPinTimestamp: payload.channel.last_pin_timestamp,
    permissionOverwrites: payload.channel.permission_overwrites
      ? payload.channel.permission_overwrites.map((o) => merge(o.allow, o.deny, o.id, o.type))
      : [],

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.channel.id),
    lastMessageId: payload.channel.last_message_id
      ? bot.transformers.snowflake(payload.channel.last_message_id)
      : undefined,
    ownerId: payload.channel.owner_id ? bot.transformers.snowflake(payload.channel.owner_id) : undefined,
    applicationId: payload.channel.application_id
      ? bot.transformers.snowflake(payload.channel.application_id)
      : undefined,
    parentId: payload.channel.parent_id ? bot.transformers.snowflake(payload.channel.parent_id) : undefined,
    // TODO: stage channels?
    voiceStates: payload.channel.type === DiscordChannelTypes.GuildVoice ? new Collection() : undefined,
  };
}

export interface DiscordenoChannel
  extends Omit<
    Channel,
    | "id"
    | "guildId"
    | "lastMessageId"
    | "ownerId"
    | "applicationId"
    | "parentId"
    | "permissionOverwrites"
    | "messageCount"
    | "memberCount"
    | "threadMetadata"
    | "member"
  > {
  permissionOverwrites: bigint[];
  /** The id of the channel */
  id: bigint;
  /** The id of the guild, 0n if it is a DM */
  guildId: bigint;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint;
  /** id of the DM creator */
  ownerId?: bigint;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: bigint;
  /** Id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parentId?: bigint;
  /** The voice states that are in this channel assuming it is a voice channel. */
  voiceStates?: Collection<bigint, DiscordenoVoiceState>;
}
