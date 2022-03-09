import {
  AllowedMentionsTypes,
  BaseActivity,
  BaseActivityAssets,
  BaseActivityButton,
  BaseActivityEmoji,
  BaseActivityParty,
  BaseActivitySecrets,
  BaseActivityTimestamps,
  BaseAllowedMentions,
  BaseApplication,
  BaseApplicationWebhook,
  BaseAttachment,
  BaseChannel,
  BaseClientStatus,
  BaseConnection,
  BaseEmbed,
  BaseEmbedAuthor,
  BaseEmbedField,
  BaseEmbedFooter,
  BaseEmbedImage,
  BaseEmbedProvider,
  BaseEmbedThumbnail,
  BaseEmbedVideo,
  BaseEmoji,
  BaseGuild,
  BaseIntegration,
  BaseIntegrationAccount,
  BaseIntegrationApplication,
  BaseMember,
  BaseOverwrite,
  BasePresenceUpdate,
  BaseRole,
  BaseStageInstance,
  BaseTeam,
  BaseTeamMember,
  BaseThreadMember,
  BaseThreadMemberBase,
  BaseThreadMetadata,
  BaseTypingStart,
  BaseUser,
  BaseVoiceState,
  BaseWelcomeScreen,
  BaseWelcomeScreenChannel,
  EmbedTypes,
  IntegrationExpireBehaviors,
  SnakeCasedPropertiesDeep,
  TeamMembershipStates,
  VisibilityTypes,
} from "./shared.ts";

/** https://discord.com/developers/docs/resources/user#user-object */
export interface DiscordUser extends SnakeCasedPropertiesDeep<BaseUser> {
  /** The user's id */
  id: string;
  /** The user's 4-digit discord-tag */
  discriminator: string;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** Whether the user has two factor enabled on their account */
  mfa_enabled?: boolean;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string | null;
  /** the user's banner, or null if unset */
  banner?: string;
}

/** https://discord.com/developers/docs/resources/user#connection-object */
export interface DiscordConnection extends SnakeCasedPropertiesDeep<BaseConnection> {
  /** An array of partial server integrations */
  integrations?: DiscordIntegration[];
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface DiscordIntegration extends SnakeCasedPropertiesDeep<BaseIntegration> {
  /** User for this integration */
  user?: DiscordUser;
  /** Integration account information */
  account: DiscordIntegrationAccount;
  /** The bot/OAuth2 application for discord integrations */
  application?: DiscordIntegrationApplication;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export interface DiscordIntegrationAccount extends SnakeCasedPropertiesDeep<BaseIntegrationAccount> {
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export interface DiscordIntegrationApplication extends SnakeCasedPropertiesDeep<BaseIntegrationApplication> {
  /** The bot associated with this application */
  bot?: DiscordUser;
}

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export interface DiscordTypingStart extends SnakeCasedPropertiesDeep<BaseTypingStart> {
  /** id of the channel */
  channel_id: string;
  /** id of the guild */
  guild_id?: string;
  /** id of the user */
  user_id: string;
  /** The member who started typing if this happened in a guild */
  member?: DiscordMember;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface DiscordMember extends SnakeCasedPropertiesDeep<BaseMember> {
  /** The user this guild member represents */
  user?: DiscordUser;
  /** This users guild nickname */
  nick?: string | null;
  /** The members custom avatar for this server. */
  avatar?: string;
  /** Array of role object ids */
  roles: string[];
  /** When the user joined the guild */
  joined_at: string;
  /** When the user started boosing the guild */
  premium_since?: string | null;
  /** The permissions this member has in the guild. Only present on interaction events. */
  permissions?: string;
  /** when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
  communication_disabled_until?: string | null;
}

/** https://discord.com/developers/docs/topics/oauth2#application-object */
export interface DiscordApplication extends SnakeCasedPropertiesDeep<BaseApplication> {
  /** The id of the app */
  id: string;
  /** The icon hash of the app */
  icon: string | null;
  /** When false only app owner can join the app's bot to guilds */
  bot_public: boolean;
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  bot_require_code_grant: boolean;
  /** Partial user object containing info on the owner of the application */
  owner?: Partial<DiscordUser>;
  /** If the application belongs to a team, this will be a list of the members of that team */
  team: DiscordTeam | null;
  /** If this application is a game sold on Discord, this field will be the guild to which it has been linked */
  guild_id?: string;
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  cover_image?: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam extends SnakeCasedPropertiesDeep<BaseTeam> {
  /** A hash of the image of the team's icon */
  icon: string | null;
  /** The unique id of the team */
  id: string;
  /** The members of the team */
  members: DiscordTeamMember[];
  /** The user id of the current team owner */
  owner_user_id: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface DiscordTeamMember extends SnakeCasedPropertiesDeep<BaseTeamMember> {
  /** The id of the parent team of which they are a member */
  team_id: string;
  /** The avatar, discriminator, id, and username of the user */
  user: Partial<DiscordUser> & Pick<DiscordUser, "avatar" | "discriminator" | "id" | "username">;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface DiscordWebhookUpdate {
  /** id of the guild */
  guild_id: string;
  /** id of the channel */
  channel_id: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface DiscordAllowedMentions extends SnakeCasedPropertiesDeep<BaseAllowedMentions> {
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface DiscordEmbed extends BaseEmbed {
  /** Timestamp of embed content */
  timestamp?: string;
  /** Footer information */
  footer?: DiscordEmbedFooter;
  /** Image information */
  image?: DiscordEmbedImage;
  /** Thumbnail information */
  thumbnail?: DiscordEmbedThumbnail;
  /** Video information */
  video?: DiscordEmbedVideo;
  /** Provider information */
  provider?: DiscordEmbedProvider;
  /** Author information */
  author?: DiscordEmbedAuthor;
  /** Fields information */
  fields?: DiscordEmbedField[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthor extends SnakeCasedPropertiesDeep<BaseEmbedAuthor> {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface DiscordEmbedField extends SnakeCasedPropertiesDeep<BaseEmbedField> {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooter extends SnakeCasedPropertiesDeep<BaseEmbedFooter> {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface DiscordEmbedImage extends SnakeCasedPropertiesDeep<BaseEmbedImage> {
}

export interface DiscordEmbedProvider extends SnakeCasedPropertiesDeep<BaseEmbedProvider> {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnail extends SnakeCasedPropertiesDeep<BaseEmbedThumbnail> {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface DiscordEmbedVideo extends SnakeCasedPropertiesDeep<BaseEmbedVideo> {
}

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface DiscordAttachment extends SnakeCasedPropertiesDeep<BaseAttachment> {
  /** Attachment id */
  id: string;
  /** Height of file (if image) */
  height?: number | null;
  /** Width of file (if image) */
  width?: number | null;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type DiscordWebhook = DiscordIncomingWebhook | DiscordApplicationWebhook;

export interface DiscordIncomingWebhook {
  /** The id of the webhook */
  id: string;
  /** The guild id this webhook is for */
  guild_id?: string;
  /** The channel id this webhook is for */
  channel_id: string;
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser;
  /** The default name of the webhook */
  name: string | null;
  /** The default user avatar hash of the webhook */
  avatar: string | null;
  /** The bot/OAuth2 application that created this webhook */
  application_id: string | null;
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_guild?: Partial<DiscordGuild>;
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_channel?: Partial<DiscordChannel>;
}

export interface DiscordApplicationWebhook extends SnakeCasedPropertiesDeep<BaseApplicationWebhook> {
  /** The guild id this webhook is for */
  guildId?: string | null;
  /** The channel id this webhook is for */
  channelId?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface DiscordGuild extends SnakeCasedPropertiesDeep<BaseGuild> {
  /** Guild id */
  id: string;
  /** Icon hash */
  icon: string | null;
  /** Icon hash, returned when in the template object */
  icon_hash?: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discovery_splash: string | null;
  /** Id of the owner */
  owner_id: string;
  /** Total permissions for the user in the guild (excludes overwrites) */
  permissions?: string;
  /** Id of afk channel */
  afk_channel_id: string | null;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widget_channel_id?: string | null;
  /** Roles in the guild */
  roles: DiscordRole[];
  /** Custom guild emojis */
  emojis: DiscordEmoji[];
  /** Application id of the guild creator if it is bot-created */
  application_id: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id: string | null;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rules_channel_id: string | null;
  /** When this guild was joined at */
  joinedAt?: string;
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates?: Omit<DiscordVoiceState, "guildId">[];
  /** Users in the guild */
  members?: DiscordMember[];
  /** Channels in the guild */
  channels?: DiscordChannel[];
  // TODO: check if need to omit
  /** All active threads in the guild that the current user has permission to view */
  threads?: DiscordChannel[];
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<DiscordPresenceUpdate>[];
  /** Banner hash */
  banner: string | null;
  // TODO: Can be optimized to a number but is it worth it?
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: string | null;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: DiscordWelcomeScreen;
  /** Stage instances in the guild */
  stageInstances?: DiscordStageInstance[];
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface DiscordRole extends SnakeCasedPropertiesDeep<BaseRole> {
  /** Role id */
  id: string;
  /** If this role is showed seperately in the user listing */
  hoist: boolean;
  /** Permission bit set */
  permissions: string;
  /** Whether this role is managed by an integration */
  managed: boolean;
  /** Whether this role is mentionable */
  mentionable: boolean;
  /** The tags this role has */
  tags?: DiscordRoleTags;
  /** the role emoji hash */
  icon?: string;
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface DiscordRoleTags {
  /** The id of the bot this role belongs to */
  bot_id?: string;
  /** The id of the integration this role belongs to */
  integration_id?: string;
  /** Whether this is the guild's premium subscriber role */
  premium_subscriber?: null;
}

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface DiscordEmoji extends SnakeCasedPropertiesDeep<BaseEmoji> {
  /** Emoji id */
  id?: string;
  /** Roles allowed to use this emoji */
  roles?: string[];
  /** User that created this emoji */
  user?: DiscordUser;
  /** Whether this emoji must be wrapped in colons */
  require_colons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface DiscordVoiceState extends SnakeCasedPropertiesDeep<BaseVoiceState> {
  /** The guild id this voice state is for */
  guild_id?: string;
  /** The channel id this user is connected to */
  channel_id: string | null;
  /** The user id this voice state is for */
  user_id: string;
  /** The guild member this voice state is for */
  member?: DiscordMemberWithUser;
  /** The session id for this voice state */
  session_id: string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  self_deaf: boolean;
  /** Whether this user is locally muted */
  self_mute: boolean;
  /** Whether this user is streaming using "Go Live" */
  self_stream?: boolean;
  /** Whether this user's camera is enabled */
  self_video: boolean;
  /** Whether this user is muted by the current user */
  suppress: boolean;
  /** The time at which the user requested to speak */
  request_to_speak_timestamp: string | null;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface DiscordChannel extends SnakeCasedPropertiesDeep<BaseChannel> {
  /** The id of the channel */
  id: string;
  /** The id of the guild */
  guild_id?: string;
  /** Explicit permission overwrites for members and roles */
  permission_overwrites?: DiscordOverwrite[];
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  last_message_id?: string | null;
  /** Id of the creator of the thread */
  owner_id?: string;
  /** Application id of the group DM creator if it is bot-created */
  application_id?: string;
  /** For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parent_id?: string | null;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  last_pin_timestamp?: string | null;
  /** Thread-specifig fields not needed by other channels */
  thread_metadata?: DiscordThreadMetadata;
  /** Thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: DiscordThreadMember;
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a application command interaction */
  permissions?: string;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface DiscordPresenceUpdate extends SnakeCasedPropertiesDeep<BasePresenceUpdate> {
  /** The user presence is being updated for */
  user: DiscordUser;
  /** id of the guild */
  guild_id: string;
  /** User's current activities */
  activities: DiscordActivity[];
  /** User's platform-dependent status */
  client_status: DiscordClientStatus;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export interface DiscordWelcomeScreen extends SnakeCasedPropertiesDeep<BaseWelcomeScreen> {
  /** The server description shown in the welcome screen */
  description: string | null;
  /** The channels shown in the welcome screen, up to 5 */
  welcome_channels: DiscordWelcomeScreenChannel[];
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface DiscordWelcomeScreenChannel extends SnakeCasedPropertiesDeep<BaseWelcomeScreenChannel> {
  /** The channel's id */
  channel_id: string;
  /** The emoji id, if the emoji is custom */
  emoji_id: string | null;
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emoji_name: string | null;
}

/** https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure */
export interface DiscordStageInstance extends SnakeCasedPropertiesDeep<BaseStageInstance> {
  /** The id of this Stage instance */
  id: string;
  /** The guild id of the associated Stage channel */
  guild_id: string;
  /** The id of the associated Stage channel */
  channel_id: string;
}

export interface DiscordThreadMetadata extends SnakeCasedPropertiesDeep<BaseThreadMetadata> {
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archive_timestamp: string;
  /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  create_timestamp?: string | null;
}

export interface DiscordThreadMemberBase extends SnakeCasedPropertiesDeep<BaseThreadMemberBase> {
}

export interface DiscordThreadMember extends SnakeCasedPropertiesDeep<BaseThreadMember> {
  /** The id of the thread */
  id?: string;
  /** The id of the user */
  user_id?: string;
  /** The time the current user last joined the thread */
  join_timestamp: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface DiscordActivity extends SnakeCasedPropertiesDeep<BaseActivity> {
  /** Unix timestamps for start and/or end of the game */
  timestamps?: DiscordActivityTimestamps;
  /** Application id for the game */
  application_id?: string;
  /** The emoji used for a custom status */
  emoji?: DiscordActivityEmoji | null;
  /** Information for the current party of the player */
  party?: DiscordActivityParty;
  /** Images for the presence and their hover texts */
  assets?: DiscordActivityAssets;
  /** Secrets for Rich Presence joining and spectating */
  secrets?: DiscordActivitySecrets;
  /** The custom buttons shown in the Rich Presence (max 2) */
  buttons?: DiscordActivityButton[];
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface DiscordClientStatus extends SnakeCasedPropertiesDeep<BaseClientStatus> {
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface DiscordActivityTimestamps extends SnakeCasedPropertiesDeep<BaseActivityTimestamps> {
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface DiscordActivityEmoji extends SnakeCasedPropertiesDeep<BaseActivityEmoji> {
  /** The id of the emoji */
  id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface DiscordActivityParty extends SnakeCasedPropertiesDeep<BaseActivityParty> {
  /** The id of the party */
  id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface DiscordActivityAssets extends SnakeCasedPropertiesDeep<BaseActivityAssets> {
  /** The id for a large asset of the activity, usually a snowflake */
  large_image?: string;
  /** The id for a small asset of the activity, usually a snowflake */
  small_image?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface DiscordActivitySecrets extends SnakeCasedPropertiesDeep<BaseActivitySecrets> {
}

// https://github.com/discord/discord-api-docs/pull/2219
// TODO: add documentation link
export interface DiscordActivityButton extends SnakeCasedPropertiesDeep<BaseActivityButton> {

}

export interface DiscordOverwrite extends SnakeCasedPropertiesDeep<BaseOverwrite> {
  /** Role or user id */
  id: string;
  /** Permission bit set */
  allow?: string;
  /** Permission bit set */
  deny?: string;
}

export interface DiscordMemberWithUser extends DiscordMember {
  /** The user object for this member */
  user: DiscordUser;
}