/** Types for: https://discord.com/developers/docs/resources/guild */

import type { ChannelTypes, ForumLayout, SortOrderTypes, VideoQualityModes } from '../discord/channel.js';
import type {
  DefaultMessageNotificationLevels,
  DiscordGuildOnboardingMode,
  DiscordGuildOnboardingPrompt,
  DiscordWelcomeScreenChannel,
  ExplicitContentFilterLevels,
  GuildFeatures,
  MemberFlags,
  SystemChannelFlags,
  VerificationLevels,
} from '../discord/guild.js';
import type { BigString, Camelize } from '../shared.js';
import type { DiscordenoDefaultReactionEmoji, DiscordenoForumTag, Overwrite } from './channel.js';
import type { GuildRoleColors } from './permissions.js';

/** https://discord.com/developers/docs/resources/guild#modify-guild-json-params */
export interface ModifyGuild {
  /** Guild name */
  name?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels | null;
  /** Default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels | null;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels | null;
  /** Id for afk channel */
  afkChannelId?: BigString | null;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
  icon?: string | null;
  /** Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature) */
  splash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild discovery spash (when the server has the `DISCOVERABLE` feature) */
  discoverySplash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: BigString | null;
  /**
   * System channel flags
   *
   * @see {@link SystemChannelFlags}
   */
  systemChannelFlags?: number;
  /** The id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelId?: BigString | null;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: BigString | null;
  /** The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null;
  /** Enabled guild features */
  features?: GuildFeatures[];
  /** The description for the guild */
  description?: string | null;
  /** Whether the guild's boost progress bar should be enabled */
  premiumProgressBarEnabled?: boolean;
  /** The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safetyAlertsChannelId?: BigString | null;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel-json-params */
export interface CreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string;
  /** The type of channel */
  type?: ChannelTypes;
  /** Channel topic (0-1024 characters) */
  topic?: string;
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** The user limit of the voice channel (voice only) */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number;
  /** Sorting position of the channel (channels with the same position are sorted by id) */
  position?: number;
  /** The channel's permission overwrites */
  permissionOverwrites?: Overwrite[];
  /** Id of the parent category for a channel */
  parentId?: BigString;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** Channel voice region id of the voice or stage channel, automatic when set to null */
  rtcRegion?: string;
  /** The camera video quality mode of the voice channel */
  videoQualityMode?: VideoQualityModes;
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  defaultAutoArchiveDuration?: number;
  /** Emoji to show in the add reaction button on a thread in a forum channel */
  defaultReactionEmoji?: DiscordenoDefaultReactionEmoji;
  /** Set of tags that can be used in a forum channel */
  availableTags?: DiscordenoForumTag[];
  /** The default sort order type used to order posts in forum channels */
  defaultSortOrder?: SortOrderTypes | null;
  /** the default forum layout view used to display posts in GUILD_FORUM channels */
  defaultForumLayout?: ForumLayout;
  /** The initial ratelimit to set on newly created threads in a channel. */
  defaultThreadRateLimitPerUser?: number;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions-json-params */
export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: BigString;
  /** Sorting position of the channel (channels with the same position are sorted by id) */
  position?: number | null;
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lockPermissions?: boolean | null;
  /** The new parent ID for the channel that is moved */
  parentId?: BigString | null;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members-query-string-params */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string;
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member-json-params */
export interface AddGuildMemberOptions {
  /** access token of a user that has granted your app the `guilds.join` scope */
  accessToken: string;
  /** Value to set user's nickname to. Requires MANAGE_NICKNAMES permission on the bot */
  nick?: string;
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission on the bot */
  roles?: BigString[];
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission on the bot */
  mute?: boolean;
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission on the bot */
  deaf?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member-json-params */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null;
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: BigString[] | null;
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null;
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null;
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: BigString | null;
  /** When the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission. The date must be given in a ISO string form. */
  communicationDisabledUntil?: string | null;
  /**
   * Set the flags for the guild member. Requires the `MANAGE_GUILD` or `MANAGE_ROLES` or the combination of `MODERATE_MEMBERS` and `KICK_MEMBERS` and `BAN_MEMBERS`
   *
   * @see {@link MemberFlags}
   */
  flags?: number;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-member-json-params */
export interface EditBotMemberOptions {
  /** Value to set user's nickname to	 */
  nick?: string | null;
  /** Data URI base64 encoded banner image */
  banner?: string | null;
  /** Data URI base64 encoded avatar image */
  avatar?: string | null;
  /** Guild member bio */
  bio?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-bans-query-string-params */
export interface GetBans {
  /** Number of users to return (up to maximum 1000). Default: 1000 */
  limit?: number;
  /** Consider only users before given user id */
  before?: BigString;
  /** Consider only users after given user id */
  after?: BigString;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban-json-params */
export interface CreateGuildBan {
  /**
   * Number of seconds to delete messages for, between 0 and 604800 (7 days)
   *
   * @default 0
   */
  deleteMessageSeconds?: number;
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban-json-params */
export interface CreateGuildBulkBan {
  /** list of user ids to ban (max 200) */
  userIds: BigString[];
  /**
   * Number of seconds to delete messages for, between 0 and 604800 (7 days)
   *
   * @default 0
   */
  deleteMessageSeconds?: number;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role-json-params */
export interface CreateGuildRole {
  /** Name of the role, max 100 characters, default: "new role" */
  name?: string;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: string;
  /**
   * RGB color value, default: 0
   * @deprecated the {@link colors} field is recommended for use instead of this field
   */
  color?: number;
  /** The role's color */
  colors?: GuildRoleColors;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string | null;
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string | null;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions-json-params */
export interface ModifyRolePositions {
  /** The role id */
  id: BigString;
  /** The sorting position for the role. (roles with the same position are sorted by id) */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-json-params */
export interface EditGuildRole {
  /** Name of the role, max 100 characters, default: "new role" */
  name?: string | null;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: string | null;
  /**
   * RGB color value, default: 0
   * @deprecated the {@link colors} field is recommended for use instead of this field
   */
  color?: number | null;
  /** The role's color */
  colors?: GuildRoleColors | null;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean | null;
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string | null;
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string | null;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number;
  /** Role(s) to include, default: none */
  includeRoles?: string | string[];
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number;
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean;
  /** Role(s) ro include, default: none */
  includeRoles?: string[];
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /**
   * Style of the widget returned, default: shield
   *
   * Shield: Widget with Discord icon and guild members online count.
   * Banner1: Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
   * Banner2: Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
   * Banner3: Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
   * Banner4: Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
   */
  style?: 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding-json-params */
export interface EditGuildOnboarding {
  /** Prompts shown during onboarding and in customize community */
  prompts?: Camelize<DiscordGuildOnboardingPrompt>[];
  /** Channel IDs that members get opted into automatically */
  defaultChannelIds?: BigString[];
  /** Whether onboarding is enabled in the guild */
  enabled?: boolean;
  /** Current mode of onboarding */
  mode?: DiscordGuildOnboardingMode;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-incident-actions-json-params */
export interface ModifyGuildIncidentActions {
  /**
   * When invites will be enabled again
   *
   * @remarks
   * The value should either be an ISO8601 string or null
   *
   * Can be enabled for a maximal timespan of 24 hours in the future.
   * Supplying null disables the action
   */
  invitesDisabledUntil?: string | null;
  /**
   * When direct messages will be enabled again
   *
   * @remarks
   * The value should either be an ISO8601 string or null
   *
   * Can be enabled for a maximal timespan of 24 hours in the future.
   * Supplying null disables the action
   */
  dmsDisabledUntil?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null;
  /** Channels linked in the welcome screen and their display options */
  welcome_screen?: DiscordWelcomeScreenChannel[] | null;
  /** The server description to show in the welcome screen */
  description?: string | null;
}
