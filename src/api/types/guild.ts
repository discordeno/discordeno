import {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GetGuildWidgetImageStyleOptions,
  GuildFeatures,
  IntegrationExpireBehavior,
  MembershipScreeningFieldType,
  MFALevel,
  PremiumTier,
  PresenceUpdateEventPayload as PresenceUpdateEvent,
  SystemChannelFlags,
  VerificationLevel,
} from "../../types/mod.ts";
import { Channel, ChannelTypes, Overwrite } from "./channel.ts";
import { Emoji } from "./emoji.ts";
import { Role } from "./permissions.ts";
import { User } from "./user.ts";
import { VoiceState } from "./voice.ts";

export type {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GetGuildWidgetImageStyleOptions,
  GuildFeatures,
  IntegrationExpireBehavior,
  MembershipScreeningFieldType,
  MFALevel,
  PremiumTier,
  PresenceUpdateEvent,
  SystemChannelFlags,
  VerificationLevel,
};

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface Guild {
  /** guild id */
  id: string;
  /** guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name: string;
  /** icon hash */
  icon: string | null;
  /** icon hash, returned when in the template object */
  iconHash?: string | null;
  /** splash hash */
  splashHash: string | null;
  /** discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoveryAplash: string | null;
  /** true if the user is the owner of the guild */
  owner?: boolean;
  /** id of the owner */
  ownerID: string;
  /** total permissions for the user in the guild (execludes overrides) */
  permissions?: string;
  /** voice region id for the guild */
  region: string;
  /** id of afk channel */
  afkChannelID: string | null;
  /** afk timeout in seconds */
  afkTimeout: number;
  /** true if the server widget is enabled */
  widgetEnabled?: boolean;
  /** the channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelID?: string | null;
  /** verification level required for the guild */
  verificationLevel: VerificationLevel;
  /** default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevel;
  /** explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevel;
  /** roles in the guild */
  roles: Role[];
  /** custom guild emojis */
  emojis: Emoji[];
  /** enabled guild features */
  features: GuildFeatures[];
  /** required MFA level for the guild */
  mfaLevel: MFALevel;
  /** application id of the guild creator if it is bot-created */
  applicationID: string | null;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelID: string | null;
  /** system channel flags */
  systemChannelFlags: SystemChannelFlags;
  /** the id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelID: string | null;
  /** when this guild was joined at */
  joinedAt?: string;
  /** true if this is considered a large guild */
  large?: boolean;
  /** true if this guild is unavailable due to an outage */
  unavailable?: boolean;
  /** total number of members in this guild */
  memberCount?: number;
  /** states of members currently in voice channels; lacks the guildid key */
  voiceStates?: Partial<VoiceState>[];
  /** users in the guild */
  members?: GuildMember[];
  /** channels in the guild */
  channels?: Channel[];
  /** presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<PresenceUpdateEvent>[];
  /** the maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number | null;
  /** the maximum number of members for the guild */
  maxMembers?: number;
  /** the vaniy url code for the guild */
  vanityUrlCode: string | null;
  /** the description for the guild, if the guild is discoverable */
  description: string | null;
  /** banner hash */
  banner: string | null;
  /** premium tier (Server Boost level) */
  premiumTier: PremiumTier;
  /** the number of boosts this guild currently has */
  premiumSubscriptionCount?: number;
  /** the preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelID: string | null;
  /** the maximum amount of users in a video channel */
  maxVideoChannelUsers?: number;
  /** approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when withcounts is true */
  approximateMemberCount?: number;
  /**	approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when withcounts is true */
  approximatePresenceCount?: number;
}

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export interface UnavailableGuild extends Partial<Guild> {}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface GuildPreview {
  /** guild id */
  id: string;
  /** guild name (2-100 characters) */
  name: string;
  /** icon hash */
  icon: string | null;
  /** splash hash */
  splash: string | null;
  /** discovery splash hash */
  discoverySplash: string | null;
  /** custom guild emojis */
  emojis: Emoji[];
  /** enabled guild features */
  features: GuildFeatures[];
  /** approximate number of members in this guild */
  approximateMemberCount: number;
  /** approximate number of online members in this guild */
  approximatePresenceCount: number;
  /** the description for the guild */
  description: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface GuildWidget {
  /** whether the widget is enabled */
  enabled: boolean;
  /** the widget channel id */
  channelID: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface GuildMember {
  /** the user this guild member represents */
  user?: User;
  /** this users guild nickname */
  nick: string | null;
  /** array of role payload ids */
  roles: string[];
  /** when the user joined the guild */
  joinedAt: string;
  /** when the user started boosting the guild */
  premiumSince?: string | null;
  /** whether the user is deafened in voice channels */
  deaf: boolean;
  /** whether the user is muted in voice channels */
  mute: boolean;
  /** whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface Integration {
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
  roleID?: string;
  /** whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticons?: boolean;
  /** the behavior of expiring subscribers */
  expireBehavior?: IntegrationExpireBehavior;
  /** the grace period (in days) before expiring subscribers */
  expireGracePeriod?: number;
  /** user for this integration */
  user?: User;
  /** integration account information */
  account: IntegrationAccount;
  /** when this integration was last synced */
  syncedAt?: string;
  /** how many subscribers this integration has */
  subscriberCount: number;
  /** has this integration been revoked */
  revoked?: boolean;
  /** the bot/OAuth2 application for discord integrations */
  application?: IntegrationApplication;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object */
export interface IntegrationAccount {
  /** id of the account */
  id: string;
  /** name of the account */
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object */
export interface IntegrationApplication {
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
  bot?: User;
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface Ban {
  /** the reason for the ban */
  reason: string | null;
  /** the banned user */
  user: User;
}

export interface MembershipScreening {
  /** when the fields were last updated */
  version: string;
  /** the steps in the screening form */
  formFields: MembershipScreeningField[];
  /** the server description shown in the screening form */
  description: string | null;
}

export interface MembershipScreeningField {
  /** the type of field (currently "TERMS" is the only type) */
  fieldType: MembershipScreeningFieldType;
  /** the title of the field */
  label: string;
  /** the list of rules */
  values?: string[];
  /** whether the user has to fill out this field */
  required: boolean;
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuildOptions {
  /** name of the guild (2-100 characters) */
  name: string;
  /** voice region id */
  region?: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
  /** verification level */
  verificationLevel?: VerificationLevel;
  /** default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevel;
  /** explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevel;
  /** new guild roles (first role is the everyone role) */
  roles?: Role[];
  /** new guild's channels */
  channels?: Partial<Channel>[];
  /** id for afk channel */
  afkChannelID?: string;
  /** afk timeout in seconds */
  afkTimeout?: number;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelID?: string;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export interface GetGuildOptions {
  /** when true, will return approximate member and presence counts for the guild */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export interface ModifyGuildOptions {
  /** guild name */
  name?: string;
  /** guild voice region id */
  region?: string | null;
  /** verification level */
  verificationLevel?: VerificationLevel | null;
  /** default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevel | null;
  /** explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevel | null;
  /** id for afk channel */
  afkChannelID?: string | null;
  /** afk timeout in seconds */
  afkTimeout?: number;
  /** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has ANIMATEDICON feature) */
  icon?: string | null;
  /** user id to transfer guild ownershop to (must be owner) */
  ownerID?: string;
  /** base64 16:9 png/jpeg image for the guild splash (when the server has INVITESPLASH feature) */
  splash?: string | null;
  /** base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelID?: string | null;
  /** the id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelID?: string | null;
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelID?: string | null;
  /** the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null;
}

// used
export interface CreateChannelOptions {
  /** channel name (2-100 characters) */
  name: string;
  /** the type of channel, default: Guild Text Channel */
  type?: ChannelTypes;
  /** channel topic (0-1024 characters) */
  topic?: string;
  /** the bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** the user limit of the voice channel (voice only) */
  userLimit?: number;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission managemessages or managechannel, are unaffected */
  rateLimitPerUser?: number;
  /** sorting position of the channel */
  position?: number;
  /** the channel's permission overwrites */
  permissionOverwrites?: Overwrite[];
  /** id of the parent category for a channel */
  parentID?: string;
  /** whether the channel is nsfw */
  nsfw?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositionsOptions {
  /** channel id */
  id: string;
  /** sorting position of the channel */
  position: number | null;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembersOptions {
  /** max number of members to return (1-1000), default 1 */
  limit: number;
  /** the highest user id in the previous page, default 0 */
  after: string;
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member */
export interface AddGuildMemberOptions {
  /** an oauth2 access token granted with the guilds.join to the bot's application for the user you want to add to the guild */
  accessToken: string;
  /** value to set users nickname to. Requires the MANAGENICKNAMES permission */
  nick?: string;
  /** array of role ids the member is assigned. Requires the MANAGEROLES permission */
  roles?: string[];
  /** whether the user is muted in voice channels. Requires the MUTEMEMBERS permission */
  mute?: boolean;
  /** whether the user is deafened in voice channels. Requires the DEAFENMEMBERS permission */
  deaf?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMemberOptions {
  /** value to set users nicckname to. Requires the MANAGENICKNAMES permission */
  nick?: string | null;
  /** array of role ids the member is assigned. Requires the MANAGEROLES permission */
  roles?: string[] | null;
  /** whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MUTEMEMBERS permission */
  mute?: boolean | null;
  /** whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MOVEMEMBERS permission */
  deaf?: boolean | null;
  /** id of channel to move user to (if they are connected to voice). Requires the MOVEMEMBERS permission */
  channelID: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export interface ModifyCurrentUserNickOptions {
  /** value to set users nickname to. Requires the CHANGENICKNAME permission */
  nick?: string | null;
}

// used
export interface BanOptions {
  /** number of days to delete messages for (0-7) */
  deleteDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** reason for the ban */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export interface CreateGuildRoleOptions {
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
export interface ModifyGuildRolePositionsOptions {
  /** role id */
  id: string;
  /** sorting position of the role */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export interface ModifyGuildRoleOptions {
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
  includeRoles: string | string[];
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPruneOptions {
  /** number of days to prune (1 or more), default: 7 */
  days?: number;
  /** whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean;
  /** role(s) ro include, default: none */
  includeRoles?: string[];
}

/** https://discord.com/developers/docs/resources/guild#create-guild-integration */
export interface CreateGuildIntegrationOptions {
  /** the integration type */
  type: string;
  /** the integration id */
  id: string;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export interface ModifyGuildIntegration {
  /** the behavior when an integration subscription lapses (see the integration expire behaviors documentation) */
  expireBehavior?: number | null;
  /** perios (in days) where the integration will ignore lapsed subscriptions */
  expireGracePeriod?: number | null;
  /** whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticons?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export interface GetGuildWidgetImageOptions {
  /** style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}

export interface ModifyGuildMembershipScreeningForm {
  /** whether Membership Screening is enabled */
  enabled: boolean;
  /** arrray of field objects serialized in a string */
  formFields: string;
  /** the server description to show in the screening form */
  description: string;
}
