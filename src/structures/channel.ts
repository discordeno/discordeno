import { ChannelCreatePayload } from "../types/channel.ts";
import { calculatePermissions } from "../utils/permissions.ts";
import { cache } from "../utils/cache.ts";

export function createChannel(data: ChannelCreatePayload, guildID?: string) {
  const channel = {
    ...data,
    /** The guild id of the channel if it is a guild channel. */
    guildID: guildID || data.guild_id,
    /** The id of the last message sent in this channel */
    lastMessageID: data.last_message_id,
    /** The amount of users allowed in this voice channel. */
    userLimit: data.user_limit,
    /** The rate limit(slowmode) in this text channel that users can send messages. */
    rateLimitPerUser: data.rate_limit_per_user,
    /** The category id for this channel */
    parentID: data.parent_id,
    /** The last time when a message was pinned in this channel */
    lastPinTimestamp: data.last_pin_timestamp,
    /** The permission overwrites for this channel */
    permissions: data.permission_overwrites
      ? data.permission_overwrites.map((perm) => ({
        ...perm,
        allow: calculatePermissions(BigInt(perm.allow_new)),
        deny: calculatePermissions(BigInt(perm.deny_new)),
      }))
      : [],
    /** Whether this channel is nsfw or not */
    nsfw: data.nsfw || false,
    /** The mention of the channel */
    mention: `<#${data.id}>`,
  };

  // Remove excess properties to preserve cache.
  delete channel.guild_id;
  delete channel.last_message_id;
  delete channel.rate_limit_per_user;
  delete channel.last_pin_timestamp;
  delete channel.user_limit;

  cache.channels.set(data.id, channel);
  return channel;
}

export interface Channel extends
  Omit<
    ReturnType<typeof createChannel>,
    | "guild_id"
    | "last_message_id"
    | "rate_limit_per_user"
    | "last_pin_timestamp"
    | "user_limit"
  > {}
