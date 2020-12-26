import { botID } from "../../bot.ts";
import {
  BannedUser,
  ChannelCreatePayload,
  CreateGuildPayload,
  Emoji,
  GetAuditLogsOptions,
  GuildEditOptions,
  GuildFeatures,
  GuildMember,
  ImageFormats,
  ImageSize,
  MemberCreatePayload,
  Presence,
  VoiceState,
} from "../../types/types.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import {
  deleteServer,
  editGuild,
  getAuditLogs,
  getBan,
  getBans,
  getInvites,
  guildBannerURL,
  guildIconURL,
  leaveGuild,
} from "../handlers/guild.ts";
import { Member } from "./member.ts";
import { Role, structures } from "./mod.ts";
import { Channel } from "./structures.ts";

export const initialMemberLoadQueue = new Map<string, MemberCreatePayload[]>();

const baseGuild: Partial<Guild> = {
  get members() {
    return cache.members.filter((member) => member.guilds.has(this.id!));
  },
  get channels() {
    return cache.channels.filter((channel) => channel.guildID === this.id);
  },
  get afkChannel() {
    return cache.channels.get(this.afkChannelID!);
  },
  get publicUpdatesChannel() {
    return cache.channels.get(this.publicUpdatesChannelID!);
  },
  get rulesChannel() {
    return cache.channels.get(this.rulesChannelID!);
  },
  get systemChannel() {
    return cache.channels.get(this.systemChannelID!);
  },
  get bot() {
    return cache.members.get(botID);
  },
  get botMember() {
    return this.bot?.guilds.get(this.id!);
  },
  get botVoice() {
    return this.voiceStates.get(botID);
  },
  get owner() {
    return cache.members.get(this.ownerID!);
  },
  get partnered() {
    return Boolean(this.features?.includes("PARTNERED"));
  },
  get verified() {
    return Boolean(this.features?.includes("VERIFIED"));
  },
  bannerURL(size, format) {
    return guildBannerURL(this as Guild, size, format);
  },
  delete() {
    return deleteServer(this.id!);
  },
  edit(options) {
    return editGuild(this.id!, options);
  },
  auditLogs(options) {
    return getAuditLogs(this.id!, options);
  },
  getBan(memberID) {
    return getBan(this.id!, memberID);
  },
  bans() {
    return getBans(this.id!);
  },
  invites() {
    return getInvites(this.id!);
  },
  iconURL(size, format) {
    return guildIconURL(this as Guild, size, format);
  },
  leave() {
    return leaveGuild(this.id!);
  },
};

export async function createGuild(data: CreateGuildPayload, shardID: number) {
  const {
    disovery_splash: discoverySplash,
    default_message_notifications: defaultMessageNotifications,
    explicit_content_filter: explicitContentFilter,
    system_channel_flags: systemChannelFlags,
    rules_channel_id: rulesChannelID,
    public_updates_channel_id: publicUpdatesChannelID,
    max_video_channel_users: maxVideoChannelUsers,
    approximate_member_count: approximateMemberCount,
    approximate_presence_count: approximatePresenceCount,
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
    channels,
    members,
    ...rest
  } = data;

  const roles = await Promise.all(
    data.roles.map((r) => structures.createRole(r)),
  );

  await Promise.all(
    channels.map((c) => structures.createChannel(c, data.id)),
  );

  const guild = {
    ...rest,
    discoverySplash,
    defaultMessageNotifications,
    explicitContentFilter,
    rulesChannelID,
    publicUpdatesChannelID,
    maxVideoChannelUsers,
    approximateMemberCount,
    approximatePresenceCount,
    shardID,
    ownerID,
    afkChannelID,
    afkTimeout,
    widgetEnabled,
    widgetChannelID,
    verificationLevel,
    mfaLevel,
    systemChannelID,
    maxPresences,
    maxMembers,
    vanityURLCode,
    premiumTier,
    premiumSubscriptionCount,
    preferredLocale,
    roles: new Collection(roles.map((r) => [r.id, r])),
    joinedAt: Date.parse(joinedAt),
    presences: new Collection(data.presences.map((p) => [p.user.id, p])),
    memberCount: memberCount || 0,
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

  initialMemberLoadQueue.set(guild.id, members);

  return guild;
}

export interface Guild {
  /** The guild id */
  id: string;
  /** The guild name 2-100 characters */
  name: string;
  /** The guild icon image hash */
  icon: string | null;
  /** The guild splash image hash */
  splash: string | null;
  /** Discovery splash has; only present for guilds with the "DISCOVERABLE" feature */
  disoverySplash: string | null;
  /** The voice region id for the guild */
  region: string;
  /** Default message notifications level */
  defaultMessageNotifications: number;
  /** Explicit content filter level */
  explicitContentFilter: number;
  /** The custom guild emojis */
  emojis: Emoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** System channel flags */
  systemChannelFlags: number;
  /** The id of the channel where guilds with the PUBLIC feature can display rules and or guidelines. */
  rulesChannelID: string | null;
  /** The description for the guild */
  description: string | null;
  /** The banner hash */
  banner: string | null;
  /** The id of the channel where admins and moderators of guilds with the PUBLIC feature receive notices from Discord */
  publicUpdatesChannelID: string | null;
  /** The maximum amount of users in a video channel. */
  maxVideoChannelUsers?: number;
  /** The approximate number of members in this guild, returned from the GET /guild/id endpoint when with_counts is true */
  approximateMemberCount?: number;
  /** The approximate number of non-offline members in this guild, returned from the GET /guild/id endpoint when with_counts is true */
  approximatePresenceCount?: number;
  /** Whether this is considered a large guild */
  large: boolean;
  /** Whether this guild is unavailable */
  unavailable: boolean;
  /** The shard id that this guild is on */
  shardID: number;
  /** The owner id of the guild. */
  ownerID: string;
  /** The afk channel id for this guild. */
  afkChannelID: string;
  /** The amount of time before a user is moved to AFK. */
  afkTimeout: number;
  /** Whether or not the embed is enabled in this server. */
  widgetEnabled: boolean;
  /** The channel id for the guild embed in this server. */
  widgetChannelID: string;
  /** The verification level for this server. */
  verificationLevel: number;
  /** The MFA level for this server. */
  mfaLevel: number;
  /** The system channel id for this server. */
  systemChannelID: string;
  /** The max presences for this server. */
  maxPresences: number;
  /** The maximum members in this server. */
  maxMembers: number;
  /** The vanity URL code for this server. */
  vanityURLCode: string;
  /** The premium tier for this server. */
  premiumTier: number;
  /** The subscription count for this server. */
  premiumSubscriptionCount: number;
  /** The preferred language in this server. */
  preferredLocale: string;
  /** The roles in the guild */
  roles: Collection<string, Role>;
  /** When this guild was joined at. */
  joinedAt: number;
  /** The presences of all the users in the guild. */
  presences: Collection<string, Presence>;
  /** The total number of members in this guild. This value is updated as members leave and join the server. However, if you do not have the intent enabled to be able to listen to these events, then this will not be accurate. */
  memberCount: number;
  /** The Voice State data for each user in a voice channel in this server. */
  voiceStates: Collection<string, CleanVoiceState>;

  // GETTERS
  /** Members in this guild. */
  members: Collection<string, Member>;
  /** Channels in this guild. */
  channels: Collection<string, Channel>;
  /** The afk channel if one is set */
  afkChannel?: Channel;
  /** The public update channel if one is set */
  publicUpdatesChannel?: Channel;
  /** The rules channel in this guild if one is set */
  rulesChannel?: Channel;
  /** The system channel in this guild if one is set */
  systemChannel?: Channel;
  /** The bot member in this guild if cached */
  bot?: Member;
  /** The bot guild member in this guild if cached */
  botMember?: GuildMember;
  /** The bots voice state if there is one in this guild */
  botVoice?: CleanVoiceState;
  /** The owner member of this guild */
  owner?: Member;
  /** Whether or not this guild is partnered */
  partnered: boolean;
  /** Whether or not this guild is verified */
  verified: boolean;

  // METHODS

  /** The banner url for this server */
  bannerURL(size?: ImageSize, format?: ImageFormats): string | undefined;
  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  iconURL(size?: ImageSize, format?: ImageFormats): string | undefined;
  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  delete(): Promise<any>;
  /** Leave a guild */
  leave(): Promise<any>;
  /** Edit the server. Requires the MANAGE_GUILD permission. */
  edit(options: GuildEditOptions): Promise<any>;
  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  auditLogs(options: GetAuditLogsOptions): Promise<any>;
  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  getBan(memberID: string): Promise<BannedUser>;
  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  bans(): Promise<Collection<string, BannedUser>>;
  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  invites(): Promise<any>;
}

interface CleanVoiceState extends VoiceState {
  guildID: string;
  channelID: string;
  userID: string;
  sessionID: string;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStream: boolean;
}
