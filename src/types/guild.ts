import { ChannelPayload, ChannelTypes, OverwritePayload } from "./channel.ts";
import { EmojiPayload } from "./emoji.ts";
import { PresenceUpdateEventPayload } from "./gateway.ts";
import { RolePayload } from "./permissions.ts";
import { UserPayload } from "./user.ts";
import { VoiceStatePayload } from "./voice.ts";

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface GuildPayload {
  /** guild id */
  id: string;
  /** guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name: string;
  /** icon hash */
  icon: string | null;
  /** icon hash, returned when in the template object */
  icon_hash?: string | null;
  /** splash hash */
  splash: string | null;
  /** discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discovery_splash: string | null;
  /** true if the user is the owner of the guild */
  owner?: boolean;
  /** id of the owner */
  owner_id: string;
  /** total permissions for the user in the guild (execludes overrides) */
  permissions?: string;
  /** voice region id for the guild */
  region: string;
  /** id of afk channel */
  afk_channel_id: string | null;
  /** afk timeout in seconds */
  afk_timeout: number;
  /** true if the server widget is enabled */
  widget_enabled?: boolean;
  /** the channel id that the widget will generate an invite to, or null if set to no invite */
  widget_channel_id?: string | null;
  /** verification level required for the guild */
  verification_level: VerificationLevel;
  /** default message notifications level */
  default_message_notifications: DefaultMessageNotificationLevel;
  /** explicit content filter level */
  explicit_content_filter: ExplicitContentFilterLevel;
  /** roles in the guild */
  roles: RolePayload[];
  /** custom guild emojis */
  emojis: EmojiPayload[];
  /** enabled guild features */
  features: GuildFeatures[];
  /** required MFA level for the guild */
  mfa_level: MFALevel;
  /** application id of the guild creator if it is bot-created */
  application_id: string | null;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id: string | null;
  /** system channel flags */
  system_channel_flags: SystemChannelFlags;
  /** the id of the channel where community guilds can display rules and/or guidelines */
  rules_channel_id: string | null;
  /** when this guild was joined at */
  joined_at?: string;
  /** true if this is considered a large guild */
  large?: boolean;
  /** true if this guild is unavailable due to an outage */
  unavailable?: boolean;
  /** total number of members in this guild */
  member_count?: number;
  /** states of members currently in voice channels; lacks the guild_id key */
  voice_states?: Partial<VoiceStatePayload>[];
  /** users in the guild */
  members?: GuildMemberPayload[];
  /** channels in the guild */
  channels?: ChannelPayload[];
  /** presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<PresenceUpdateEventPayload>[];
  /** the maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  max_presences?: number | null;
  /** the maximum number of members for the guild */
  max_members?: number;
  /** the vaniy url code for the guild */
  vanity_url_code: string | null;
  /** the description for the guild, if the guild is discoverable */
  description: string | null;
  /** banner hash */
  banner: string | null;
  /** premium tier (Server Boost level) */
  premium_tier: PremiumTier;
  /** the number of boosts this guild currently has */
  premium_subscription_count?: number;
  /** the preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferred_locale: string;
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: string | null;
  /** the maximum amount of users in a video channel */
  max_video_channel_users?: number;
  /** approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximate_member_count?: number;
  /**	approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximate_presence_count?: number;
}

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DefaultMessageNotificationLevel {
  ALL_MESSAGES,
  ONLY_MENTIONS,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum ExplicitContentFilterLevel {
  DISABLED,
  MEMBERS_WITHOUT_ROLES,
  ALL_MEMBERS,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export enum MFALevel {
  NONE,
  ELEVATED,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevel {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-premium-tier */
export enum PremiumTier {
  NONE,
  TIER_1,
  TIER_2,
  TIER_3,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export enum SystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum GuildFeatures {
  INVITE_SPLASH,
  VIP_REGIONS,
  VANITY_URL,
  VERIFIED,
  PARTNERED,
  COMMUNITY,
  COMMERCE,
  NEWS,
  DISCOVERABLE,
  FEATURABLE,
  ANIMATED_ICON,
  BANNER,
  WELCOME_SCREEN_ENABLED,
  MEMBER_VERIFICATION_GATE_ENABLED,
  PREVIEW_ENABLED,
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface UnavailableGuildPayload extends Partial<GuildPayload> {}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface GuildPreviewPayload {
  /** guild id */
  id: string;
  /** guild name (2-100 characters) */
  name: string;
  /** icon hash */
  icon: string | null;
  /** splash hash */
  splash: string | null;
  /** discovery splash hash */
  discovery_splash: string | null;
  /** custom guild emojis */
  emojis: EmojiPayload[];
  /** enabled guild features */
  features: GuildFeatures[];
  /** approximate number of members in this guild */
  approximate_member_count: number;
  /** approximate number of online members in this guild */
  approximate_presence_count: number;
  /** the description for the guild */
  description: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface GuildWidgetPayload {
  /** whether the widget is enabled */
  enabled: boolean;
  /** the widget channel id */
  channel_id: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface GuildMemberPayload {
  /** the user this guild member represents */
  user?: UserPayload;
  /** this users guild nickname */
  nick: string | null;
  /** array of role payload ids */
  roles: string[];
  /** when the user joined the guild */
  joined_at: string;
  /** when the user started boosting the guild */
  premium_since?: string | null;
  /** whether the user is deafened in voice channels */
  deaf: boolean;
  /** whether the user is muted in voice channels */
  mute: boolean;
  /** whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface IntegrationPayload {
  /** integration id */
  id: string;
  /** integration name */
  name: string;
  /** integration type (twitch, youtube, or discord) */
  type: string;
  /** is this integration enabled */
  enabled: boolean;
  /** is this integration syncing */
  syncing?: boolean;
  /** id that this integration uses for "subscribers" */
  role_id?: string;
  /** whether emoticons should be synced for this integration (twitch only currently) */
  enable_emoticons?: boolean;
  /** the behavior of expiring subscribers */
  expire_behavior?: IntegrationExpireBehavior;
  /** the grace period (in days) before expiring subscribers */
  expire_grace_period?: number;
  /** user for this integration */
  user?: UserPayload;
  /** integration account information */
  account: IntegrationAccountPayload;
  /** when this integration was last synced */
  synced_at?: string;
  /** how many subscribers this integration has */
  subscriber_count: number;
  /** has this integration been revoked */
  revoked?: boolean;
  /** the bot/OAuth2 application for discord integrations */
  application?: IntegrationApplicationPayload;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehavior {
  REMOVE_ROLE,
  KICK,
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object */
export interface IntegrationAccountPayload {
  /** id of the account */
  id: string;
  /** name of the account */
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object */
export interface IntegrationApplicationPayload {
  /** the id of the app */
  id: string;
  /** the name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** the summary of the app */
  summary: string;
  /** the bot associated with this application */
  bot?: UserPayload;
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface BanPayload {
  /** the reason for the ban */
  reason: string | null;
  /** the banned user */
  user: UserPayload;
}

export interface MembershipScreeningPayload {
  /** when the fields were last updated */
  version: string;
  /** the steps in the screening form */
  form_fields: MembershipScreeningFieldPayload[];
  /** the server description shown in the screening form */
  description: string | null;
}

export interface MembershipScreeningFieldPayload {
  /** the type of field (currently "TERMS" is the only type) */
  field_type: MembershipScreeningFieldType;
  /** the title of the field */
  label: string;
  /** the list of rules */
  values?: string[];
  /** whether the user has to fill out this field */
  required: boolean;
}

export enum MembershipScreeningFieldType {
  /** Server Rules */
  TERMS = "TERMS",
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuildParams {
  /** name of the guild (2-100 characters) */
  name: string;
  /** voice region id */
  region?: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
  /** verification level */
  verification_level?: VerificationLevel;
  /** default message notification level */
  default_message_notifications?: DefaultMessageNotificationLevel;
  /** explicit content filter level */
  explicit_content_filter?: ExplicitContentFilterLevel;
  /** new guild roles (first role is the everyone role) */
  roles?: RolePayload[];
  /** new guild's channels */
  channels?: Partial<ChannelPayload>[];
  /** id for afk channel */
  afk_channel_id?: string;
  /** afk timeout in seconds */
  afk_timeout?: number;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id?: string;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export interface GetGuildParams {
  /** when true, will return approximate member and presence counts for the guild */
  with_counts?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export interface ModifyGuildParams {
  /** guild name */
  name?: string;
  /** guild voice region id */
  region?: string | null;
  /** verification level */
  verification_level?: VerificationLevel | null;
  /** default message notification filter level */
  default_message_notifications?: DefaultMessageNotificationLevel | null;
  /** explicit content filter level */
  explicit_content_filter?: ExplicitContentFilterLevel | null;
  /** id for afk channel */
  afk_channel_id?: string | null;
  /** afk timeout in seconds */
  afk_timeout?: number;
  /** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has ANIMATED_ICON feature) */
  icon?: string | null;
  /** user id to transfer guild ownershop to (must be owner) */
  owner_id?: string;
  /** base64 16:9 png/jpeg image for the guild splash (when the server has INVITE_SPLASH feature) */
  splash?: string | null;
  /** base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id?: string | null;
  /** the id of the channel where Community guilds display rules and/or guidelines */
  rules_channel_id?: string | null;
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id?: string | null;
  /** the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferred_locale?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel */
export interface CreateGuildChannelParams {
  /** channel name (2-100 characters) */
  name: string;
  /** the type of channel */
  type?: ChannelTypes;
  /** channel topic (0-1024 characters) */
  topic?: string;
  /** the bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** the user limit of the voice channel (voice only) */
  user_limit?: number;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected */
  rate_limit_per_user?: number;
  /** sorting position of the channel */
  position?: number;
  /** the channel's permission overwrites */
  permission_overwrites?: OverwritePayload[];
  /** id of the parent category for a channel */
  parent_id?: string;
  /** whether the channel is nsfw */
  nsfw?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositionsParam {
  /** channel id */
  id: string;
  /** sorting position of the channel */
  position: number | null;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembersParams {
  /** max number of members to return (1-1000), default 1 */
  limit: number;
  /** the highest user id in the previous page, default 0 */
  after: string;
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member */
export interface AddGuildMemberParams {
  /** an oauth2 access token granted with the guilds.join to the bot's application for the user you want to add to the guild */
  access_token: string;
  /** value to set users nickname to. Requires the MANAGE_NICKNAMES permission */
  nick?: string;
  /** array of role ids the member is assigned. Requires the MANAGE_ROLES permission */
  roles?: string[];
  /** whether the user is muted in voice channels. Requires the MUTE_MEMBERS permission */
  mute?: boolean;
  /** whether the user is deafened in voice channels. Requires the DEAFEN_MEMBERS permission */
  deaf?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMemberParams {
  /** value to set users nicckname to. Requires the MANAGE_NICKNAMES permission */
  nick?: string | null;
  /** array of role ids the member is assigned. Requires the MANAGE_ROLES permission */
  roles?: string[] | null;
  /** whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MUTE_MEMBERS permission */
  mute?: boolean | null;
  /** whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MOVE_MEMBERS permission */
  deaf?: boolean | null;
  /** id of channel to move user to (if they are connected to voice). Requires the MOVE_MEMBERS permission */
  channel_id: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export interface ModifyCurrentUserNickParams {
  /** value to set users nickname to. Requires the CHANGE_NICKNAME permission */
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
  /** number of days to delete messages for (0-7) */
  delete_message_days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** reason for the ban */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export interface CreateGuildRoleParams {
  /** name of the role, default: "new role" */
  name?: string;
  /** bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: string;
  /** RGB color value, default: 0 */
  color?: number;
  /** whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** whether the role should be mentionable, default: false */
  mentionable: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
export interface ModifyGuildRolePositionsParams {
  /** role id */
  id: string;
  /** sorting position of the role */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export interface ModifyGuildRoleParams {
  /** name of the role */
  name?: string | null;
  /** bitwise value of the enabled/disabled permissions */
  permissions?: string | null;
  /** RGB color value */
  color?: number | null;
  /** whether the role should be displayed seperately in the sidebar */
  hoist?: boolean | null;
  /** whether the role should be mentionable */
  mentionable?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountParaams {
  /** number of days to count prune for (1 or more), default: 7 */
  days?: number;
  /** role(s) to include, default: none */
  include_roles: string | string[];
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPruneParams {
  /** number of days to prune (1 or more), default: 7 */
  days?: number;
  /** whether 'pruned' is returned, discouraged for large guilds, default: true */
  compute_prune_count?: boolean;
  /** role(s) ro include, default: none */
  include_roles?: string[];
}

/** https://discord.com/developers/docs/resources/guild#create-guild-integration */
export interface CreateGuildIntegrationParams {
  /** the integration type */
  type: string;
  /** the integration id */
  id: string;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export interface ModifyGuildIntegration {
  /** the behavior when an integration subscription lapses (see the integration expire behaviors documentation) */
  expire_behavior?: number | null;
  /** perios (in days) where the integration will ignore lapsed subscriptions */
  expire_grace_period?: number | null;
  /** whether emoticons should be synced for this integration (twitch only currently) */
  enable_emoticons?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export interface GetGuildWidgetImageParams {
  /** style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export enum GetGuildWidgetImageStyleOptions {
  /** shield style widget with Discord icon and guild members online count */
  SHIELD = "shield",
  /** large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget */
  BANNER_1 = "banner1",
  /** smaller widget style with guild icon, name and online count. Split on the right with Discord logo */
  BANNER_2 = "banner2",
  /** large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right */
  BANNER_3 = "banner3",
  /** large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom */
  BANNER_4 = "banner4",
}

export interface ModifyGuildMembershipScreeningForm {
  /** whether Membership Screening is enabled */
  enabled: boolean;
  /** arrray of field objects serialized in a string */
  form_fields: string;
  /** the server description to show in the screening form */
  description: string;
}
