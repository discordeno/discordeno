import { OAuth2Scopes } from "./discordeno.ts";

/** https://discord.com/developers/docs/resources/user#create-dm */
export interface CreateDM {
  /** The recipient to open a DM channel with */
  recipientId: string;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm */
export interface CreateGroupDM {
  /** Access tokens of users that have granted your app the `gdm.join` scope */
  accessTokens: string[];
  /** A dictionary of user ids to their respective nicknames */
  nicks: Record<string, string>;
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export interface ModifyCurrentUser {
  /** User's username, if changed may cause the user's discriminator to be randomized. */
  username?: string;
  /** If passed, modifies the user's avatar */
  avatar?: string;
}

/** https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters */
export interface BotAuthenticationFlowQuery {
  /** App's client id */
  clientId: string;
  /** Needs to include bot for the bot flow */
  scope: OAuth2Scopes[];
  /** The permissions you're requesting */
  permissions: string;
  /** Pre-fills the dropdown picker with a guild for the user */
  guildId: string;
  /** True or false—disallows the user from changing the guild dropdown */
  disableGuildSelect: boolean;
}

/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread */
export interface ModifyThread {
  /** 1-100 character thread name */
  name?: string;
  /** Whether the thread is archived */
  archived?: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES`, `MANAGE_THREAD` or `MANAGE_CHANNEL` are unaffected */
  rateLimitPerUser?: number;
}

export interface ThreadMemberBase {
  /** Any user-thread settings, currently only used for notifications */
  flags: number;
}

export interface ThreadMember extends ThreadMemberBase {
  /** The id of the thread */
  id?: string;
  /** The id of the user */
  userId?: string;
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMemberOnGuildCreate extends ThreadMemberBase {
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMemberModified extends ThreadMemberBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the user */
  userId: bigint;
  /** The time the current user last joined the thread */
  joinTimestamp: number;
}

export interface ThreadMembersUpdateBase {
  /** The approximate number of members in the thread, capped at 50 */
  memberCount: number;
}

export interface ThreadMembersUpdateModified extends ThreadMembersUpdateBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the guild */
  guildId: bigint;
  /** The users who were added to the thread */
  addedMembers?: ThreadMemberModified[];
  /** The id of the users who were removed from the thread */
  removedMemberIds?: bigint[];
  // TODO: verify this
  // \* In this gateway event, the thread member objects will also include the [guild member](#DOCS_RESOURCES_GUILD/guild-member-object) and [presence](#DOCS_TOPICS_GATEWAY/presence) objects for each added thread member.
}

export interface DiscordenoCreateApplicationCommand extends CreateApplicationCommand {
  /** Id of the guild to create a guild only application command */
  guildId: string;
}

export interface FileContent {
  /** The file blob */
  blob: Blob;
  /** The name of the file */
  name: string;
}

//TODO: add docs link
export interface DiscoveryCategory {
  /** Numeric id of the category */
  id: number;
  /** The name of this category, in mutliple languages */
  name: DiscoveryName;
  /** Whether this category can be set as a guild's primary category */
  isPrimary: boolean;
}

// TODO: add docs link
export interface ValidateDiscoverySearchTermParams {
  /** The search term to check */
  term: string;
}

//TODO: add docs link
export interface DiscoveryName {
  /** The name in English */
  default: string;
  /** The name in other languages */
  localizations?: Record<string, string>;
}

// TODO: add docs link
export interface DiscoveryMetadata {
  /** The guild Id */
  guildId: string;
  /** The id of the primary discovery category set for this guild */
  primaryCategoryId: number;
  /** Up to 10 discovery search keywords set for this guild */
  keywords: string[] | null;
  /** Whether guild info is shown when custom emojis from this guild are clicked */
  emojiDiscoverabilityEnabled: boolean;
  /** When the server's partner applicationo was accepted or denied, for applications via Server Settings */
  partnerActionedTimestamp: string | null;
  /** When the server applied for partnership, if it has a pending application */
  partnerApplicationTimestamp: string | null;
  /** Ids of up to 5 discovery subcategories set for this guild */
  categoryIds: number[];
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface VoiceRegion {
  /** Unique Id for the region */
  id: string;
  /** Name of the region */
  name: string;
  /** true for a single server that is closest to the current user's client */
  optimal: boolean;
  /** Whether this is a deprecated voice region (avoid swithing to these) */
  deprecated: boolean;
  /** Whether this is a custom voice region (used for events/etc) */
  custom: boolean;
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface VoiceState {
  /** The guild id this voice state is for */
  guildId?: string;
  /** The channel id this user is connected to */
  channelId: string | null;
  /** The user id this voice state is for */
  userId: string;
  /** The guild member this voice state is for */
  member?: GuildMemberWithUser;
  /** The session id for this voice state */
  sessionId: string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  selfDeaf: boolean;
  /** Whether this user is locally muted */
  selfMute: boolean;
  /** Whether this user is streaming using "Go Live" */
  selfStream?: boolean;
  /** Whether this user's camera is enabled */
  selfVideo: boolean;
  /** Whether this user is muted by the current user */
  suppress: boolean;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp: string | null;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageTypes {
  Default,
  RecipientAdd,
  RecipientRemove,
  Call,
  ChannelNameChange,
  ChannelIconChange,
  ChannelPinnedMessage,
  GuildMemberJoin,
  UserPremiumGuildSubscription,
  UserPremiumGuildSubscriptionTier1,
  UserPremiumGuildSubscriptionTier2,
  UserPremiumGuildSubscriptionTier3,
  ChannelFollowAdd,
  GuildDiscoveryDisqualified = 14,
  GuildDiscoveryRequalified,
  GuildDiscoveryGracePeriodInitialWarning,
  GuildDiscoveryGracePeriodFinalWarning,
  ThreadCreated,
  Reply,
  ChatInputCommand,
  ThreadStarterMessage,
  GuildInviteReminder,
  ContextMenuCommand,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface MessageReference {
  /** id of the originating message */
  messageId?: string;
  /**
   * id of the originating message's channel
   * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   */
  channelId?: string;
  /** id of the originating message's guild */
  guildId?: string;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  failIfNotExists: boolean;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum MessageFlags {
  /** This message has been published to subscribed channels (via Channel Following) */
  Crossposted = 1 << 0,
  /** This message originated from a message in another channel (via Channel Following) */
  IsCrosspost = 1 << 1,
  /** Do not include any embeds when serializing this message */
  SuppressEmbeds = 1 << 2,
  /** The source message for this crosspost has been deleted (via Channel Following) */
  SourceMessageDeleted = 1 << 3,
  /** This message came from the urgent message system */
  Urgent = 1 << 4,
  /** This message has an associated thread, with the same id as the message */
  HasThread = 1 << 5,
  /** This message is only visible to the user who invoked the Interaction */
  Empheral = 1 << 6,
  /** This message is an Interaction Response and the bot is "thinking" */
  Loading = 1 << 7,
  /** This message failed to mention some roles and add their members to the thread */
  FailedToMentionSomeRolesInThread = 1 << 8,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface MessageActivity {
  /** Type of message activity */
  type: MessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  partyId?: string;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export type GetMessages = GetMessagesLimit & GetMessagesAfter & GetMessagesBefore & GetMessagesAround;

/** https://discord.com/developers/docs/resources/channel#create-message */
export type DiscordCreateMessage = SnakeCasedPropertiesDeep<Omit<CreateMessage, "file">>;

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface Attachment {
  /** Attachment id */
  id: string;
  /** Name of file attached */
  filename: string;
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  contentType?: string;
  /** Size of file in bytes */
  size: number;
  /** Source url of file */
  url: string;
  /** A proxied url of file */
  proxyUrl: string;
  /** Height of file (if image) */
  height?: number | null;
  /** Width of file (if image) */
  width?: number | null;
  /** Whether this attachment is ephemeral */
  ephemeral?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls @everyone and @here mentions */
  EveryoneMentions = "everyone",
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;
}

export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
}

// TODO: add dock link
export interface SelectOption {
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

// TODO: add dock link
export interface SelectMenuComponent {
  type: MessageComponentTypes.SelectMenu;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 100 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** The choices! Maximum of 25 items. */
  options: SelectOption[];
}

// TODO: add dock link
export interface SelectMenuData {
  /** The type of component */
  componentType: MessageComponentTypes.SelectMenu;
  /** The custom id provided for this component. */
  customId: string;
  /** The values chosen by the user. */
  values: string[];
}

/** https://discord.com/developers/docs/interactions/message-components#component-types */
export enum MessageComponentTypes {
  /** A container for other components */
  ActionRow = 1,
  /** A button object */
  Button = 2,
  /** A select menu for picking from choices */
  SelectMenu = 3,
  /** A text input object */
  InputText = 4,
}

export type ActionRowComponents = ButtonComponent | SelectMenuComponent;

export type MessageComponents = ActionRow[];

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 3 */
  type: MessageComponentTypes.InputText;
  /** The style of the InputText */
  style: TextStyles;
  /** The customId of the InputText */
  customId: string;
  /** The label of the InputText */
  label: string;
  /** The placeholder of the InputText */
  placeholder?: string;
  /** The minimum length of the text the user has to provide */
  minLength?: number;
  /** The maximum length of the text the user has to provide */
  maxLength?: number;
  /** Whether or not this input is required. */
  required?: boolean;
  /** Pre-filled value for input text. */
  value?: string;
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-styles */
export enum ButtonStyles {
  /** A blurple button */
  Primary = 1,
  /** A grey button */
  Secondary,
  /** A green button */
  Success,
  /** A red button */
  Danger,
  /** A button that navigates to a URL */
  Link,
}

export interface ButtonData {
  /** with the value you defined for this component */
  customId: string;
  /** The type of this component */
  componentType: MessageComponentTypes.Button;
}

/** https://discord.com/developers/docs/interactions/message-components#buttons-button-object */
export interface ButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button;
  /** for what the button says (max 80 characters) */
  label: string;
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string;
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

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: 1;
  /** The components in this row */
  components:
    | [SelectMenuComponent | ButtonComponent | InputTextComponent]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export interface ModifyCurrentUserNick {
  /** Value to set users nickname to. Requires the CHANGENICKNAME permission */
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchGuildMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string;
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export interface InviteDelete {
  /** The channel of the invite */
  channelId: string;
  /** The guild of the invite */
  guildId?: string;
  /** The unique invite code */
  code: string;
}

export interface InviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[];
  /** The number of users in the Stage */
  participantCount: number;
  /** The number of users speaking in the Stage */
  speakerCount: number;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-object-target-user-types */
export enum TargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image */
  image: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** The reason you are creating this emoji */
  reason?: string;
}

export type Intents = GatewayIntents;

/** https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params */
export interface GatewayURLParams {
  /** Gateway version to use */
  v: string;
  /** The encoding of received gateway packets */
  encoding: string;
  /** The (optional) compression of gateway packets */
  compress?: string;
}

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface Identify {
  /** Authentication token */
  token: string;
  /** Connection properties */
  properties: IdentifyConnectionProperties;
  /** Whether this connection supports compression of packets */
  compress?: boolean;
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  largeThreshold?: number;
  /** Used for Guild Sharding */
  shard?: [shardId: number, numberOfShards: number];
  /** Presence structure for initial presence information */
  presence?: StatusUpdate;
  /** The Gateway Intents you wish to receive */
  intents: number;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface IdentifyConnectionProperties {
  /** Operating system */
  $os: string;
  /** Library name */
  $browser: string;
  /** Library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#resume */
export interface Resume {
  /** Session token */
  token: string;
  /** Session id */
  sessionId: string;
  /** Last sequence number received */
  seq: number;
}

/** https://discord.com/developers/docs/topics/gateway#session-start-limit-object */
export interface SessionStartLimit {
  /** The total number of session starts the current user is allowed */
  total: number;
  /** The remaining number of session starts the current user is allowed */
  remaining: number;
  /** The number of milliseconds after which the limit resets */
  resetAfter: number;
  /** The number of identify requests allowed per 5 seconds */
  maxConcurrency: number;
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface Ban {
  /** The reason for the ban */
  reason: string | null;
  /** The banned user */
  user: DiscordUser;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export interface DiscordCreateGuildRole extends Omit<CreateGuildRole, "permissions"> {
  permissions?: string;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export interface GetGuildQuery {
  /** When true, will return approximate member and presence counts for the guild */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove */
export interface GuildBanRemove {
  /** id of the guild */
  guildId: string;
  /** The unbanned user */
  user: User;
}

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface GuildPreview {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characters) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash */
  discoverySplash: string | null;
  /** Custom guild emojis */
  emojis: DiscordEmoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Approximate number of members in this guild */
  approximateMemberCount: number;
  /** Approximate number of online members in this guild */
  approximatePresenceCount: number;
  /** The description for the guild, if the guild is discoverable */
  description: string | null;
  /** Custom guild stickers */
  stickers: Sticker[];
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export interface GuildWidget {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId: string | null;
}

export interface ModifyGuildRole {
  /** Name of the role */
  name?: string | null;
  /** Bitwise value of the enabled/disabled permissions */
  permissions?: PermissionStrings[] | null;
  /** RGB color value */
  color?: number | null;
  /** Whether the role should be displayed seperately in the sidebar */
  hoist?: boolean | null;
  /** Whether the role should be mentionable */
  mentionable?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export interface DiscordModifyGuildRole extends Omit<ModifyGuildRole, "permissions"> {
  permissions?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
export interface ModifyGuildRolePositions {
  /** Role id */
  id: string;
  /** Sorting position of the role */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null;
  /** Channels linked in the welcome screen and their display options */
  welcomeScreen?: WelcomeScreenChannel[] | null;
  /** The server description to show in the welcome screen */
  description?: string | null;
}

export interface ScheduledEvent {
  /** the id of the scheduled event */
  id: string;
  /** the guild id which the scheduled event belongs to */
  guildId: string;
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId: string | null;
  /** the id of the user that created the scheduled event */
  creatorId?: string | null;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: string;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime: string | null;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** any additional id of the hosting entity associated with event */
  entityId: string | null;
  /** the entity metadata for the scheduled event */
  entityMetadata: ScheduledEventEntityMetadata | null;
  /** the user that created the scheduled event */
  creator?: DiscordUser;
  /** the number of users subscribed to the scheduled event */
  userCount?: number;
  /** the cover image hash of the scheduled event */
  image: string | null;
}

export enum ScheduledEventPrivacyLevel {
  /** the scheduled event is public and available in discovery. DISCORD DEVS DISABLED THIS! WILL ERROR IF USED! */
  // Public = 1,
  /** the scheduled event is only accessible to guild members */
  GuildOnly = 2,
}

export enum ScheduledEventEntityType {
  StageInstance = 1,
  Voice,
  External,
}

export enum ScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

export interface ScheduledEventEntityMetadata {
  /** location of the event */
  location?: string;
}

export interface ScheduledEventUserRemove {
  /** id of the guild scheduled event  */
  guildScheduledEventId: string;
  /** id of the user                   */
  userId: string;
  /** id of the guild */
  guildId: string;
}

export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: bigint;
  /** location of the event */
  location?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  reason?: string;
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number;
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean;
  /** consider only users before given user id */
  before?: bigint;
  /** consider only users after given user id */
  after?: bigint;
}



/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevels {
  /** Unrestricted */
  None,
  /** Must have verified email on account */
  Low,
  /** Must be registered on Discord for longer than 5 minutes */
  Medium,
  /** Must be a member of the server for longer than 10 minutes */
  High,
  /** Must have a verified phone number */
  VeryHigh,
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommand {
  /** Unique id of the command */
  id: string;
  /** Unique id of the parent application */
  applicationId: string;
  /** Guild id of the command, if not global */
  guildId?: string;
  /** 1-32 character name matching */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
  /** Whether the command is enbaled by default when the app is added to a guild */
  defaultPermission?: boolean;
  /** The type of command. By default this is a application command(ChatInput). */
  type?: ApplicationCommandTypes;
  /** Autoincrementing version identifier updated during substantial record changes */
  version: string;
}

/** https://discord.com/developers/docs/topics/gateway#application-command-delete-application-command-extra-fields */
export interface ApplicationCommandCreateUpdateDelete extends ApplicationCommand {
  /** Id of the guild the command is in */
  guildId?: string;
}

export interface InteractionData {
  /** The type of component */
  componentType?: MessageComponentTypes;
  /** The custom id provided for this component. */
  customId?: string;
  /** The components if its a Modal Submit interaction. */
  components?: MessageComponents;
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
    members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
    /** The Ids and Role objects */
    roles?: Record<string, DiscordRole>;
    /** The Ids and partial Channel objects */
    channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissions">>;
    /** The ids and attachment objects */
    attachments: Record<string, Attachment>;
  };
  /** The params + values from the user */
  options?: InteractionDataOption[];
  /** The target id if this is a context menu command. */
  targetId?: string;
}

export interface InteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** value of application command option type */
  type: ApplicationCommandOptionTypes;
  /** the value of the pair */
  value?: string | boolean | number | DiscordMember | Channel | DiscordRole;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
};

export interface InteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, Message>;
  /** The Ids and User objects */
  users?: Record<string, DiscordUser>;
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
  /** The Ids and Role objects */
  roles?: Record<string, DiscordRole>;
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissions">>;
  /** The Ids and attachments objects */
  attachments?: Record<string, Attachment>;
}

export enum ApplicationCommandPermissionTypes {
  Role = 1,
  User,
}

export enum ApplicationCommandTypes {
  /** A text-based command that shows up when a user types `/` */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  User,
  /** A UI-based command that shows up when you right click or tap on a message */
  Message,
}

export interface CreateGlobalContextMenuCommand {
  /** 1-31 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** The type of the command */
  type: ApplicationCommandTypes;
}

/** https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command-json-params */
export interface CreateGuildApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command-json-params */
export interface EditGuildApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
}

/** https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions */
export interface GuildApplicationCommandPermissions {
  /** The id of the command */
  id: string;
  /** The id of the application to command belongs to */
  applicationId: string;
  /** The id of the guild */
  guildId: string;
  /** The permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[];
}

export interface Interaction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The guild it was sent from */
  guildId?: string;
  /** The channel it was sent from */
  channelId?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: InteractionGuildMember;
  /** User object for the invoking user, if invoked in a DM */
  user?: DiscordUser;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
  /** For the message the button was attached to */
  message?: DiscordMessage;

  data?: InteractionData;

  /** The selected language of the invoking user */
  locale?: string;
  /** The guild's preferred locale, if invoked in a guild */
  guildLocale?: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface InteractionGuildMember extends GuildMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum InteractionTypes {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
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
