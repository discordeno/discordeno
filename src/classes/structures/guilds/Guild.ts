import { cache } from "../../../cache.ts";
import { GetGuildAuditLog } from "../../../types/audit_log/get_guild_audit_log.ts";
import { Emoji } from "../../../types/emojis/emoji.ts";
import { CreateGuildBan } from "../../../types/guilds/create_guild_ban.ts";
import { DiscordDefaultMessageNotificationLevels } from "../../../types/guilds/default_message_notification_levels.ts";
import { DiscordExplicitContentFilterLevels } from "../../../types/guilds/explicit_content_filter_levels.ts";
import { Guild } from "../../../types/guilds/guild.ts";
import { DiscordGuildFeatures } from "../../../types/guilds/guild_features.ts";
import { GuildNsfwLevel } from "../../../types/guilds/guild_nsfw_level.ts";
import { DiscordMfaLevels } from "../../../types/guilds/mfa_levels.ts";
import { ModifyGuild } from "../../../types/guilds/modify_guild.ts";
import { DiscordPremiumTiers } from "../../../types/guilds/premium_tiers.ts";
import { DiscordSystemChannelFlags } from "../../../types/guilds/system_channel_flags.ts";
import { DiscordVerificationLevels } from "../../../types/guilds/verification_levels.ts";
import { DiscordImageFormat } from "../../../types/misc/image_format.ts";
import { DiscordImageSize } from "../../../types/misc/image_size.ts";
import { PresenceUpdate, WelcomeScreen, StageInstance, GuildMember } from "../../../types/mod.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { iconBigintToHash } from "../../../util/hash.ts";
import Client from "../../Client.ts";
import Base from "../Base.ts";
import GuildBitField from "../BitFields/Guild.ts";
import Channel from "../Channel.ts";
import DDMember from "./Member.ts";
import DDRole from "./Role.ts";
import DDVoiceState from "./VoiceState.ts";

export class DDGuild extends Base {
  /** The id of the shard this guild is bound to */
  shardId: number;
  /** Guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name!: string;
  /** Icon hash */
  icon: bigint;
  /** Icon hash, returned when in the template object */
  iconHash?: string | null;
  /** Splash hash */
  splash: bigint;
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash!: string | null;
  /** Id of the owner */
  ownerId!: bigint;
  /** Total permissions for the user in the guild (execludes overwrites) */
  permissions?: bigint;
  /** Voice region id for the guild */
  region!: string;
  /** Afk timeout in seconds */
  afkTimeout!: number;
  /** Verification level required for the guild */
  verificationLevel!: DiscordVerificationLevels;
  /** Default message notifications level */
  defaultMessageNotifications!: DiscordDefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter!: DiscordExplicitContentFilterLevels;
  /** Roles in the guild */
  roles: Collection<bigint, DDRole>;
  /** Enabled guild features */
  features!: DiscordGuildFeatures[];
  /** Required MFA level for the guild */
  mfaLevel!: DiscordMfaLevels;
  /** System channel flags */
  systemChannelFlags!: DiscordSystemChannelFlags;
  /** When this guild was joined at */
  joinedAt?: string;
  /** Total number of members in this guild */
  memberCount?: number;
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates: Collection<bigint, DDVoiceState>;
  // TODO: check if need to omit
  /** All active threads in the guild that the current user has permission to view */
  threads?: Channel[];
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number | null;
  /** The maximum number of members for the guild */
  maxMembers?: number;
  /** The vaniy url code for the guild */
  vanityUrlCode!: string | null;
  /** The description of a Community guild */
  description!: string | null;
  /** Banner hash */
  banner: bigint;
  /** Premium tier (Server Boost level) */
  premiumTier!: DiscordPremiumTiers;
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number;
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale!: string;
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number;
  /** Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximateMemberCount?: number;
  /**	Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximatePresenceCount?: number;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: WelcomeScreen;
  /** Guild NSFW level */
  nsfwLevel!: GuildNsfwLevel;
  /** Stage instances in the guild */
  stageInstances?: StageInstance[];

  /** Id of afk channel */
  afkChannelId?: bigint;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: bigint;
  /** Application id of the guild creator if it is bot-created */
  applicationId?: bigint;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId?: bigint;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint;
  /** The presences of all the users in the guild. */
  presences: Collection<bigint, Partial<PresenceUpdate>>;
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>;
  /** Holds all the boolean toggles. */
  bitfield: GuildBitField;

  constructor(client: Client, payload: Guild, shardId: number) {
    super(client, payload.id);

    this.shardId = shardId;
    this.bitfield = new GuildBitField(0n);
    this.icon = 0n;
    this.banner = 0n;
    this.splash = 0n;
    this.roles = new Collection();
    this.voiceStates = new Collection();
    this.emojis = new Collection();
    this.presences = new Collection();

    this.update(payload);
  }

  update(payload: Guild) {
    this.name = payload.name;
    this.discoverySplash = payload.discoverySplash;
    this.preferredLocale = payload.preferredLocale;
    this.memberCount = payload.memberCount || 0;
    this.region = payload.region;
    this.afkTimeout = payload.afkTimeout;
    this.verificationLevel = payload.verificationLevel;
    this.permissions = payload.permissions ? BigInt(payload.permissions) : undefined;
    this.defaultMessageNotifications = payload.defaultMessageNotifications;
    this.explicitContentFilter = payload.explicitContentFilter;
    this.features = payload.features;
    this.mfaLevel = payload.mfaLevel;
    this.systemChannelFlags = payload.systemChannelFlags;
    this.vanityUrlCode = payload.vanityUrlCode;
    this.description = payload.description;
    this.premiumTier = payload.premiumTier;
    this.nsfwLevel = payload.nsfwLevel;

    this.ownerId = snowflakeToBigint(payload.ownerId);
    this.afkChannelId = payload.afkChannelId ? snowflakeToBigint(payload.afkChannelId) : undefined;
    this.publicUpdatesChannelId = payload.publicUpdatesChannelId
      ? snowflakeToBigint(payload.publicUpdatesChannelId)
      : undefined;
    this.rulesChannelId = payload.rulesChannelId ? snowflakeToBigint(payload.rulesChannelId) : undefined;
    this.systemChannelId = payload.systemChannelId ? snowflakeToBigint(payload.systemChannelId) : undefined;
    this.widgetChannelId = payload.widgetChannelId ? snowflakeToBigint(payload.widgetChannelId) : undefined;
    this.applicationId = payload.applicationId ? snowflakeToBigint(payload.applicationId) : undefined;

    for (const role of payload.roles) {
      this.roles.set(snowflakeToBigint(role.id), new DDRole(this.client, role, this.id));
    }

    for (const voiceState of payload.voiceStates || []) {
      this.voiceStates.set(snowflakeToBigint(voiceState.userId), new DDVoiceState(this.client, this.id, voiceState));
    }

    for (const member of payload.members || []) {
      const user = member.user;
      if (!user) continue;

      // @ts-ignore find a better way to do this
      cache.members.set(snowflakeToBigint(user.id), new DDMember(this.client, { ...member, user }, this.id));
    }

    for (const emoji of payload.emojis) {
      this.emojis.set(snowflakeToBigint(emoji.id!), emoji);
    }

    for (const presence of payload.presences || []) {
      this.presences.set(snowflakeToBigint(presence.user!.id), presence);
    }
  }

  /** Members in the guild that are cached. */
  get members() {
    return cache.members.filter((m) => m.guilds.has(this.id));
  }

  /** Channels in this guild. */
  get channels() {
    return this.client.channels.filter((channel) => channel.guildId === this.id);
  }

  /** The afk channel if one is set */
  get afkChannel() {
    return this.client.channels.get(this.afkChannelId!);
  }

  /** The public update channel if one is set */
  get publicUpdatesChannel() {
    return this.client.channels.get(this.publicUpdatesChannelId!);
  }

  /** The rules channel in this guild if one is set */
  get rulesChannel() {
    return this.client.channels.get(this.rulesChannelId!);
  }

  /** The system channel in this guild if one is set */
  get systemChannel() {
    return this.client.channels.get(this.systemChannelId!);
  }

  /** The bot in this guild if cached */
  get bot() {
    return this.client.bot;
  }

  /** The bot guild member in this guild if cached */
  get botMember() {
    return this.bot?.guilds.get(this.id);
  }

  /** The bots voice state if there is one in this guild */
  get botVoice() {
    return this.voiceStates?.get(this.client.id);
  }

  /** The owner of this server. */
  get owner() {
    return this.members.get(this.ownerId);
  }

  /** Whether or not this guild is partnered */
  get partnered() {
    return Boolean(this.features?.includes(DiscordGuildFeatures.Partnered));
  }

  /** Whether or not this guild is verified */
  get verified() {
    return Boolean(this.features?.includes(DiscordGuildFeatures.Verified));
  }

  /** Whether or not the bot is the owner of this server. */
  get isOwner() {
    return this.bitfield.owner;
  }

  get widgetEnabled() {
    return this.bitfield.widgetEnabled;
  }

  /** Whether this is a large guild */
  get large() {
    return this.bitfield.large;
  }

  /** Whether this guild is unavailable due to an outage */
  get unavailable() {
    return this.bitfield.unavailable;
  }

  /** Whether this server's icon is animated */
  get animatedIcon() {
    return this.bitfield.animatedIcon;
  }

  /** Whether this server's banner is animated */
  get animatedBanner() {
    return this.bitfield.animatedBanner;
  }

  /** Whether this server's splash is animated */
  get animatedSplash() {
    return this.bitfield.animatedSplash;
  }

  /** The banner url for this server */
  async bannerURL(size?: DiscordImageSize, format?: DiscordImageFormat) {
    return await this.client.guildBannerURL(this.id, {
      banner: this.banner!,
      size,
      format,
      animated: this.animatedBanner!,
    });
  }

  /** The splash url for this server */
  splashURL(size?: DiscordImageSize, format?: DiscordImageFormat) {
    return this.client.guildSplashURL(this.id, {
      splash: this.splash,
      size,
      format,
      animated: this.animatedSplash,
    });
  }

  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  async delete() {
    return await this.client.deleteGuild(this.id);
  }

  /** Edit the server. Requires the MANAGE_GUILD permission. */
  async edit(options: ModifyGuild) {
    return await this.client.editGuild(this.id, options);
  }

  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  async auditLogs(options: Partial<GetGuildAuditLog>) {
    return await this.client.getAuditLogs(this.id, options);
  }

  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  async getBan(memberId: bigint) {
    return await this.client.getBan(this.id, memberId);
  }

  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  async bans() {
    return await this.client.getBans(this.id);
  }

  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
  async ban(memberId: bigint, options: CreateGuildBan) {
    return await this.client.banMember(this.id, memberId, options);
  }

  /** Remove the ban for a user. Requires BAN_MEMBERS permission */
  async unban(memberId: bigint) {
    return await this.client.unbanMember(this.id, memberId);
  }

  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  async invites() {
    return await this.client.getInvites(this.id);
  }

  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  iconURL(size?: DiscordImageSize, format?: DiscordImageFormat) {
    return this.client.guildIconURL(this.id, {
      icon: this.icon,
      size,
      format,
      animated: this.animatedIcon!,
    });
  }

  /** Leave a guild */
  async leave() {
    return await this.client.leaveGuild(this.id);
  }

  // await Promise.all(
  //   [...channels, ...threads].map(async (channel) => {
  //     const discordenoChannel = await structures.createDiscordenoChannel(channel, guildId);

  //     return await cacheHandlers.set("channels", discordenoChannel.id, discordenoChannel);
  //   })
  // );

  /** Get the JSON version of the Guild object used to create this. Includes the shardId as well */
  toJSON() {
    const members: GuildMember[] = [];
    for (const member of this.members.values()) {
      members.push(...member.toJSON());
    }

    return {
      shardId: this.shardId,
      id: this.id?.toString(),
      name: this.name,
      icon: this.icon ? iconBigintToHash(this.icon, this.animatedIcon) : undefined,
      iconHash: undefined,
      splash: this.splash ? iconBigintToHash(this.splash, this.animatedSplash) : undefined,
      discoverySplash: this.discoverySplash,
      owner: this.owner,
      ownerId: this.ownerId?.toString(),
      permissions: this.permissions,
      region: this.region,
      afkChannelId: this.afkChannelId?.toString(),
      afkTimeout: this.afkTimeout,
      widgetEnabled: this.widgetEnabled,
      widgetChannelId: this.widgetChannelId?.toString(),
      verificationLevel: this.verificationLevel,
      defaultMessageNotifications: this.defaultMessageNotifications,
      explicitContentFilter: this.explicitContentFilter,
      roles: this.roles?.map((r) => r.toJSON()) || [],
      emojis: this.emojis?.array() || [],
      features: this.features,
      mfaLevel: this.mfaLevel,
      applicationId: this.applicationId?.toString(),
      systemChannelId: this.systemChannelId?.toString(),
      systemChannelFlags: this.systemChannelFlags,
      rulesChannelId: this.rulesChannelId?.toString(),
      joinedAt: this.joinedAt ? new Date(this.joinedAt).toISOString() : undefined,
      large: this.large,
      unavailable: this.unavailable,
      memberCount: this.memberCount,
      voiceStates: this.voiceStates.map(vs => vs.toJSON()),
      members,
      channels: this.channels.map(c => c.toJSON()),
      threads: this.threads,
      presences: this.presences.array(),
      maxPresences: this.maxPresences,
      maxMembers: this.maxMembers,
      vanityUrlCode: this.vanityUrlCode,
      description: this.description,
      banner: this.banner ? iconBigintToHash(this.banner, this.animatedBanner) : null,
      premiumTier: this.premiumTier,
      premiumSubscriptionCount: this.premiumSubscriptionCount,
      preferredLocale: this.preferredLocale,
      publicUpdatesChannelId: this.publicUpdatesChannelId?.toString(),
      maxVideoChannelUsers: this.maxVideoChannelUsers,
      approximateMemberCount: this.approximateMemberCount,
      approximatePresenceCount: this.approximatePresenceCount,
      welcomeScreen: this.welcomeScreen,
      nsfwLevel: this.nsfwLevel,
      stageInstances: this.stageInstances,
    } as Guild & { shardId: number };
  }
}

export default DDGuild;
