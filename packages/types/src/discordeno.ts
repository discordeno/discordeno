import type {
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
  DiscordApplicationEventWebhookStatus,
  DiscordApplicationIntegrationType,
  DiscordAttachment,
  DiscordAutoModerationRuleTriggerMetadataPresets,
  DiscordChannel,
  DiscordDefaultReactionEmoji,
  DiscordEmbed,
  DiscordForumTag,
  DiscordGuildOnboardingMode,
  DiscordGuildOnboardingPrompt,
  DiscordInstallParams,
  DiscordInteractionContextType,
  DiscordInteractionEntryPointCommandHandlerType,
  DiscordMessageReferenceType,
  DiscordPollAnswer,
  DiscordPollLayoutType,
  DiscordPollMedia,
  DiscordReactionType,
  DiscordRole,
  DiscordScheduledEventRecurrenceRule,
  DiscordWebhookEventType,
} from './discord.js'
import type {
  AllowedMentionsTypes,
  ApplicationCommandTypes,
  ApplicationFlags,
  AuditLogEvents,
  BigString,
  ButtonStyles,
  Camelize,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  ForumLayout,
  GuildFeatures,
  InteractionResponseTypes,
  Localization,
  MessageComponentTypes,
  MessageFlags,
  OverwriteTypes,
  PermissionStrings,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  SortOrderTypes,
  SystemChannelFlags,
  TargetTypes,
  TextStyles,
  VerificationLevels,
  VideoQualityModes,
} from './shared.js'

/** https://discord.com/developers/docs/resources/channel#create-message-jsonform-params */
export interface CreateMessageOptions {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  nonce?: string | number
  /** true if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** Include to make your message a reply or a forward */
  messageReference?: {
    /** Type of reference */
    type?: DiscordMessageReferenceType
    /** id of the originating message */
    messageId?: BigString
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channelId?: BigString
    /** id of the originating message's guild */
    guildId?: BigString
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    failIfNotExists: boolean
  }
  attachments?: (Pick<Camelize<DiscordAttachment>, 'id'> & Omit<Partial<Camelize<DiscordAttachment>>, 'id'>)[]
  /** The contents of the files being sent */
  files?: FileContent[]
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: [BigString] | [BigString, BigString] | [BigString, BigString, BigString]
  /** Message flags combined as a bitfield, only SUPPRESS_EMBEDS and SUPPRESS_NOTIFICATIONS can be set */
  flags?: MessageFlags
  /** If true and nonce is present, it will be checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message will be returned and no new message will be created. */
  enforceNonce?: boolean
  /** A poll object */
  poll?: CreatePoll
}

export type MessageComponents = MessageComponent[]
export type MessageComponent =
  | ActionRow
  | ButtonComponent
  | InputTextComponent
  | SelectMenuComponent
  | SelectMenuChannelsComponent
  | SelectMenuRolesComponent
  | SelectMenuUsersComponent
  | SelectMenuUsersAndRolesComponent

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: MessageComponentTypes.ActionRow
  /** The components in this row */
  components:
    | [Exclude<MessageComponent, ActionRow>]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface ButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button
  /** for what the button says (max 80 characters) */
  label?: string
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string
  /** For different styles/colors of the buttons */
  style: ButtonStyles
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: bigint
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string
  /** Whether or not this button is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface SelectMenuComponent {
  /** SelectMenu Component is of type 3 */
  type: MessageComponentTypes.SelectMenu
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** The choices! Maximum of 25 items. */
  options: SelectOption[]
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuUsersComponent {
  /** SelectMenuChannels Component is of type 5 */
  type: MessageComponentTypes.SelectMenuUsers
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuRolesComponent {
  /** SelectMenuChannels Component is of type 6 */
  type: MessageComponentTypes.SelectMenuRoles
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuUsersAndRolesComponent {
  /** SelectMenuChannels Component is of type 7 */
  type: MessageComponentTypes.SelectMenuUsersAndRoles
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuChannelsComponent {
  /** SelectMenuChannels Component is of type 8 */
  type: MessageComponentTypes.SelectMenuChannels
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** List of channel types to include in the options list */
  channelTypes?: ChannelTypes[]
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string
  /** An additional description of the option. Maximum 50 characters. */
  description?: string
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: bigint
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** Will render this option as already-selected by default. */
  default?: boolean
}

export interface SelectMenuDefaultValue {
  /** ID of a user, role, or channel */
  id: bigint
  /** Type of value that id represents. */
  type: 'user' | 'role' | 'channel'
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 4 */
  type: MessageComponentTypes.InputText
  /** The style of the InputText */
  style: TextStyles
  /** The customId of the InputText */
  customId: string
  /** The label of the InputText. Maximum 45 characters */
  label: string
  /** The placeholder of the InputText */
  placeholder?: string
  /** The minimum length of the text the user has to provide */
  minLength?: number
  /** The maximum length of the text the user has to provide */
  maxLength?: number
  /** Whether or not this input is required. */
  required?: boolean
  /** Pre-filled value for input text. */
  value?: string
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[]
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean
  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[]
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[]
}

export interface FileContent {
  /** The file blob */
  blob: Blob
  /** The name of the file */
  name: string
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number
}

export interface OverwriteReadable {
  /** Role or user id */
  id: bigint
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes
  /** Permission bit set */
  allow?: PermissionStrings[]
  /** Permission bit set */
  deny?: PermissionStrings[]
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: BigString
}

export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  type: DiscordReactionType
  /** Get users after this user Id */
  after?: string
  /** Max number of users to return (1-100) */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number
  /** Optional maximum number of threads to return */
  limit?: number
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Entries from a specific user ID */
  userId?: BigString
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents
  /** Entries with ID less than a specific audit log entry ID. */
  before?: BigString
  /** Entries with ID greater than a specific audit log entry ID. */
  after?: BigString
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds-query-string-params */
export interface GetUserGuilds {
  /** Get guilds before this guild ID */
  before?: BigString
  /** Get guilds after this guild ID */
  after?: BigString
  /** Maximum number of entries (between 1-200) to return, defaults to 200 */
  limit?: number
  /** Include approximate member and presence counts in response, defaults to false */
  withCounts?: boolean
}

export interface GetBans {
  /** Number of users to return (up to maximum 1000). Default: 1000 */
  limit?: number
  /** Consider only users before given user id */
  before?: BigString
  /** Consider only users after given user id */
  after?: BigString
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number
  /** The highest user id in the previous page. Default: 0 */
  after?: string
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number
  /** Role(s) to include, default: none */
  includeRoles?: string | string[]
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean
  /** consider only users before given user id */
  before?: BigString
  /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
  after?: BigString
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: BigString
}

export type CreateApplicationCommand = CreateSlashApplicationCommand | CreateContextApplicationCommand

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateSlashApplicationCommand {
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization
  /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
  type?: ApplicationCommandTypes
  /**
   * Parameters for the command
   *
   * @remarks
   * This is only valid in commands of type {@link ApplicationCommandTypes.ChatInput | ChatInput}
   */
  options?: Camelize<DiscordApplicationCommandOption[]>
  /** Set of permissions represented as a bit set */
  defaultMemberPermissions?: PermissionStrings[]
  /**
   * Integration types where the command is available
   *
   * @remarks
   * This value is available only for globally-scoped commands
   * Defaults to the application configured contexts
   */
  integrationTypes?: DiscordApplicationIntegrationType[]
  /**
   * Interaction context types where the command is available.
   *
   * @remarks
   * This value is available only for globally-scoped commands
   * By default, all interaction context types are included for new commands
   */
  contexts?: DiscordInteractionContextType[]
  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.
   *
   * @deprecated use {@link contexts} instead
   */
  dmPermission?: boolean
  /** Indicates whether the command is age-restricted, defaults to `false` */
  nsfw?: boolean
  /**
   * Determines whether the interaction is handled by the app's interactions handler or by Discord
   *
   * @remarks
   * This can only be set for application commands of type `PRIMARY_ENTRY_POINT` for applications with the `EMBEDDED` flag (i.e. applications that have an Activity).
   */
  handler?: DiscordInteractionEntryPointCommandHandlerType
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateContextApplicationCommand extends Omit<CreateSlashApplicationCommand, 'options' | 'description' | 'descriptionLocalizations'> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string
  /** True if this is a TTS message */
  tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** The contents of the files being sent */
  files?: FileContent[]
  /** The customId you want to use for this modal response. */
  customId?: string
  /** The title you want to use for this modal response. */
  title?: string
  /** The components you would like to have sent in this message */
  components?: MessageComponents
  /** Message flags combined as a bit field (only `SUPPRESS_EMBEDS`, `EPHEMERAL` and `SUPPRESS_NOTIFICATIONS` can be set) */
  flags?: number
  /** Autocomplete choices (max of 25 choices) */
  choices?: Camelize<DiscordApplicationCommandOptionChoice[]>
  /** Details about the poll */
  poll?: CreatePoll
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes
  /** An optional response message */
  data?: InteractionCallbackData
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response-query-string-params */
export interface InteractionCallbackOptions {
  withResponse?: boolean
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
  /** Roles allowed to use this emoji */
  roles?: BigString[]
}

/** https://discord.com/developers/docs/resources/emoji#create-application-emoji */
export interface CreateApplicationEmoji {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null
}

/** https://discord.com/developers/docs/resources/emoji#modify-application-emoji */
export interface ModifyApplicationEmoji {
  /** Name of the emoji */
  name?: string
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: BigString
  /** String that username starts with, or an empty string to return all members */
  query?: string
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean
  /** Used to specify which users you wish to fetch */
  userIds?: BigString[]
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string
}

export interface CreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string
  /** The type of channel */
  type?: ChannelTypes
  /** Channel topic (0-1024 characters) */
  topic?: string
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number
  /** The user limit of the voice channel (voice only) */
  userLimit?: number
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rateLimitPerUser?: number
  /** Sorting position of the channel (channels with the same position are sorted by id) */
  position?: number
  /** The channel's permission overwrites */
  permissionOverwrites?: OverwriteReadable[]
  /** Id of the parent category for a channel */
  parentId?: BigString
  /** Whether the channel is nsfw */
  nsfw?: boolean
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  defaultAutoArchiveDuration?: number
  /** Emoji to show in the add reaction button on a thread in a forum channel */
  defaultReactionEmoji?: {
    /** The id of a guild's custom emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emojiId?: BigString | null
    /** The unicode character of the emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emojiName?: string | null
  }
  /** Set of tags that can be used in a forum channel */
  availableTags?: Array<{
    /** The id of the tag */
    id: BigString
    /** The name of the tag (0-20 characters) */
    name: string
    /** whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean
    /** The id of a guild's custom emoji */
    emojiId: BigString
    /** The unicode character of the emoji */
    emojiName?: string
  }>
  /** The default sort order type used to order posts in forum channels */
  defaultSortOrder?: SortOrderTypes | null
  /** The initial ratelimit to set on newly created threads in a channel. */
  defaultThreadRateLimitPerUser?: number
}

export interface CreateGlobalApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface CreateGuildApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface UpsertGlobalApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

export interface UpsertGuildApplicationCommandOptions {
  /** The bearer token of the developer of the application */
  bearerToken: string
}

/** https://discord.com/developers/docs/resources/user#create-group-dm-json-params */
export interface GetGroupDmOptions {
  /** Access tokens of users that have granted your app the `gdm.join` scope */
  accessTokens: string[]
  /** A mapping of user ids to their respective nicknames */
  nicks?: Record<string, string>
}

/** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient-json-params */
export interface AddDmRecipientOptions {
  /** access token of a user that has granted your app the `gdm.join` scope */
  accessToken: string
  /** nickname of the user being added */
  nick?: string
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member-json-params */
export interface AddGuildMemberOptions {
  /** access token of a user that has granted your app the `guilds.join` scope */
  accessToken: string
  /** Value to set user's nickname to. Requires MANAGE_NICKNAMES permission on the bot */
  nick?: string
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission on the bot */
  roles?: string[]
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission on the bot */
  mute?: boolean
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission on the bot */
  deaf?: boolean
}

/**
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-group-dm
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-guild-channel
 * - https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread
 */
export interface ModifyChannel {
  /**
   * 1-100 character channel name
   *
   * @remarks
   * This is valid only when editing group dms, any guild channel type, or a thread
   */
  name?: string
  /**
   * Base64 encoded icon
   *
   * @remarks
   * This is valid only when editing group dms
   */
  icon?: string
  /**
   * The type of channel
   *
   * @remarks
   * You can only convert between {@link ChannelTypes.GuildText} channels and {@link ChannelTypes.GuildAnnouncement} channels when the guild has the `NEWS` feature
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText} or {@link ChannelTypes.GuildAnnouncement}.
   */
  type?: ChannelTypes
  /**
   * The position of the channel in the left-hand listing (channels with the same position are sorted by id)
   *
   * @remarks
   * This is only valid when editing a guild channel of any type
   */
  position?: number | null
  /**
   * Channel topic
   *
   * @remarks
   * 0-1024 character channel topic, or for {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} 0-4096
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  topic?: string | null
  /**
   * Whether the channel is nsfw
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  nsfw?: boolean | null
  /**
   * Amount of seconds a user has to wait before sending another message in seconds (0-21600)
   *
   * @remarks
   * Bots and users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}, or a thread.
   */
  rateLimitPerUser?: number | null
  /**
   * The bitrate (in bits) of the voice or stage channel
   *
   * @remarks
   * Minimum of 8000 bits
   *
   * For voice channels:
   * - normal servers can set bitrate up to 96000
   * - servers with Boost level 1 can set up to 128000
   * - servers with Boost level 2 can set up to 256000
   * - servers with Boost level 3 or the `VIP_REGIONS` guild feature can set up to 384000.
   *
   * For stage channels, bitrate can be set up to 64000.
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  bitrate?: number | null
  /**
   * The user limit of the voice or stage channel (0 refers to no limit)
   *
   * @remarks
   * - For voice channels, the max is set to 99
   * - For stage channels, the max is set to 10,000
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  userLimit?: number | null
  /**
   * Channel or category-specific permissions
   *
   * @remarks
   * This is only valid when editing a guild channel of any type
   */
  permissionOverwrites?: OverwriteReadable[] | null
  /**
   * Id of the new parent category for a channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildStageVoice} {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  parentId?: BigString | null
  /**
   * Voice region id for the voice channel, automatic when set to null
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  rtcRegion?: string | null
  /**
   * The camera video quality mode of the voice channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildVoice}, {@link ChannelTypes.GuildStageVoice}.
   */
  videoQualityMode?: VideoQualityModes
  /**
   * The default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildAnnouncement}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultAutoArchiveDuration?: 60 | 1440 | 4320 | 10080
  /**
   * Channel flags combined as a bitfield.
   *
   * @remarks
   * - `REQUIRE_TAG` is supported only by {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels.
   * - `HIDE_MEDIA_DOWNLOAD_OPTIONS` is supported only by {@link ChannelTypes.GuildMedia} channels
   * - `PINNED` can only be set for threads in {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}, or a thread.
   */
  flags?: number
  /**
   * The set of tags that can be used in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * Limited to 20 tags
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  availableTags?: DiscordForumTag[]
  /**
   * The emoji to show in the add reaction button on a thread in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultReactionEmoji?: DiscordDefaultReactionEmoji
  /**
   * The initial `rate_limit_per_user` to set on newly created threads in a channel.
   *
   * @remarks
   * This field is copied to the thread at creation time and does not live update.
   *
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildText}, {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultThreadRateLimitPerUser?: number
  /**
   * The default sort order type used to order posts in {@link ChannelTypes.GuildForum} and {@link ChannelTypes.GuildMedia} channels
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum} or {@link ChannelTypes.GuildMedia}.
   */
  defaultSortOrder?: SortOrderTypes | null
  /**
   * The default forum layout type used to display posts in {@link ChannelTypes.GuildForum} channels
   *
   * @remarks
   * This is only valid when editing a guild channel of type {@link ChannelTypes.GuildForum}.
   */
  defaultFormLayout?: ForumLayout
  /**
   * Whether the thread is archived
   *
   * @remarks
   * This is only valid when editing a thread
   */
  archived?: boolean
  /**
   * The thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity
   *
   * @remarks
   * This is only valid when editing a thread
   */
  autoArchiveDuration?: 60 | 1440 | 4320 | 10080
  /**
   * Whether the thread is locked. When a thread is locked, only users with `MANAGE_THREADS` can unarchive it
   *
   * @remarks
   * This is only valid when editing a thread
   */
  locked?: boolean
  /**
   * Whether non-moderators can add other non-moderators to a thread
   *
   * @remarks
   * Only available on private threads
   *
   * This is only valid when editing a thread
   */
  invitable?: boolean
  /**
   * The IDs of the set of tags that have been applied to a thread in a {@link ChannelTypes.GuildForum} or a {@link ChannelTypes.GuildMedia} channel
   *
   * @remarks
   * Limited to 5
   *
   * This is only valid when editing a thread
   */
  appliedTags?: BigString[]
}

export interface EditChannelPermissionOverridesOptions extends OverwriteReadable {}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: BigString
  /** Sorting position of the channel (channels with the same position are sorted by id) */
  position?: number | null
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lockPositions?: boolean | null
  /** The new parent ID for the channel that is moved */
  parentId?: BigString | null
}

export interface ModifyWebhook {
  /** The default name of the webhook */
  name?: string
  /** Image for the default webhook avatar */
  avatar?: BigString | null
  /** The new channel id this webhook should be moved to */
  channelId?: BigString
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: BigString
  /** Name of the thread to create (target channel has to be type of forum channel) */
  threadName?: string
  /** Array of tag ids to apply to the thread (requires the webhook channel to be a forum or media channel) */
  appliedTags?: BigString[]
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Override the default username of the webhook */
  username?: string
  /** Override the default avatar of the webhook */
  avatarUrl?: string
  /** True if this is a TTS message */
  tts?: boolean
  /** The contents of the files being sent */
  files?: FileContent[]
  /** Embedded `rich` content */
  embeds?: Camelize<DiscordEmbed>[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** the components to include with the message */
  components?: MessageComponents
  /** A poll object */
  poll?: CreatePoll
}

export interface GetWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: BigString
}

export interface DeleteWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: BigString
}

export interface CreateForumPostWithMessage {
  /** 1-100 character thread name */
  name: string
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null
  /** contents of the first message in the forum/media thread */
  message: {
    /** The message contents (up to 2000 characters) */
    content?: string
    /** Embedded `rich` content (up to 6000 characters) */
    embeds?: Camelize<DiscordEmbed>[]
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions
    /** The components you would like to have sent in this message */
    components?: MessageComponents
    /** IDs of up to 3 stickers in the server to send in the message */
    stickerIds?: BigString[]
    /** Message flags combined as a bitfield, only SUPPRESS_EMBEDS and SUPPRESS_NOTIFICATIONS can be set */
    flags?: MessageFlags
  }
  /** The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM or a GUILD_MEDIA channel */
  appliedTags?: BigString[]
  /** The contents of the files being sent */
  files?: FileContent[]
}

export interface CreateStageInstance {
  /** The id of the Stage channel */
  channelId: BigString
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** Notify \@everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
  sendStartNotification?: boolean
  /** The guild scheduled event associated with this Stage instance */
  guildScheduledEventId?: BigString
}

export interface EditStageInstanceOptions {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}

export interface StartThreadWithMessage {
  /** 1-100 character thread name */
  name: string
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null
}

export interface StartThreadWithoutMessage {
  /** 1-100 character thread name */
  name: string
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null
  /** the type of thread to create */
  type: ChannelTypes.AnnouncementThread | ChannelTypes.PublicThread | ChannelTypes.PrivateThread
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean
}

export interface CreateAutoModerationRuleOptions {
  /** The name of the rule. */
  name: string
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes
  /** The type of trigger to use for the rule. */
  triggerType: AutoModerationTriggerTypes
  /** The metadata to use for the trigger. */
  triggerMetadata: {
    /** The keywords needed to match. Only present when TriggerType.Keyword */
    keywordFilter?: string[]
    /** Regular expression patterns which will be matched against content. Only present when TriggerType.Keyword */
    regexPatterns?: string[]
    /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[]
    /** The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset */
    allowList?: string[]
    /** Total number of mentions (role & user) allowed per message (Maximum of 50). Only present when TriggerType.MentionSpam */
    mentionTotalLimit?: number
  }
  /** The actions that will trigger for this rule */
  actions: Array<{
    /** The type of action to take when a rule is triggered */
    type: AutoModerationActionType
    /** additional metadata needed during execution for this specific action type */
    metadata?: {
      /** The id of channel to which user content should be logged. Only in SendAlertMessage */
      channelId?: BigString
      /** Timeout duration in seconds. Max is 2419200(4 weeks). Only supported for TriggerType.Keyword */
      durationSeconds?: number
    }
  }>
  /** Whether the rule should be enabled, true by default. */
  enabled?: boolean
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[]
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[]
}

export interface EditAutoModerationRuleOptions {
  /** The name of the rule. */
  name: string
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes
  /** The metadata to use for the trigger. */
  triggerMetadata: {
    /** The keywords needed to match. Only present when TriggerType.Keyword */
    keywordFilter?: string[]
    /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[]
    /** The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset */
    allowList?: string[]
    /** Total number of mentions (role & user) allowed per message (Maximum of 50) */
    mentionTotalLimit: number
  }
  /** The actions that will trigger for this rule */
  actions: Array<{
    /** The type of action to take when a rule is triggered */
    type: AutoModerationActionType
    /** additional metadata needed during execution for this specific action type */
    metadata: {
      /** The id of channel to which user content should be logged. Only in SendAlertMessage */
      channelId?: BigString
      /** Timeout duration in seconds. Only supported for TriggerType.Keyword */
      durationSeconds?: number
    }
  }>
  /** Whether the rule should be enabled. */
  enabled?: boolean
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[]
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[]
}

export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: BigString
  /** location of the event. Required for events with `entityType: ScheduledEventEntityType.External` */
  location?: string
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description: string
  /** the time the scheduled event will start */
  scheduledStartTime: string
  /** the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External` */
  scheduledEndTime?: string
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule
}

export interface EditScheduledEvent {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId: BigString | null
  /** location of the event */
  location?: string
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduledStartTime: string
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: string
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule | null
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean
}

export interface CreateChannelInvite {
  /** Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days). Default: 86400 (24 hours) */
  maxAge?: number
  /** Max number of users or 0 for unlimited. Between 0 and 100. Default: 0 */
  maxUses?: number
  /** Whether this invite only grants temporary membership. Default: false */
  temporary?: boolean
  /** If true, don't try to reuse similar invite (useful for creating many unique one time use invites). Default: false */
  unique?: boolean
  /** The type of target for this voice channel invite */
  targetType?: TargetTypes
  /** The id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
  targetUserId?: BigString
  /** The id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
  targetApplicationId?: BigString
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Camelize<DiscordEmbed>[] | null
  /** Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
  flags?: MessageFlags | null
  /** The contents of the files being sent/edited */
  files?: FileContent[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: (Pick<Camelize<DiscordAttachment>, 'id'> & Omit<Partial<Camelize<DiscordAttachment>>, 'id'>)[]
  /** The components you would like to have sent in this message */
  components?: MessageComponents
}

/** Additional properties for https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions and https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
export interface GetApplicationCommandPermissionOptions {
  /** Access token of the user. Requires the `applications.commands.permissions.update` scope */
  accessToken: string
  /** Id of the application */
  applicationId: BigString
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string
  /** Base64 128x128 image for the guild icon */
  icon?: string
  /** Verification level */
  verificationLevel?: VerificationLevels
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels
  /** New guild roles (first role is the everyone role) */
  roles?: Camelize<DiscordRole[]>
  /** New guild's channels */
  channels?: Partial<Camelize<DiscordChannel>>[]
  /** Id for afk channel */
  afkChannelId?: string
  /** Afk timeout in seconds */
  afkTimeout?: number
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags
}

export interface CreateGuildRole {
  /** Name of the role, max 100 characters, default: "new role" */
  name?: string
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[]
  /** RGB color value, default: 0 */
  color?: number
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string
}

export interface EditGuildRole {
  /** Name of the role, max 100 characters, default: "new role" */
  name?: string
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[]
  /** RGB color value, default: 0 */
  color?: number
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string
}

export interface ModifyRolePositions {
  /** The role id */
  id: BigString
  /** The sorting position for the role. (roles with the same position are sorted by id) */
  position?: number | null
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export interface ModifyGuild {
  /** Guild name */
  name?: string
  /** Verification level */
  verificationLevel?: VerificationLevels | null
  /** Default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels | null
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels | null
  /** Id for afk channel */
  afkChannelId?: BigString | null
  /** Afk timeout in seconds */
  afkTimeout?: number
  /** Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
  icon?: string | null
  /** User id to transfer guild ownership to (must be owner) */
  ownerId?: BigString
  /** Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature) */
  splash?: string | null
  /** Base64 16:9 png/jpeg image for the guild discovery spash (when the server has the `DISCOVERABLE` feature) */
  discoverySplash?: string | null
  /** Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: BigString | null
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags
  /** The id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelId?: BigString | null
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: BigString | null
  /** The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null
  /** Enabled guild features */
  features?: GuildFeatures[]
  /** Whether the guild's boost progress bar should be enabled */
  premiumProgressBarEnabled?: boolean
}

export interface CreateGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name: string
  /** Description of the sticker (empty or 2-100 characters) */
  description: string
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string
  /** The sticker file to upload, must be a PNG, APNG, or Lottie JSON file, max 512 KB */
  file: FileContent
}

export interface EditGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name?: string
  /** Description of the sticker (empty or 2-100 characters) */
  description?: string | null
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags?: string
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
  /** Name of the guild (2-100 characters) */
  name: string
  /** base64 128x128 image for the guild icon */
  icon?: string
}

/** https://discord.com/developers/docs/resources/guild#update-current-user-voice-state */
export interface EditOwnVoiceState {
  /** The id of the channel the user is currently in */
  channelId: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null
}

/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export interface EditUserVoiceState {
  /** The id of the channel the user is currently in */
  channelId: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** The user id to target */
  userId: BigString
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
  style?: 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4'
}

export interface CreateTemplate {
  /** Name which the template should have */
  name: string
  /** Description of the template */
  description?: string
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string
  /** Description of the template (0-120 characters) */
  description?: string | null
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
  /**
   * Number of seconds to delete messages for, between 0 and 604800 (7 days)
   *
   * @default 0
   */
  deleteMessageSeconds?: number
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban-json-params */
export interface CreateGuildBulkBan {
  /** list of user ids to ban (max 200) */
  userIds: BigString[]
  /**
   * Number of seconds to delete messages for, between 0 and 604800 (7 days)
   *
   * @default 0
   */
  deleteMessageSeconds?: number
}

export interface EditBotMemberOptions {
  nick?: string | null
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: BigString[] | null
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: BigString | null
  /** When the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission. The date must be given in a ISO string form. */
  communicationDisabledUntil?: string | null
  /** Set the flags for the guild member. Requires the `MANAGE_GUILD` or `MANAGE_ROLES` or the combination of `MODERATE_MEMBERS` and `KICK_MEMBERS` and `BAN_MEMBERS` */
  flags?: number
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean
  /** Role(s) ro include, default: none */
  includeRoles?: string[]
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding-json-params */
export interface EditGuildOnboarding {
  /** Prompts shown during onboarding and in customize community */
  prompts: Camelize<DiscordGuildOnboardingPrompt>[]
  /** Channel IDs that members get opted into automatically */
  defaultChannelIds: BigString[]
  /** Whether onboarding is enabled in the guild */
  enabled: boolean
  /** Current mode of onboarding */
  mode: DiscordGuildOnboardingMode
}

/** https://discord.com/developers/docs/monetization/entitlements#list-entitlements-query-params */
export interface GetEntitlements {
  /** User ID to look up entitlements for */
  userId?: BigString
  /** Optional list of SKU IDs to check entitlements for */
  skuIds?: BigString[]
  /** Retrieve entitlements before this entitlement ID */
  before?: BigString
  /** Retrieve entitlements after this entitlement ID */
  after?: BigString
  /** Number of entitlements to return, 1-100, default 100 */
  limit?: number
  /** Guild ID to look up entitlements for */
  guildId?: BigString
  /** Whether or not ended entitlements should be omitted. Defaults to false, ended entitlements are included by default. */
  excludeEnded?: boolean
  /** Whether or not deleted entitlements should be omitted. Defaults to true, deleted entitlements are not included by default. */
  excludeDeleted?: boolean
}

/** https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement-json-params */
export interface CreateEntitlement {
  /** ID of the SKU to grant the entitlement to */
  skuId: BigString
  /** ID of the guild or user to grant the entitlement to */
  ownerId: BigString
  /** The type of entitlement, guild subscription or user subscription */
  ownerType: CreateEntitlementOwnerType
}

/** From the description of CreateEntitlement#ownerType on discord docs */
export enum CreateEntitlementOwnerType {
  /** Guild subscription */
  GuildSubscription = 1,
  /** User subscription */
  UserSubscription = 2,
}

export interface EditApplication {
  /** Default custom authorization URL for the app, if enabled */
  customInstallUrl?: string
  /** Description of the app */
  description?: string
  /** Role connection verification URL for the app */
  roleConnectionsVerificationUrl?: string
  /** Settings for the app's default in-app authorization link, if enabled */
  installParams?: DiscordInstallParams
  /** Default scopes and permissions for each supported installation context. */
  integrationTypesConfig?: DiscordApplicationIntegrationType
  /**
   * App's public flags
   *
   * @remarks
   * Only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`) can be updated via the API.
   */
  flags?: ApplicationFlags
  /** Icon for the app */
  icon?: string | null
  /** Default rich presence invite cover image for the app */
  coverImage?: string | null
  /**
   * Interactions endpoint URL for the app
   *
   * @remarks
   * To update an Interactions endpoint URL via the API, the URL must be valid
   */
  interactionEndpointUrl?: string
  /**
   * List of tags describing the content and functionality of the app (max of 20 characters per tag)
   *
   * @remarks
   * There can only be a max of 5 tags
   */
  tags?: string[]
  /** Event webhook URL for the app to receive webhook events */
  eventWebhooksUrl?: string
  /** If webhook events are enabled for the app. 1 to disable, and 2 to enable. */
  eventWebhooksStatus: DiscordApplicationEventWebhookStatus
  /** List of Webhook event types the app subscribes to */
  eventWebhooksTypes?: DiscordWebhookEventType[]
}

/** https://discord.com/developers/docs/resources/poll#poll-create-request-object */
export interface CreatePoll {
  /** The question of the poll. Only `text` is supported. */
  question: Camelize<DiscordPollMedia>
  /** Each of the answers available in the poll, up to 10 */
  answers: Omit<Camelize<DiscordPollAnswer>, 'answerId'>[]
  /**
   * Number of hours the poll should be open for
   *
   * @remarks
   * up to 32 days
   *
   * @default 24
   */
  duration: number
  /**
   * Whether a user can select multiple answers
   *
   * @default false
   */
  allowMultiselect: boolean
  /** The layout type of the poll */
  layoutType?: DiscordPollLayoutType
}

/** https://discord.com/developers/docs/resources/poll#get-answer-voters-query-string-params */
export interface GetPollAnswerVotes {
  /** Get users after this user ID */
  after?: BigString
  /**
   * Max number of users to return (1-100)
   *
   * @default 25
   */
  limit?: number
}

/** https://discord.com/developers/docs/resources/subscription#query-string-params */
export interface ListSkuSubscriptionsOptions {
  /** List subscriptions before this ID */
  before?: BigString
  /** List subscriptions after this ID */
  after?: BigString
  /** Number of results to return (1-100) */
  limit?: number
  /** User ID for which to return subscriptions. Required except for OAuth queries. */
  userId?: BigString
}

/** https://discord.com/developers/docs/resources/soundboard#send-soundboard-sound-json-params */
export interface SendSoundboardSound {
  /** The id of the soundboard sound to play */
  soundId: BigString
  /** The id of the guild the soundboard sound is from, required to play sounds from different servers */
  sourceGuildId?: BigString
}

/** https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound-json-params */
export interface CreateGuildSoundboardSound {
  /** Name of the soundboard sound (2-32 characters) */
  name: string
  /** The mp3 or ogg sound data, base64 encoded, similar to image data */
  sound: string
  /** The volume of the soundboard sound, from 0 to 1, defaults to 1 */
  volume?: number | null
  /** The id of the custom emoji for the soundboard sound */
  emojiId?: BigString | null
  /** The unicode character of a standard emoji for the soundboard sound */
  emojiName?: string | null
}

/** https://canary.discord.com/developers/docs/resources/soundboard#modify-guild-soundboard-sound-json-params */
export interface ModifyGuildSoundboardSound {
  /** Name of the soundboard sound (2-32 characters) */
  name: string
  /** The volume of the soundboard sound, from 0 to 1, defaults to 1 */
  volume: number | null
  /** The id of the custom emoji for the soundboard sound */
  emojiId: BigString | null
  /** The unicode character of a standard emoji for the soundboard sound */
  emojiName: string | null
}

export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}
