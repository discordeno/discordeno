import { CreateGuildPayload } from "../types/guild.ts";
import Collection from "../utils/collection.ts";
import { createRole } from "./role.ts";
import { createMember, Member } from "./member.ts";
import { createChannel } from "./channel.ts";

export const createGuild = (data: CreateGuildPayload, shardID: number) => {
  const guild = {
    ...data,
    /** The shard id that this guild is on */
    shardID,
    /** The owner id of the guild. */
    ownerID: data.owner_id,
    /** The afk channel id for this guild. */
    afkChannelID: data.afk_channel_id,
    /** The amount of time before a user is moved to AFK. */
    afkTimeout: data.afk_timeout,
    /** Whether or not the embed is enabled in this server. */
    widgetEnabled: data.widget_enabled,
    /** The channel id for the guild embed in this server. */
    widgetChannelID: data.widget_channel_id,
    /** The verification level for this server. */
    verificationLevel: data.verification_level,
    /** The MFA level for this server. */
    mfaLevel: data.mfa_level,
    /** The system channel id for this server. */
    systemChannelID: data.system_channel_id,
    /** The max presences for this server. */
    maxPresences: data.max_presences,
    /** The maximum members in this server. */
    maxMembers: data.max_members,
    /** The vanity URL code for this server. */
    vanityURLCode: data.vanity_url_code,
    /** The premium tier for this server. */
    premiumTier: data.premium_tier,
    /** The subscription count for this server. */
    premiumSubscriptionCount: data.premium_subscription_count,
    /** The preferred language in this server. */
    preferredLocale: data.preferred_locale,

    /** The roles in the guild */
    roles: new Collection(data.roles.map((r) => [r.id, createRole(r)])),
    /** When this guild was joined at. */
    joinedAt: Date.parse(data.joined_at),
    /** The users in this guild. */
    members: new Collection<string, Member>(),
    /** The channels in the guild */
    channels: new Collection(
      data.channels.map((c) => [c.id, createChannel(c, data.id)]),
    ),
    /** The presences of all the users in the guild. */
    presences: new Collection(data.presences.map((p) => [p.user.id, p])),
    /** The total number of members in this guild. This value is updated as members leave and join the server. However, if you do not have the intent enabled to be able to listen to these events, then this will not be accurate. */
    memberCount: data.member_count || 0,
    /** The Voice State data for each user in a voice channel in this server. */
    voiceStates: new Collection(data.voice_states.map((vs) => [vs.user_id, {
      ...vs,
      guildID: vs.guild_id,
      channelID: vs.channel_id,
      userID: vs.user_id,
      sessionID: vs.session_id,
      selfDeaf: vs.self_deaf,
      selfMute: vs.self_mute,
      selfStream: vs.self_stream,
    }])),
  };

  data.members.forEach((m) =>
    guild.members.set(m.user.id, createMember(m, guild))
  );

  // Remove excess properties to preserve cache.
  delete guild.owner_id;
  delete guild.afk_channel_id;
  delete guild.afk_timeout;
  delete guild.widget_enabled;
  delete guild.widget_channel_id;
  delete guild.verification_level;
  delete guild.mfa_level;
  delete guild.system_channel_id;
  delete guild.max_presences;
  delete guild.max_members;
  delete guild.vanity_url_code;
  delete guild.premium_tier;
  delete guild.premium_subscription_count;
  delete guild.preferred_locale;
  delete guild.joined_at;
  delete guild.member_count;
  delete guild.voice_states;
  return guild;
};

export interface Guild extends
  Omit<
    ReturnType<typeof createGuild>,
    | "owner_id"
    | "afk_channel_id"
    | "afk_timeout"
    | "widget_enabled"
    | "widget_channel_id"
    | "verification_level"
    | "mfa_level"
    | "system_channel_id"
    | "max_presences"
    | "max_members"
    | "vanity_url_code"
    | "premium_tier"
    | "premium_subscription_count"
    | "preferred_locale"
    | "joined_at"
    | "member_count"
    | "voice_states"
  > {}
