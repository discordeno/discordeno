import { SnakeCaseProps } from "../util.ts";

export interface Guild {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Icon hash, returned when in the template object */
  iconHash?: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash: string | null;
  /** True if the user is the owner of the guild */
  owner?: boolean;
  /** Id of the owner */
  ownerId: string;
  /** Total permissions for the user in the guild (execludes overrides) */
  permissions?: string;
  /** Voice region id for the guild */
  region: string;
  /** Id of afk channel */
  afkChannelId: string | null;
  /** Afk timeout in seconds */
  afkTimeout: number;
  /** True if the server widget is enabled */
  widgetEnabled?: boolean;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: string | null;
  /** Verification level required for the guild */
  verificationLevel: VerificationLevel;
  /** Default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevel;
  /** Explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevel;
  /** Roles in the guild */
  roles: Role[];
  /** Custom guild emojis */
  emojis: Emoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Required MFA level for the guild */
  mfaLevel: MFALevel;
  /** Application id of the guild creator if it is bot-created */
  applicationId: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId: string | null;
  /** System channel flags */
  systemChannelFlags: SystemChannelFlags;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId: string | null;
  /** When this guild was joined at */
  joinedAt?: string;
  /** True if this is considered a large guild */
  large?: boolean;
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean;
  /** Total number of members in this guild */
  memberCount?: number;
  /** States of members currently in voice channels; lacks the guildId key */
  voiceStates?: Partial<VoiceStateUpdateEvent>[];
  /** Users in the guild */
  members?: Member[];
  /** Channels in the guild */
  channels?: Channel[];
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<PresenceUpdateEvent>[];
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number | null;
  /** The maximum number of members for the guild */
  maxMembers?: number;
  /** The vaniy url code for the guild */
  vanityUrlCode: string | null;
  /** The description for the guild, if the guild is discoverable */
  description: string | null;
  /** Banner hash */
  banner: string | null;
  /** Premium tier (Server Boost level) */
  premiumTier: PremiumTier;
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number;
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId: string | null;
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number;
  /** Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when withCounts is true */
  approximateMemberCount?: number;
  /**	Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when withCounts is true */
  approximatePresenceCount?: number;
}

/** https://discord.com/developers/docs/resources/guild#guild-object */
export type DiscordGuild = SnakeCaseProps<Guild>;
