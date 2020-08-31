import { CreateGuildPayload } from "../types/guild.ts";
import { Collection } from "../utils/collection.ts";
import { createRole } from "./role.ts";
import { createMember, Member } from "./member.ts";
import { createChannel } from "./channel.ts";

export const createGuild = (data: CreateGuildPayload, shardID: number) => {
  const {
    owner_id: ownerID,
    afk_channel_id: afkChannelID,
    afk_timeout: afkTimeout,
    widget_enabled: widgetEnabled,
    widget_channel_id: widgetChannelID,
    verification_level: verificationLevel,
    mfa_level: mfaLevel,
    system_channel_id: systemChannelID,
    max_presences: maxPresences,
    max_members: maxMembers,
    vanity_url_code: vanityURLCode,
    premium_tier: premiumTier,
    premium_subscription_count: premiumSubscriptionCount,
    preferred_locale: preferredLocale,
    joined_at: joinedAt,
    member_count: memberCount,
    voice_states: voiceStates,
    ...rest
  } = data;

  const guild = {
    ...rest,
    /** The shard id that this guild is on */
    shardID,
    /** The owner id of the guild. */
    ownerID,
    /** The afk channel id for this guild. */
    afkChannelID,
    /** The amount of time before a user is moved to AFK. */
    afkTimeout,
    /** Whether or not the embed is enabled in this server. */
    widgetEnabled,
    /** The channel id for the guild embed in this server. */
    widgetChannelID,
    /** The verification level for this server. */
    verificationLevel,
    /** The MFA level for this server. */
    mfaLevel,
    /** The system channel id for this server. */
    systemChannelID,
    /** The max presences for this server. */
    maxPresences,
    /** The maximum members in this server. */
    maxMembers,
    /** The vanity URL code for this server. */
    vanityURLCode,
    /** The premium tier for this server. */
    premiumTier,
    /** The subscription count for this server. */
    premiumSubscriptionCount,
    /** The preferred language in this server. */
    preferredLocale,

    /** The roles in the guild */
    roles: new Collection(data.roles.map((r) => [r.id, createRole(r)])),
    /** When this guild was joined at. */
    joinedAt: Date.parse(joinedAt),
    /** The users in this guild. */
    members: new Collection<string, Member>(),
    /** The channels in the guild */
    channels: new Collection(
      data.channels.map((c) => [c.id, createChannel(c, data.id)]),
    ),
    /** The presences of all the users in the guild. */
    presences: new Collection(data.presences.map((p) => [p.user.id, p])),
    /** The total number of members in this guild. This value is updated as members leave and join the server. However, if you do not have the intent enabled to be able to listen to these events, then this will not be accurate. */
    memberCount: memberCount || 0,
    /** The Voice State data for each user in a voice channel in this server. */
    voiceStates: new Collection(voiceStates.map((vs) => [vs.user_id, {
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

  return guild;
};

export interface Guild extends ReturnType<typeof createGuild> {}
