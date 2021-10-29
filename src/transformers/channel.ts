import { Channel } from "../types/channels/channel.ts";
import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordOverwrite } from "../types/channels/overwrite.ts";
import { DiscordChannelTypes } from "../types/channels/channel_types.ts";
import type { DiscordenoVoiceState } from "./voice_state.ts";
import { Collection } from "../util/collection.ts";

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
      ? payload.channel.permission_overwrites.map((o) => ({
          type: o.type,
          id: bot.transformers.snowflake(o.id),
          allow: bot.transformers.snowflake(o.allow),
          deny: bot.transformers.snowflake(o.deny),
        }))
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
  permissionOverwrites: (Omit<DiscordOverwrite, "id" | "allow" | "deny"> & {
    id: bigint;
    allow: bigint;
    deny: bigint;
  })[];
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

