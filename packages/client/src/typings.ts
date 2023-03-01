import type {
  ActivityTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  BigString,
  ButtonStyles,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  GuildFeatures,
  InteractionResponseTypes,
  MessageComponentTypes,
  OverwriteTypes,
  ScheduledEventPrivacyLevel,
  StickerFormatTypes,
  StickerTypes,
  VerificationLevels,
  VideoQualityModes,
  WebhookTypes,
} from '@discordeno/types'
import type Collection from './Collection.js'
import type Message from './Structures/Message.js'
import type Permission from './Structures/Permission.js'
import type CategoryChannel from './Structures/channels/Category.js'
import type NewsChannel from './Structures/channels/News.js'
import type PrivateChannel from './Structures/channels/Private.js'
import type StageChannel from './Structures/channels/Stage.js'
import type TextChannel from './Structures/channels/Text.js'
import type TextVoiceChannel from './Structures/channels/TextVoice.js'
import type ThreadMember from './Structures/channels/threads/Member.js'
import type NewsThreadChannel from './Structures/channels/threads/NewsThread.js'
import type PrivateThreadChannel from './Structures/channels/threads/PrivateThread.js'
import type PublicThreadChannel from './Structures/channels/threads/PublicThread.js'
import type ThreadChannel from './Structures/channels/threads/Thread.js'
import type GuildAuditLogEntry from './Structures/guilds/AuditLogEntry.js'
import type GuildIntegration from './Structures/guilds/Integration.js'
import type Member from './Structures/guilds/Member.js'
import type User from './Structures/users/User.js'
import type { Guild, Invite } from './index.js'
import type Role from './Structures/guilds/Role.js'
import type StageInstance from './Structures/guilds/StageInstance.js'
import type UnavailableGuild from './Structures/guilds/Unavailable.js'
import type AutocompleteInteraction from './Structures/interactions/Autocomplete.js'
import type CommandInteraction from './Structures/interactions/Command.js'
import type ComponentInteraction from './Structures/interactions/Component.js'
import type PingInteraction from './Structures/interactions/Ping.js'
import type UnknownInteraction from './Structures/interactions/Unknown.js'
import type { IncomingHttpHeaders } from 'node:http'

export type ApplicationCommandStructure = ChatInputApplicationCommandStructure | MessageApplicationCommandStructure | UserApplicationCommandStructure
export type ChatInputApplicationCommand = ApplicationCommand<ApplicationCommandTypes.ChatInput>
export type ChatInputApplicationCommandStructure = Omit<ChatInputApplicationCommand, 'id' | 'application_id' | 'guild_id'>
export type MessageApplicationCommand = Omit<ApplicationCommand<ApplicationCommandTypes.Message>, 'description' | 'options'>
export type MessageApplicationCommandStructure = Omit<MessageApplicationCommand, 'id' | 'application_id' | 'guild_id'>
export type UserApplicationCommand = Omit<ApplicationCommand<ApplicationCommandTypes.User>, 'description' | 'options'>
export type UserApplicationCommandStructure = Omit<UserApplicationCommand, 'id' | 'application_id' | 'guild_id'>
export type ApplicationCommandOptions =
  | ApplicationCommandOptionsSubCommand
  | ApplicationCommandOptionsSubCommandGroup
  | ApplicationCommandOptionsWithValue
export type ApplicationCommandOptionsBoolean = ApplicationCommandOption<ApplicationCommandOptionTypes.Boolean>
export type ApplicationCommandOptionsChannel = ApplicationCommandOption<ApplicationCommandOptionTypes.Channel>
export type ApplicationCommandOptionsInteger =
  | ApplicationCommandOptionsIntegerWithAutocomplete
  | ApplicationCommandOptionsIntegerWithoutAutocomplete
  | ApplicationCommandOptionsIntegerWithMinMax
export type ApplicationCommandOptionsIntegerWithAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Integer>,
  'choices' | 'min_value' | 'max_value'
> &
  AutocompleteEnabled
export type ApplicationCommandOptionsIntegerWithoutAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Integer>,
  'autocomplete' | 'min_value' | 'max_value'
> &
  AutocompleteDisabledInteger
export type ApplicationCommandOptionsIntegerWithMinMax = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Integer>,
  'choices' | 'autocomplete'
> &
  AutocompleteDisabledIntegerMinMax
export type ApplicationCommandOptionsMentionable = ApplicationCommandOption<ApplicationCommandOptionTypes.Mentionable>
export type ApplicationCommandOptionsNumber =
  | ApplicationCommandOptionsNumberWithAutocomplete
  | ApplicationCommandOptionsNumberWithoutAutocomplete
  | ApplicationCommandOptionsNumberWithMinMax
export type ApplicationCommandOptionsNumberWithAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Number>,
  'choices' | 'min_value' | 'max_value'
> &
  AutocompleteEnabled
export type ApplicationCommandOptionsNumberWithoutAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Number>,
  'autocomplete' | 'min_value' | 'max_value'
> &
  AutocompleteDisabledInteger
export type ApplicationCommandOptionsNumberWithMinMax = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.Number>,
  'choices' | 'autocomplete'
> &
  AutocompleteDisabledIntegerMinMax
export type ApplicationCommandOptionsRole = ApplicationCommandOption<ApplicationCommandOptionTypes.Role>
export type ApplicationCommandOptionsString = ApplicationCommandOptionsStringWithAutocomplete | ApplicationCommandOptionsStringWithoutAutocomplete
export type ApplicationCommandOptionsStringWithAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.String>,
  'choices'
> &
  AutocompleteEnabled
export type ApplicationCommandOptionsStringWithoutAutocomplete = Omit<
  ApplicationCommandOptionWithChoices<ApplicationCommandOptionTypes.String>,
  'autocomplete'
> &
  AutocompleteDisabled
export type ApplicationCommandOptionsUser = ApplicationCommandOption<ApplicationCommandOptionTypes.User>
export type ApplicationCommandOptionsWithValue =
  | ApplicationCommandOptionsString
  | ApplicationCommandOptionsInteger
  | ApplicationCommandOptionsBoolean
  | ApplicationCommandOptionsUser
  | ApplicationCommandOptionsChannel
  | ApplicationCommandOptionsRole
  | ApplicationCommandOptionsMentionable
  | ApplicationCommandOptionsNumber

export interface Uncached {
  id: string
}

export type AnyChannel = AnyGuildChannel | PrivateChannel | PossiblyUncachedTextable
export type AnyGuildChannel = GuildTextableChannel | AnyVoiceChannel | CategoryChannel | AnyThreadChannel
export type AnyThreadChannel = NewsThreadChannel | PrivateThreadChannel | PublicThreadChannel
export type AnyVoiceChannel = TextVoiceChannel | StageChannel
export type GuildTextableChannel = TextChannel | TextVoiceChannel | NewsChannel
export type PossiblyUncachedTextable = Textable | Uncached
export type TextableChannel = (GuildTextable & GuildTextableChannel) | (ThreadTextable & AnyThreadChannel) | (Textable & PrivateChannel)
export type VideoQualityMode = VideoQualityModes.Auto | VideoQualityModes.Full
export type TextVoiceChannelTypes = ChannelTypes.GuildVoice | ChannelTypes.GuildStageVoice
export type InteractionContent = Pick<WebhookPayload, 'content' | 'embeds' | 'allowedMentions' | 'tts' | 'flags' | 'components' | 'file'>
export type InteractionContentEdit = Pick<WebhookPayload, 'content' | 'embeds' | 'allowedMentions' | 'components' | 'file'>
export type ActionRowComponents = Button | SelectMenu
export type Button = InteractionButton | URLButton
export type MessageContent = string | AdvancedMessageContent
export type MessageContentEdit = string | AdvancedMessageContentEdit
export type ActivityType = ActivityTypes
export type BotActivityType = Exclude<ActivityTypes, ActivityTypes.Custom>
export type Status = 'online' | 'idle' | 'dnd'
export type SelfStatus = Status | 'invisible'
export type AutoArchiveDuration = 60 | 1440 | 4320 | 10080
export type MessageWebhookContent = Pick<WebhookPayload, 'content' | 'embeds' | 'file' | 'allowedMentions' | 'components'>
export interface JSONCache {
  [s: string]: unknown
}
export interface SimpleJSON {
  toJSON: (props?: string[]) => JSONCache
}

export interface ApplicationCommand<T extends ApplicationCommandTypes = ApplicationCommandTypes> {
  application_id: string
  defaultPermission?: boolean
  description: T extends ApplicationCommandTypes.ChatInput ? string : never
  guild_id?: string
  id: string
  name: string
  options?: ApplicationCommandOptions[]
  type: T
}
export interface ApplicationCommandOptionsSubCommand {
  description: string
  name: string
  options?: ApplicationCommandOptionsWithValue[]
  type: ApplicationCommandOptionTypes.SubCommand
}
export interface ApplicationCommandOptionsSubCommandGroup {
  description: string
  name: string
  options?: Array<ApplicationCommandOptionsSubCommand | ApplicationCommandOptionsWithValue>
  type: ApplicationCommandOptionTypes.SubCommandGroup
}
export interface ApplicationCommandOptionWithChoices<
  T extends ApplicationCommandOptionTypes.String | ApplicationCommandOptionTypes.Integer | ApplicationCommandOptionTypes.Number =
    | ApplicationCommandOptionTypes.String
    | ApplicationCommandOptionTypes.Integer
    | ApplicationCommandOptionTypes.Number,
> {
  autocomplete?: boolean
  choices?: ApplicationCommandOptionChoice[]
  description: string
  name: string
  required?: boolean
  type: T
}
export interface ApplicationCommandOption<
  T extends Exclude<ApplicationCommandOptionTypes, ApplicationCommandOptionTypes.SubCommand | ApplicationCommandOptionTypes.SubCommandGroup>,
> {
  channel_types: T extends ApplicationCommandOptionTypes.Channel ? ChannelTypes | undefined : never
  description: string
  name: string
  required?: boolean
  type: T
}
export interface ApplicationCommandPermissions {
  id: BigString
  permission: boolean
  type: ApplicationCommandPermissionTypes
}
export interface AutocompleteEnabled {
  autocomplete: true
}
export interface AutocompleteDisabled {
  autocomplete?: false
}
export interface AutocompleteDisabledInteger extends AutocompleteDisabled {
  min_value?: null
  max_value?: null
}
export interface AutocompleteDisabledIntegerMinMax extends AutocompleteDisabled {
  choices?: null
}
export interface GuildApplicationCommandPermissions {
  application_id: string
  guild_id: string
  id: string
  permissions?: ApplicationCommandPermissions[]
}

export interface ChannelFollow {
  channel_id: string
  webhook_id: string
}
export interface ChannelPosition {
  id: string
  position: number
  lockPermissions?: boolean
  parentID?: string
}
export interface CreateChannelOptions {
  bitrate?: number
  nsfw?: boolean
  parentID?: string
  permissionOverwrites?: Overwrite[]
  position?: number
  rateLimitPerUser?: number
  reason?: string
  topic?: string
  userLimit?: number
}
export interface EditChannelOptions extends Omit<CreateChannelOptions, 'reason'> {
  archived?: boolean
  autoArchiveDuration?: AutoArchiveDuration
  defaultAutoArchiveDuration?: AutoArchiveDuration
  icon?: string
  invitable?: boolean
  locked?: boolean
  name?: string
  ownerID?: string
  rtcRegion?: string | null
  videoQualityMode?: VideoQualityModes
}
export interface EditChannelPositionOptions {
  lockPermissions?: string
  parentID?: string
}
export interface GetMessagesOptions {
  after?: string
  around?: string
  before?: string
  limit?: number
}
export interface GuildTextable extends Textable {
  rateLimitPerUser: number
  createWebhook: (options: { name: string; avatar?: string | null }, reason?: string) => Promise<Webhook>
  deleteMessages: (messageIDs: string[], reason?: string) => Promise<void>
  getWebhooks: () => Promise<Webhook[]>
  purge: (options: PurgeChannelOptions) => Promise<number>
  removeMessageReactionEmoji: (messageID: string, reaction: string) => Promise<void>
  removeMessageReactions: (messageID: string) => Promise<void>
}
export interface PartialChannel {
  bitrate?: number
  id: string
  name?: string
  nsfw?: boolean
  parent_id?: number
  permission_overwrites?: Overwrite[]
  rate_limit_per_user?: number
  topic?: string
  type: number
  user_limit?: number
}
export interface Pinnable {
  getPins: () => Promise<Message[]>
  pinMessage: (messageID: string) => Promise<void>
  unpinMessage: (messageID: string) => Promise<void>
}
export interface PurgeChannelOptions {
  after?: string
  before?: string
  filter?: (m: Message) => boolean
  limit: number
  reason?: string
}
export interface Textable {
  id: string
  lastMessageID: string
  messages: Collection<string, Message>
  addMessageReaction: (messageID: string, reaction: string) => Promise<void>
  createMessage: (content: MessageContent, file?: FileContent | FileContent[]) => Promise<Message>
  deleteMessage: (messageID: string, reason?: string) => Promise<void>
  editMessage: (messageID: string, content: MessageContentEdit) => Promise<Message>
  getMessage: (messageID: string) => Promise<Message>
  getMessageReaction: (messageID: string, reaction: string, options?: GetMessageReactionOptions) => Promise<User[]>
  getMessages: (options?: GetMessagesOptions) => Promise<Message[]>
  removeMessageReaction: (messageID: string, reaction: string, userID?: string) => Promise<void>
  sendTyping: () => Promise<void>
  unsendMessage: (messageID: string) => Promise<void>
}
export interface ThreadTextable extends Textable, Pinnable {
  lastPinTimestamp?: number
  deleteMessages: (messageIDs: string[], reason?: string) => Promise<void>
  getMembers: () => Promise<ThreadMember[]>
  join: (userID: string) => Promise<void>
  leave: (userID: string) => Promise<void>
  purge: (options: PurgeChannelOptions) => Promise<number>
  removeMessageReactionEmoji: (messageID: string, reaction: string) => Promise<void>
  removeMessageReactions: (messageID: string) => Promise<void>
}
export interface RequestHandlerOptions {
  baseURL?: string
  decodeReasons?: boolean
  disableLatencyCompensation?: boolean
  domain?: string
  latencyThreshold?: number
  ratelimiterOffset?: number
  requestTimeout?: number
}

export interface EmbedAuthorOptions {
  icon_url?: string
  name: string
  url?: string
}
export interface EmbedField {
  inline?: boolean
  name: string
  value: string
}
export interface EmbedFooterOptions {
  icon_url?: string
  text: string
}
export interface EmbedImageOptions {
  url?: string
}
export interface EmbedOptions {
  author?: EmbedAuthorOptions
  color?: number
  description?: string
  fields?: EmbedField[]
  footer?: EmbedFooterOptions
  image?: EmbedImageOptions
  thumbnail?: EmbedImageOptions
  timestamp?: Date | string
  title?: string
  url?: string
}
export interface Emoji extends EmojiBase {
  animated: boolean
  available: boolean
  id: string
  managed: boolean
  require_colons: boolean
  roles: string[]
  user?: PartialUser
}
export interface EmojiBase {
  icon?: string
  name: string
}
export interface EmojiOptions extends Exclude<EmojiBase, 'icon'> {
  image: string
  roles?: string[]
}
export interface PartialEmoji {
  id: string | null
  name: string
  animated?: boolean
}

export interface RequestMembersPromise {
  members: Member[]
  received: number
  res: (value: Member[]) => void
  timeout: number
}
export interface ShardManagerOptions {
  concurrency?: number | 'auto'
}

export interface CreateGuildOptions {
  afkChannelID?: string
  afkTimeout?: number
  channels?: PartialChannel[]
  defaultNotifications?: DefaultMessageNotificationLevels
  explicitContentFilter?: ExplicitContentFilterLevels
  icon?: string
  roles?: PartialRole[]
  systemChannelID: string
  verificationLevel?: VerificationLevels
}
export interface DiscoveryCategory {
  id: number
  is_primary: boolean
  name: {
    default: string
    localizations?: { [lang: string]: string }
  }
}
export interface DiscoveryMetadata {
  category_ids: number[]
  emoji_discoverability_enabled: boolean
  guild_id: string
  keywords: string[] | null
  primary_category_id: number
}
export interface DiscoveryOptions {
  emojiDiscoverabilityEnabled?: boolean
  keywords?: string[]
  primaryCategoryID?: string
  reason?: string
}
export interface DiscoverySubcategoryResponse {
  category_id: number
  guild_id: string
}
export interface GetGuildAuditLogOptions {
  actionType?: number
  before?: string
  limit?: number
  userID?: string
}
export interface GetGuildBansOptions {
  after?: string
  before?: string
  limit?: number
}
export interface GetPruneOptions {
  days?: number
  includeRoles?: string[]
}
export interface GetRESTGuildMembersOptions {
  after?: string
  limit?: number
}
export interface GetRESTGuildsOptions {
  after?: string
  before?: string
  limit?: number
}
export interface GuildAuditLog {
  entries: GuildAuditLogEntry[]
  integrations: GuildIntegration[]
  threads: AnyThreadChannel[]
  users: User[]
  webhooks: Webhook[]
}
export interface GuildBan {
  reason?: string
  user: User
}
export interface GuildOptions {
  afkChannelID?: string
  afkTimeout?: number
  banner?: string
  defaultNotifications?: DefaultMessageNotificationLevels
  description?: string
  discoverySplash?: string
  explicitContentFilter?: ExplicitContentFilterLevels
  features?: GuildFeatures[] 
  icon?: string
  name?: string
  ownerID?: string
  preferredLocale?: string
  publicUpdatesChannelID?: string
  rulesChannelID?: string
  splash?: string
  systemChannelFlags?: number
  systemChannelID?: string
  verificationLevel?: VerificationLevels
}
export interface GuildTemplateOptions {
  name?: string
  description?: string | null
}
export interface GuildVanity {
  code: string | null
  uses: number
}
export interface IntegrationOptions {
  enableEmoticons?: string
  expireBehavior?: string
  expireGracePeriod?: string
}
export interface PruneMemberOptions extends GetPruneOptions {
  computePruneCount?: boolean
  reason?: string
}
export interface VoiceRegion {
  custom: boolean
  deprecated: boolean
  id: string
  name: string
  optimal: boolean
  vip: boolean
}
export interface WelcomeChannel {
  channelID: string
  description: string
  emojiID: string | null
  emojiName: string | null
}
export interface WelcomeScreen {
  description: string
  welcomeChannels: WelcomeChannel[]
}
export interface WelcomeScreenOptions extends WelcomeScreen {
  enabled: boolean
}
export interface Widget {
  channel_id?: string
  enabled: boolean
}
export interface WidgetChannel {
  id: string
  name: string
  position: number
}
export interface WidgetData {
  channels: WidgetChannel[]
  id: string
  instant_invite: string
  members: WidgetMember[]
  name: string
  presence_count: number
}
export interface WidgetMember {
  avatar: string | null
  avatar_url: string
  discriminator: string
  id: string
  status: string
  username: string
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  type: InteractionResponseTypes
  data?: InteractionApplicationCommandCallbackData
}

export interface InteractionApplicationCommandCallbackData {
  content?: string
  tts?: boolean
  embeds?: EmbedOptions[]
  allowedMentions?: AllowedMentions
  file?: FileContent | FileContent[]
  customId?: string
  title?: string
  components?: ActionRow[]
  flags?: number
  choices?: ApplicationCommandOptionChoice[]
}

export interface ApplicationCommandOptionChoice {
  name: string
  value: string | number
}

export interface CreateChannelInviteOptions extends CreateInviteOptions {
  targetApplicationID?: string
  targetType?: InviteTargetTypes
  targetUserID?: string
}
export interface CreateInviteOptions {
  maxAge?: number
  maxUses?: number
  temporary?: boolean
  unique?: boolean
}
export interface FetchMembersOptions {
  limit?: number
  presences?: boolean
  query?: string
  timeout?: number
  userIDs?: string[]
}
export interface MemberOptions {
  channelID?: string | null
  communicationDisabledUntil?: Date | null
  deaf?: boolean
  mute?: boolean
  nick?: string | null
  roles?: string[]
}
export interface PartialUser {
  accentColor?: number | null
  avatar: string | null
  banner?: string | null
  discriminator: string
  id: string
  username: string
}
export interface RequestGuildMembersOptions extends Omit<FetchMembersOptions, 'userIDs'> {
  nonce: string
  user_ids?: string[]
}
export interface ActionRow {
  components: ActionRowComponents[]
  type: MessageComponentTypes.ActionRow
}
export interface AdvancedMessageContent {
  allowedMentions?: AllowedMentions
  components?: ActionRow[]
  content?: string
  embed?: EmbedOptions
  embeds?: EmbedOptions[]
  flags?: number
  messageReference?: MessageReferenceReply
  stickerIDs?: string[]
  tts?: boolean
}
export interface AdvancedMessageContentEdit extends AdvancedMessageContent {
  file?: FileContent | FileContent[]
}
export interface AllowedMentions {
  /** Whether or not to allow mentioning @everyone */
  everyone?: boolean
  /** Whether or not to allow mentioning the replied user. */
  repliedUser?: boolean
  /** The roles to allow mentioning by default or enable all roles to be able to be mentioned by default. */
  roles?: boolean | string[]
  /** The users to allow mentioning by default or enable all users to be able to be mentioned by default. */
  users?: boolean | string[]
}
export interface ButtonBase {
  disabled?: boolean
  emoji?: Partial<PartialEmoji>
  label?: string
  type: MessageComponentTypes.Button
}
export interface CreateStickerOptions extends Required<Pick<EditStickerOptions, 'name' | 'tags'>> {
  file: FileContent
}
export interface EditStickerOptions {
  description?: string
  name?: string
  tags?: string
}
export interface SelectMenu {
  custom_id: string
  disabled?: boolean
  max_values?: number
  min_values?: number
  options: SelectMenuOptions[]
  placeholder?: string
  type: MessageComponentTypes.SelectMenu
}
export interface SelectMenuOptions {
  default?: boolean
  description?: string
  emoji?: Partial<PartialEmoji>
  label: string
  value: string
}
export interface GetMessageReactionOptions {
  after?: string
  limit?: number
}

export interface InteractionButton extends ButtonBase {
  custom_id: string
  style: Exclude<ButtonStyles, ButtonStyles.Link>
}
export interface FileContent {
  /** The file data. */
  file: Buffer | string
  /** The name of the file, which must include the file suffix. */
  name: string
}
export interface MessageReferenceBase {
  channelID?: string
  guildID?: string
  messageID?: string
}
export interface MessageReferenceReply extends MessageReferenceBase {
  messageID: string
  failIfNotExists?: boolean
}
export interface Sticker extends StickerItems {
  available?: boolean
  description: string
  guild_id?: string
  pack_id?: string
  sort_value?: number
  tags: string
  type: StickerTypes
  user?: User
}
export interface StickerItems {
  id: string
  name: string
  format_type: StickerFormatTypes
}
export interface StickerPack {
  id: string
  stickers: Sticker[]
  name: string
  sku_id: string
  cover_sticker_id?: string
  description: string
  banner_asset_id: string
}
export interface URLButton extends ButtonBase {
  style: ButtonStyles.Link
  url: string
}

export interface Activity<T extends ActivityType = ActivityType> extends ActivityPartial<T> {
  application_id?: string
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
    [key: string]: unknown
  }
  created_at: number
  details?: string
  emoji?: { animated?: boolean; id?: string; name: string }
  flags?: number
  instance?: boolean
  party?: { id?: string; size?: [number, number] }
  secrets?: { join?: string; spectate?: string; match?: string }
  state?: string
  timestamps?: { end?: number; start: number }
  type: T
  [key: string]: unknown
}
export interface ActivityPartial<T extends ActivityType = BotActivityType> {
  name: string
  type?: T
  url?: string
}
export interface ClientPresence {
  activities: Activity[] | null
  afk: boolean
  since: number | null
  status: SelfStatus
}
export interface Overwrite {
  allow: bigint | number
  deny: bigint | number
  id: string
  type: OverwriteTypes
}
export interface PartialRole {
  color?: number
  hoist?: boolean
  id: string
  mentionable?: boolean
  name?: string
  permissions?: number
  position?: number
}
export interface RoleOptions {
  color?: number
  hoist?: boolean
  icon?: string
  mentionable?: boolean
  name?: string
  permissions?: bigint | number | string | Permission
  unicodeEmoji?: string
}
export interface CreateThreadOptions {
  autoArchiveDuration: AutoArchiveDuration
  name: string
}
export interface CreateThreadWithoutMessageOptions {
  name: string
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  rateLimitPerUser?: number | null
  reason?: string
  type: ChannelTypes.AnnouncementThread | ChannelTypes.PublicThread | ChannelTypes.PrivateThread
  invitable?: boolean
}
export interface GetArchivedThreadsOptions {
  before?: Date
  limit?: number
}
export interface ListedChannelThreads<T extends ThreadChannel = AnyThreadChannel> extends ListedGuildThreads<T> {
  hasMore: boolean
}
export interface ListedGuildThreads<T extends ThreadChannel = AnyThreadChannel> {
  members: ThreadMember[]
  threads: T[]
}
export interface JoinVoiceChannelOptions {
  opusOnly?: boolean
  selfDeaf?: boolean
  selfMute?: boolean
  shared?: boolean
}
export interface StageInstanceOptions {
  privacyLevel?: ScheduledEventPrivacyLevel
  topic?: string
}
export interface VoiceStateOptions {
  channelID: string
  requestToSpeakTimestamp?: Date | null
  suppress?: boolean
}
export interface Webhook {
  application_id: string | null
  avatar: string | null
  channel_id: string | null
  guild_id: string | null
  id: string
  name: string
  source_channel?: { id: string; name: string }
  source_guild: { icon: string | null; id: string; name: string }
  token?: string
  type: WebhookTypes
  url?: string
  user?: PartialUser
}
export interface WebhookOptions {
  avatar?: string
  channelID?: string
  name?: string
}
export interface WebhookPayload {
  allowedMentions?: AllowedMentions
  auth?: boolean
  avatarURL?: string
  components?: ActionRow[]
  content?: string
  embed?: EmbedOptions
  embeds?: EmbedOptions[]
  file?: FileContent | FileContent[]
  flags?: number
  threadID?: string
  tts?: boolean
  username?: string
  wait?: boolean
}

export interface OAuthApplicationInfo {
  bot_public: boolean
  bot_require_code_grant: boolean
  description: string
  icon?: string
  id: string
  name: string
  owner: {
    avatar?: string
    discriminator: string
    id: string
    username: string
  }
  team: OAuthTeamInfo | null
}
export interface OAuthTeamInfo {
  icon: string | null
  id: string
  members: OAuthTeamMember[]
  owner_user_id: string
}
export interface OAuthTeamMember {
  membership_state: number
  permissions: string[]
  team_id: string
  user: PartialUser
}
export enum InviteTargetTypes {
  STREAM = 1,
  EMBEDDED_APPLICATION,
}
export const MessageFlags = {
  CROSSPOSTED: 1,
  IS_CROSSPOST: 2,
  SUPPRESS_EMBEDS: 4,
  SOURCE_MESSAGE_DELETED: 8,
  URGENT: 16,
  HAS_THREAD: 32,
  EPHEMERAL: 64,
  LOADING: 128,
}

export interface EventListeners {
  channelCreate: [channel: AnyGuildChannel];
  channelDelete: [channel: AnyChannel];
  channelPinUpdate: [channel: TextableChannel, timestamp: number, oldTimestamp: number];
  channelUpdate: [channel: AnyGuildChannel, oldChannel: any];
  connect: [id: number];
  debug: [message: string, id?: number];
  disconnect: [];
  error: [err: Error, id?: number];
  guildAvailable: [guild: Guild];
  guildBanAdd: [guild: Guild, user: User];
  guildBanRemove: [guild: Guild, user: User];
  guildCreate: [guild: Guild];
  guildDelete: [guild: any];
  guildEmojisUpdate: [guild: any, emojis: Emoji[], oldEmojis: Emoji[] | null];
  guildMemberAdd: [guild: Guild, member: Member];
  guildMemberChunk: [guild: Guild, member: Member[]];
  guildMemberRemove: [guild: Guild, member: Member | any];
  guildMemberUpdate: [guild: Guild, member: Member, oldMember: any | null];
  guildRoleCreate: [guild: Guild, role: Role];
  guildRoleDelete: [guild: Guild, role: Role];
  guildRoleUpdate: [guild: Guild, role: Role, oldRole: any];
  guildScheduledEventCreate: [event: any];
  guildScheduledEventDelete: [event: any];
  guildScheduledEventUpdate: [event: any, oldEvent: any | null];
  guildScheduledEventUserAdd: [event: any, user: User | Uncached];
  guildScheduledEventUserRemove: [event: any, user: User | Uncached];
  guildStickersUpdate: [guild: any, stickers: Sticker[], oldStickers: Sticker[] | null];
  guildUnavailable: [guild: UnavailableGuild];
  guildUpdate: [guild: Guild, oldGuild: any];
  hello: [trace: string[], id: number];
  interactionCreate: [interaction: PingInteraction | CommandInteraction | ComponentInteraction | AutocompleteInteraction | UnknownInteraction];
  inviteCreate: [guild: Guild, invite: Invite];
  inviteDelete: [guild: Guild, invite: Invite];
  messageCreate: [message: Message];
  messageDelete: [message: any];
  messageDeleteBulk: [messages: any[]];
  messageReactionAdd: [message: any, emoji: PartialEmoji, reactor: Member | Uncached];
  messageReactionRemove: [message: any, emoji: PartialEmoji, userID: string];
  messageReactionRemoveAll: [message: any];
  messageReactionRemoveEmoji: [message: any, emoji: PartialEmoji];
  messageUpdate: [message: Message, oldMessage: any | null];
  presenceUpdate: [other: Member, oldPresence: any | null];
  rawREST: [request: any];
  rawWS: [packet: any, id: number];
  ready: [];
  shardPreReady: [id: number];
  stageInstanceCreate: [stageInstance: StageInstance];
  stageInstanceDelete: [stageInstance: StageInstance];
  stageInstanceUpdate: [stageInstance: StageInstance, oldStageInstance: any | null];
  threadCreate: [channel: AnyThreadChannel];
  threadDelete: [channel: AnyThreadChannel];
  threadListSync: [guild: Guild, deletedThreads: Array<AnyThreadChannel | Uncached>, activeThreads: AnyThreadChannel[], joinedThreadsMember: ThreadMember[]];
  threadMembersUpdate: [channel: AnyThreadChannel, addedMembers: ThreadMember[], removedMembers: Array<ThreadMember | Uncached>];
  threadMemberUpdate: [channel: AnyThreadChannel, member: ThreadMember, oldMember: any];
  threadUpdate: [channel: AnyThreadChannel, oldChannel: any | null];
  typingStart: [channel: GuildTextableChannel | Uncached, user: User | Uncached, member: Member]
  | [channel: PrivateChannel | Uncached, user: User | Uncached, member: null];
  unavailableGuildCreate: [guild: UnavailableGuild];
  unknown: [packet: any, id?: number];
  userUpdate: [user: User, oldUser: PartialUser | null];
  voiceChannelJoin: [member: Member, channel: AnyVoiceChannel];
  voiceChannelLeave: [member: Member, channel: AnyVoiceChannel];
  voiceChannelSwitch: [member: Member, newChannel: AnyVoiceChannel, oldChannel: AnyVoiceChannel];
  voiceStateUpdate: [member: Member, oldState: any];
  warn: [message: string, id?: number];
  webhooksUpdate: [data: any];
}

export interface ClientEvents extends EventListeners {
  shardDisconnect: [err: Error | undefined, id: number];
  shardReady: [id: number];
  shardResume: [id: number];
}

export interface HTTPResponse {
  code: number;
  message: string;
  errors?: HTTPResponse
  headers: IncomingHttpHeaders
}
