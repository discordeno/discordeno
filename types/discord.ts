import {
  AllowedMentionsTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  AuditLogEvents,
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
  BaseIncomingWebhook,
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
  ButtonStyles,
  ChannelTypes,
  EmbedTypes,
  GatewayEventNames,
  GuildFeatures,
  IntegrationExpireBehaviors,
  InteractionTypes,
  MessageActivityTypes,
  MessageComponentTypes,
  MessageTypes,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  SnakeCasedPropertiesDeep,
  StickerFormatTypes,
  StickerTypes,
  TargetTypes,
  TextStyles,
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

/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields */
export interface DiscordIntegrationCreateUpdate extends DiscordIntegration {
  /** Id of the guild */
  guild_id: string;
}

/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-delete-event-fields */
export interface DiscordIntegrationDelete {
  /** Integration id */
  id: string;
  /** Id of the guild */
  guild_id: string;
  /** Id of the bot/OAuth2 application for this discord integration */
  application_id?: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export interface DiscordGuildIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guild_id: string;
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

export interface DiscordIncomingWebhook extends SnakeCasedPropertiesDeep<BaseIncomingWebhook> {
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
  /** The id of the webhook */
  id: string;
  /** The guild id this webhook is for */
  guild_id?: string | null;
  /** The channel id this webhook is for */
  channel_id?: string | null;
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
  joined_at?: string;
  /** States of members currently in voice channels; lacks the guild_id key */
  voice_states?: Omit<DiscordVoiceState, "guildId">[];
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
  preferred_locale: string;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: string | null;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcome_screen?: DiscordWelcomeScreen;
  /** Stage instances in the guild */
  stage_instances?: DiscordStageInstance[];
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface DiscordRole {
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
  /** Role name */
  name: string;
  /** Integer representation of hexadecimal color code */
  color: number;
  /** Position of this role */
  position: number;
  /** role unicode emoji */
  unicode_emoji?: string;
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
  /** Either "idle", "dnd", "online", or "offline" */
  status: "idle" | "dnd" | "online" | "offline";
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
  id: string;
  /** The id of the user */
  user_id: string;
  /** The time the current user last joined the thread */
  join_timestamp: string;
}

export interface DiscordThreadMemberGuildCreate extends SnakeCasedPropertiesDeep<BaseThreadMember> {
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

/** https://discord.com/developers/docs/resources/channel#message-object */
export interface DiscordMessage {
  /** id of the message */
  id: string;
  /** id of the channel the message was sent in */
  channel_id: string;
  /** id of the guild the message was sent in */
  guild_id?: string;
  /**
   * The author of this message (not guaranteed to be a valid user)
   * Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object.
   */
  author: DiscordUser;
  /**
   * Member properties for this message's author
   * Note: The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.
   */
  member?: DiscordMember;
  /** Contents of the message */
  content?: string;
  /** When this message was sent */
  timestamp: string;
  /** When this message was edited (or null if never) */
  edited_timestamp: string | null;
  /** Whether this was a TTS message */
  tts: boolean;
  /** Whether this message mentions everyone */
  mention_everyone: boolean;
  /**
   * Users specifically mentioned in the message
   * Note: The user objects in the mentions array will only have the partial member field present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
   */
  mentions?: (DiscordUser & { member?: Partial<DiscordMember> })[];
  /** Roles specifically mentioned in this message */
  mention_roles?: string[];
  /**
   * Channels specifically mentioned in this message
   * Note: Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent.
   */
  mention_channels?: DiscordChannelMention[];
  /** Any attached files */
  attachments: DiscordAttachment[];
  /** Any embedded content */
  embeds: DiscordEmbed[];
  /** Reactions to the message */
  reactions?: DiscordReaction[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Whether this message is pinned */
  pinned: boolean;
  /** If the message is generated by a webhook, this is the webhook's id */
  webhook_id?: string;
  /** Type of message */
  type: MessageTypes;
  /** Sent with Rich Presence-related chat embeds */
  activity?: DiscordMessageActivity;
  /** Sent with Rich Presence-related chat embeds */
  application?: Partial<DiscordApplication>;
  /** if the message is an Interaction or application-owned webhook, this is the id of the application */
  application_id?: string;
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  message_reference?: Omit<DiscordMessageReference, "failIfNotExists">;
  /** Message flags combined as a bitfield */
  flags?: number;
  /**
   * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
   * @deprecated
   */
  stickers?: DiscordSticker[];
  /**
   * The message associated with the `message_reference`
   * Note: This field is only returned for messages with a `type` of `19` (REPLY). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
   */
  referenced_message?: DiscordMessage;
  /** Sent if the message is a response to an Interaction */
  interaction?: DiscordMessageInteraction;
  /** The thread that was started from this message, includes thread member object */
  thread?: Omit<DiscordChannel, "member"> & { member: DiscordThreadMember };
  /** The components related to this message */
  components?: DiscordMessageComponents;
  /** Sent if the message contains stickers */
  sticker_items?: DiscordStickerItem[];
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object */
export interface DiscordChannelMention {
  /** id of the channel */
  id: string;
  /** id of the guild containing the channel */
  guild_id: string;
  /** The type of channel */
  type: number;
  /** The name of the channel */
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#reaction-object */
export interface DiscordReaction {
  /** Times this emoji has been used to react */
  count: number;
  /** Whether the current user reacted using this emoji */
  me: boolean;
  /** Emoji information */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface DiscordMessageActivity {
  /** Type of message activity */
  type: MessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface DiscordMessageReference {
  /** id of the originating message */
  message_id?: string;
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channel_id?: string;
  /** id of the originating message's guild */
  guild_id?: string;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  fail_if_not_exists: boolean;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface DiscordSticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: string;
  /** Id of the pack the sticker is from */
  pack_id?: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** a unicode emoji representing the sticker's expression */
  tags: string;
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes;
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes;
  /**  Whether or not the sticker is available */
  available?: boolean;
  /** Id of the guild that owns this sticker */
  guild_id?: string;
  /** The user that uploaded the sticker */
  user?: DiscordUser;
  /** A sticker's sort order within a pack */
  sort_value?: number;
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface DiscordMessageInteraction {
  /** Id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The name of the ApplicationCommand */
  name: string;
  /** The user who invoked the interaction */
  user: DiscordUser;
  /** The member who invoked the interaction in the guild */
  member?: Partial<DiscordMember>;
}

export type DiscordMessageComponents = DiscordActionRow[];

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface DiscordActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The components in this row */
  components:
    | [DiscordSelectMenuComponent | DiscordButtonComponent | DiscordInputTextComponent]
    | [DiscordButtonComponent, DiscordButtonComponent]
    | [DiscordButtonComponent, DiscordButtonComponent, DiscordButtonComponent]
    | [DiscordButtonComponent, DiscordButtonComponent, DiscordButtonComponent, DiscordButtonComponent]
    | [
      DiscordButtonComponent,
      DiscordButtonComponent,
      DiscordButtonComponent,
      DiscordButtonComponent,
      DiscordButtonComponent,
    ];
}

export interface DiscordSelectMenuComponent {
  type: MessageComponentTypes.SelectMenu;
  /** A custom identifier for this component. Maximum 100 characters. */
  custom_id: string;
  /** A custom placeholder text if nothing is selected. Maximum 100 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  min_values?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  max_values?: number;
  /** The choices! Maximum of 25 items. */
  options: DiscordSelectOption[];
}

export interface DiscordSelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string;
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string;
  /** An additional description of the option. Maximum 50 characters. */
  description?: string;
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: string;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** Will render this option as already-selected by default. */
  default?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-object */
export interface DiscordButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button;
  /** for what the button says (max 80 characters) */
  label: string;
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  custom_id?: string;
  /** For different styles/colors of the buttons */
  style: ButtonStyles;
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: string;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string;
  /** Whether or not this button is disabled */
  disabled?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface DiscordInputTextComponent {
  /** InputText Component is of type 3 */
  type: MessageComponentTypes.InputText;
  /** The style of the InputText */
  style: TextStyles;
  /** The customId of the InputText */
  custom_id: string;
  /** The label of the InputText */
  label: string;
  /** The placeholder of the InputText */
  placeholder?: string;
  /** The minimum length of the text the user has to provide */
  min_length?: number;
  /** The maximum length of the text the user has to provide */
  max_length?: number;
  /** Whether or not this input is required. */
  required?: boolean;
  /** Pre-filled value for input text. */
  value?: string;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
export interface DiscordStickerItem {
  /** Id of the sticker */
  id: string;
  /** Name of the sticker */
  name: string;
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  format_type: StickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
export interface DiscordStickerPack {
  /** id of the sticker pack */
  id: string;
  /** the stickers in the pack */
  stickers: DiscordSticker[];
  /** name of the sticker pack */
  name: string;
  /** id of the pack's SKU */
  sku_id: string;
  /** id of a sticker in the pack which is shown as the pack's icon */
  cover_sticker_id?: string;
  /** description of the sticker pack */
  description: string;
  /** id of the sticker pack's [banner image](https://discord.com/developers/docs/reference#image-formatting) */
  banner_asset_id?: string;
}

export interface DiscordInteraction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  application_id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The guild it was sent from */
  guild_id?: string;
  /** The channel it was sent from */
  channel_id?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: DiscordInteractionMember;
  /** User object for the invoking user, if invoked in a DM */
  user?: DiscordUser;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
  /** For the message the button was attached to */
  message?: DiscordMessage;

  data?: DiscordInteractionData;

  /** The selected language of the invoking user */
  locale?: string;
  /** The guild's preferred locale, if invoked in a guild */
  guild_locale?: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface DiscordInteractionMember extends DiscordMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string;
}

export interface DiscordInteractionData {
  /** The type of component */
  component_type?: MessageComponentTypes;
  /** The custom id provided for this component. */
  custom_id?: string;
  /** The components if its a Modal Submit interaction. */
  components?: DiscordMessageComponents;
  /** The values chosen by the user. */
  values?: string[];
  /** The Id of the invoked command */
  id: string;
  /** The name of the invoked command */
  name: string;
  /** Converted users + roles + channels + attachments */
  resolved?: {
    /** The Ids and Message objects */
    messages?: Record<string, DiscordMessage>;
    /** The Ids and User objects */
    users?: Record<string, DiscordUser>;
    /** The Ids and partial Member objects */
    members?: Record<string, Omit<DiscordInteractionMember, "user" | "deaf" | "mute">>;
    /** The Ids and Role objects */
    roles?: Record<string, DiscordRole>;
    /** The Ids and partial Channel objects */
    channels?: Record<string, Pick<DiscordChannel, "id" | "name" | "type" | "permissions">>;
    /** The ids and attachment objects */
    attachments: Record<string, DiscordAttachment>;
  };
  /** The params + values from the user */
  options?: DiscordInteractionDataOption[];
  /** The target id if this is a context menu command. */
  target_id?: string;
}

export type DiscordInteractionDataOption = {
  /** the name of the parameter */
  name: string;
  /** value of application command option type */
  type: ApplicationCommandOptionTypes;
  /** the value of the pair */
  value?: string | boolean | number | DiscordMember | DiscordChannel | DiscordRole;
  /** present if this option is a group or subcommand */
  options?: DiscordInteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
};

export interface DiscordInteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, DiscordMessage>;
  /** The Ids and User objects */
  users?: Record<string, DiscordUser>;
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<DiscordInteractionMember, "user" | "deaf" | "mute">>;
  /** The Ids and Role objects */
  roles?: Record<string, DiscordRole>;
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<DiscordChannel, "id" | "name" | "type" | "permissions">>;
  /** The Ids and attachments objects */
  attachments?: Record<string, DiscordAttachment>;
}

export interface DiscordListActiveThreads {
  /** The active threads */
  threads: DiscordChannel[];
  /** A thread member object for each returned thread the current user has joined */
  members: DiscordThreadMember[];
}

export interface DiscordThreadListSync {
  /** The id of the guild */
  guild_id: string;
  /** The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data */
  channel_ids?: string[];
  /** All active threads in the given channels that the current user can access */
  threads: DiscordChannel[];
  /** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
  members: DiscordThreadMember[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface DiscordAuditLog {
  /** List of webhooks found in the audit log */
  webhooks: DiscordWebhook[];
  /** List of users found in the audit log */
  users: DiscordUser[];
  /** List of audit log entries */
  audit_log_entries: DiscordAuditLogEntry[];
  /** List of partial integration objects */
  integrations: Partial<DiscordIntegration>[];
  /** List of threads found in the audit log. */
  threads: DiscordChannel[];
  /** List of guild scheduled events found in the audit log */
  guild_scheduled_events?: DiscordScheduledEvent[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface DiscordAuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  target_id: string | null;
  /** Changes made to the `target_id` */
  changes?: DiscordAuditLogChange[];
  /** The user who made the changes */
  user_id: string | null;
  /** id of the entry */
  id: string;
  /** Type of action that occured */
  action_type: AuditLogEvents;
  /** Additional info for certain action types */
  options?: DiscordOptionalAuditEntryInfo;
  /** The reason for the change (0-512 characters) */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export type DiscordAuditLogChange =
  | {
    new_value: string;
    old_value: string;
    key:
      | "name"
      | "description"
      | "discovery_splash_hash"
      | "banner_hash"
      | "preferred_locale"
      | "rules_channel_id"
      | "public_updates_channel_id"
      | "icon_hash"
      | "splash_hash"
      | "owner_id"
      | "region"
      | "afk_channel_id"
      | "vanity_url_code"
      | "widget_channel_id"
      | "system_channel_id"
      | "topic"
      | "application_id"
      | "permissions"
      | "allow"
      | "deny"
      | "code"
      | "channel_id"
      | "inviter_id"
      | "nick"
      | "avatar_hash"
      | "id"
      | "location";
  }
  | {
    new_value: number;
    old_value: number;
    key:
      | "afk_timeout"
      | "mfa_level"
      | "verification_level"
      | "explicit_content_filter"
      | "default_messagae_notifications"
      | "prune_delete_days"
      | "position"
      | "bitrate"
      | "rate_limit_per_user"
      | "color"
      | "max_uses"
      | "uses"
      | "max_age"
      | "expire_behavior"
      | "expire_grace_period"
      | "user_limit"
      | "privacy_level"
      | "auto_archive_duration"
      | "default_auto_archive_duration"
      | "entity_type"
      | "status"
      | "communication_disabled_until";
  }
  | {
    new_value: Partial<DiscordRole>[];
    old_value?: Partial<DiscordRole>[];
    key: "$add" | "$remove";
  }
  | {
    new_value: boolean;
    old_value: boolean;
    key:
      | "widget_enabled"
      | "nsfw"
      | "hoist"
      | "mentionable"
      | "temporary"
      | "deaf"
      | "mute"
      | "enable_emoticons"
      | "archived"
      | "locked"
      | "invitable";
  }
  | {
    new_value: DiscordOverwrite[];
    old_value: DiscordOverwrite[];
    key: "permission_overwrites";
  }
  | {
    new_value: string | number;
    old_value: string | number;
    key: "type";
  };

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface DiscordOptionalAuditEntryInfo {
  /** Number of days after which inactive members were kicked */
  delete_member_days: string;
  /** Number of members removed by the prune */
  members_removed: string;
  /** Channel in which the entities were targeted */
  channel_id: string;
  /** id of the message that was targeted, types: MESSAGE_PIN & MESSAGE_UNPIN & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE */
  message_id: string;
  /** Number of entities that were targeted */
  count: string;
  /** id of the overwritten entity */
  id: string;
  /** type of overwritten entity - "0", for "role", or "1" for "member" */
  type: string;
  /** Name of the role if type is "0" (not present if type is "1") */
  role_name: string;
}

export interface DiscordScheduledEvent {
  /** the id of the scheduled event */
  id: string;
  /** the guild id which the scheduled event belongs to */
  guild_id: string;
  /** the channel id in which the scheduled event will be hosted if specified */
  channel_id: string | null;
  /** the id of the user that created the scheduled event */
  creator_id?: string | null;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduled_start_time: string;
  /** the time the scheduled event will end if it does end. */
  scheduled_end_time: string | null;
  /** the privacy level of the scheduled event */
  privacy_level: ScheduledEventPrivacyLevel;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event */
  entity_type: ScheduledEventEntityType;
  /** any additional id of the hosting entity associated with event */
  entity_id: string | null;
  /** the entity metadata for the scheduled event */
  entity_metadata: DiscordScheduledEventEntityMetadata | null;
  /** the user that created the scheduled event */
  creator?: DiscordUser;
  /** the number of users subscribed to the scheduled event */
  user_count?: number;
  /** the cover image hash of the scheduled event */
  image: string | null;
}

export interface DiscordScheduledEventEntityMetadata {
  /** location of the event */
  location?: string;
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export interface DiscordGetGatewayBot {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string;
  /** The recommended number of shards to use when connecting */
  shards: number;
  /** Information on the current session start limit */
  session_start_limit: DiscordSessionStartLimit;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object */
export interface DiscordSessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number;
  /** The remaining number of session starts the current user is allowed */
  remaining: number;
  /** The number of milliseconds after which the limit resets */
  reset_after: number;
  /** The number of identify requests allowed per 5 seconds */
  max_concurrency: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object */
export interface DiscordInviteMetadata extends DiscordInvite {
  /** Number of times this invite has been used */
  uses: number;
  /** Max number of times this invite can be used */
  max_uses: number;
  /** Duration (in seconds) after which the invite expires */
  max_age: number;
  /** Whether this invite only grants temporary membership */
  temporary: boolean;
  /** When this invite was created */
  created_at: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface DiscordInvite {
  /** The invite code (unique Id) */
  code: string;
  /** The guild this invite is for */
  guild?: Partial<DiscordGuild>;
  /** The channel this invite is for */
  channel: Partial<DiscordChannel> | null;
  /** The user who created the invite */
  inviter?: DiscordUser;
  /** The type of target for this voice channel invite */
  target_type?: TargetTypes;
  /** The target user for this invite */
  target_user?: DiscordUser;
  /** The embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<DiscordApplication>;
  /** Approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number;
  /** Approximate count of total members */
  approximate_member_count?: number;
  /** The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true` */
  expires_at?: string | null;
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stage_instance?: DiscordInviteStageInstance;
  /** guild scheduled event data */
  guild_scheduled_event?: DiscordScheduledEvent;
}

export interface DiscordInviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[];
  /** The number of users in the Stage */
  participant_count: number;
  /** The number of users speaking in the Stage */
  speaker_count: number;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface DiscordApplicationCommand {
  /** Unique id of the command */
  id: string;
  /** Unique id of the parent application */
  application_id: string;
  /** Guild id of the command, if not global */
  guild_id?: string;
  /** 1-32 character name matching */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: DiscordApplicationCommandOption[];
  /** Whether the command is enbaled by default when the app is added to a guild */
  default_permission?: boolean;
  /** The type of command. By default this is a application command(ChatInput). */
  type?: ApplicationCommandTypes;
  /** Autoincrementing version identifier updated during substantial record changes */
  version: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface DiscordApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: ApplicationCommandOptionTypes;
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** If the parameter is required or optional--default `false` */
  required?: boolean;
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: DiscordApplicationCommandOptionChoice[];
  /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: DiscordApplicationCommandOption[];
  /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
  autocomplete?: boolean;
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channel_types?: ChannelTypes[];
  /** Minimum number desired. */
  min_value?: number;
  /** Maximum number desired. */
  max_value?: number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface DiscordApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** Value of the choice, up to 100 characters if string */
  value: string | number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions */
export interface DiscordGuildApplicationCommandPermissions {
  /** The id of the command */
  id: string;
  /** The id of the application to command belongs to */
  application_id: string;
  /** The id of the guild */
  guild_id: string;
  /** The permissions for the command in the guild */
  permissions: DiscordApplicationCommandPermissions[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export interface DiscordApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: ApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget */
export interface DiscordGuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  channels: {
    id: string;
    name: string;
    position: number;
  }[];
  members: {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string | null;
    status: string;
    avatar_url: string;
  }[];
  presence_count: number;
}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface DiscordGuildPreview {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characters) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash */
  discovery_splash: string | null;
  /** Custom guild emojis */
  emojis: DiscordEmoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Approximate number of members in this guild */
  approximate_member_count: number;
  /** Approximate number of online members in this guild */
  approximate_presence_count: number;
  /** The description for the guild, if the guild is discoverable */
  description: string | null;
  /** Custom guild stickers */
  stickers: DiscordSticker[];
}

export interface DiscordDiscoveryCategory {
  /** Numeric id of the category */
  id: number;
  /** The name of this category, in mutliple languages */
  name: DiscordDiscoveryName;
  /** Whether this category can be set as a guild's primary category */
  is_primary: boolean;
}

export interface DiscordDiscoveryName {
  /** The name in English */
  default: string;
  /** The name in other languages */
  localizations?: Record<string, string>;
}

export interface DiscordDiscoveryMetadata {
  /** The guild Id */
  guild_id: string;
  /** The id of the primary discovery category set for this guild */
  primary_category_id: number;
  /** Up to 10 discovery search keywords set for this guild */
  keywords: string[] | null;
  /** Whether guild info is shown when custom emojis from this guild are clicked */
  emoji_discoverability_enabled: boolean;
  /** When the server's partner applicationo was accepted or denied, for applications via Server Settings */
  partner_actioned_timestamp: string | null;
  /** When the server applied for partnership, if it has a pending application */
  partner_application_timestamp: string | null;
  /** Ids of up to 5 discovery subcategories set for this guild */
  category_ids: number[];
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object */
export interface DiscordFollowedChannel {
  /** Source message id */
  channel_id: string;
  /** Created target webhook id */
  webhook_id: string;
}

/** https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
export interface DiscordGatewayPayload {
  /** opcode for the payload */
  op: number;
  /** Event data */
  d: unknown | null;
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** The event name for this payload */
  t: GatewayEventNames | null;
}

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk */
export interface DiscordGuildMembersChunk {
  /** The id of the guild */
  guild_id: string;
  /** Set of guild members */
  members: DiscordMemberWithUser[];
  /** The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunk_index: number;
  /** The total number of expected chunks for this response */
  chunk_count: number;
  /** If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here */
  not_found?: string[];
  /** If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
  presences?: DiscordPresenceUpdate[];
  /** The nonce used in the Guild Members Request */
  nonce?: string;
}

export interface DiscordComponent {
  /** component type */
  type: MessageComponentTypes;
  /** a developer-defined identifier for the component, max 100 characters */
  customId?: string;
  /** whether the component is disabled, default false */
  disabled?: boolean;
  /** For different styles/colors of the buttons */
  style?: ButtonStyles | TextStyles;
  /** text that appears on the button (max 80 characters) */
  label?: string;
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: string;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string;
  /** The choices! Maximum of 25 items. */
  options?: DiscordSelectOption[];
  /** A custom placeholder text if nothing is selected. Maximum 100 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  min_values?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  max_values?: number;
  /** a list of child components */
  components?: DiscordComponent[];
}