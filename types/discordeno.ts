import { EmojiToggles } from "../transformers/toggles/emoji.ts";
import { MemberToggles } from "../transformers/toggles/member.ts";
import { RoleToggles } from "../transformers/toggles/role.ts";
import { UserToggles } from "../transformers/toggles/user.ts";
import { VoiceStateToggles } from "../transformers/toggles/voice.ts";
import { Collection } from "../util/collection.ts";
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
  EmbedTypes,
  MessageComponentTypes,
  TextStyles,
} from "./shared.ts";

/** https://discord.com/developers/docs/resources/user#user-object */
export interface User extends BaseUser {
  /** The user's id */
  id: bigint;
  /** The user's 4-digit discord-tag converted to a number. */
  discriminator: number;
  /** The user's avatar hash */
  avatar?: bigint;
  /** The boolean value toggles that the user has */
  toggles: UserToggles;
  /** The user's chosen language option */
  locale?: string;
  /** The user's email */
  email?: string;
  /** the user's banner, or null if unset */
  banner?: bigint;
}

/** https://discord.com/developers/docs/resources/user#connection-object */
export interface Connection extends BaseConnection {
  /** An array of partial server integrations */
  integrations?: Integration[];
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface Integration extends BaseIntegration {
  /** User for this integration */
  user?: User;
  /** Integration account information */
  account: IntegrationAccount;
  /** The bot/OAuth2 application for discord integrations */
  application?: IntegrationApplication;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export interface IntegrationAccount extends BaseIntegrationAccount {
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
export interface IntegrationApplication {
  /** The bot associated with this application */
  bot?: User;
}

/**
 * https://discord.com/developers/docs/reference#image-formatting
 * json is only for stickers
 */
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "json";

/** https://discord.com/developers/docs/reference#image-formatting */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export interface TypingStart extends BaseTypingStart {
  /** id of the channel */
  channelId: bigint;
  /** id of the guild */
  guildId?: bigint;
  /** id of the user */
  userId: bigint;
  /** The member who started typing if this happened in a guild */
  member?: Member;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface Member {
  /** The id of this user. */
  id: bigint;
  /** The id of the guild this member is in. */
  guildId: bigint;
  /** The user this guild member represents */
  user?: User;
  /** This users guild nickname */
  nick?: string;
  /** The members custom avatar for this server. */
  avatar?: bigint;
  /** Array of role object ids */
  roles: bigint[];
  /** When the user joined the guild */
  joinedAt: number;
  /** When the user started boosing the guild */
  premiumSince?: number;
  /** The permissions this member has in the guild. Only present on interaction events. */
  permissions?: bigint;
  /** when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
  communicationDisabledUntil?: number;
  /** The boolean toggles values on this member. */
  toggles: MemberToggles;
}

/** https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
export type OAuth2Scopes =
  | "bot"
  | "connections"
  | "email"
  | "identify"
  | "guilds"
  | "guilds.join"
  | "gdm.join"
  | "messages.read"
  | "rpc"
  | "rpc.api"
  | "rpc.activities.write"
  | "rpc.notifications.read"
  | "rpc.voice.read"
  | "rpc.voice.write"
  | "webhook.incomming"
  | "applications.builds.upload"
  | "applications.builds.read"
  | "applications.store.update"
  | "applications.entitlements"
  | "relationships.read"
  | "activities.read"
  | "activities.write"
  | "applications.commands"
  | "applications.commands.update";

/** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure */
export interface GetCurrentAuthorizationInformation {
  /** The current application */
  application: Partial<Application>;
  /** The scopes the user has authorized the application for */
  scopes: OAuth2Scopes[];
  /** When the access token expires */
  expires: string;
  /** The user who has authorized, if the user has authorized with the `identify` scope */
  user?: User;
}

/** https://discord.com/developers/docs/topics/oauth2#application-object */
export interface Application extends BaseApplication {
  /** The id of the app */
  id: bigint;
  /** The icon hash of the app */
  icon?: bigint;
  /** When false only app owner can join the app's bot to guilds */
  botPublic: boolean;
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  botRequireCodeGrant: boolean;
  /** Partial user object containing info on the owner of the application */
  owner?: Partial<User>;
  /** If the application belongs to a team, this will be a list of the members of that team */
  team?: Team;
  /** If this application is a game sold on Discord, this field will be the guild to which it has been linked */
  guildId?: bigint;
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  coverImage?: bigint;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface Team extends BaseTeam {
  /** A hash of the image of the team's icon */
  icon?: bigint;
  /** The unique id of the team */
  id: bigint;
  /** The members of the team */
  members: TeamMember[];
  /** The user id of the current team owner */
  ownerUserId: bigint;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface TeamMember extends BaseTeamMember {
  /** The id of the parent team of which they are a member */
  teamId: bigint;
  /** The avatar, discriminator, id, and username of the user */
  user: Partial<User> & Pick<User, "avatar" | "discriminator" | "id" | "username">;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface WebhookUpdate {
  /** id of the guild */
  guildId: bigint;
  /** id of the channel */
  channelId: bigint;
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook-json-params */
export interface ModifyWebhook {
  /** The default name of the webhook */
  name?: string;
  /** Image for the default webhook avatar */
  avatar?: bigint | null;
  /** The new channel id this webhook should be moved to */
  channelId?: bigint;
  /** The reason you are modifying this webhook */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: bigint;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatarUrl?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** Embedded `rich` content */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** the components to include with the message */
  components?: MessageComponents;
}

export type MessageComponents = ActionRow[];

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

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions extends BaseAllowedMentions {
  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[];
}

export interface FileContent {
  /** The file blob */
  blob: Blob;
  /** The name of the file */
  name: string;
}

export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image for the default webhook avatar */
  avatar?: bigint | null;
  /** The reason you are creating this webhook */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message-jsonform-params */
export interface EditWebhookMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Embedded `rich` content */
  embeds?: Embed[];
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[];
  /** Allowed mentions for the message */
  allowedMentions?: Omit<AllowedMentions, "users" | "roles"> & {
    /** Array of role_ids to mention (Max size of 100) */
    roles?: bigint[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: bigint[];
  };
  /** Attached files to keep */
  attachments?: (Omit<Attachment, "id"> & { id: bigint })[] | null;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface Embed extends BaseEmbed {
  /** Timestamp of embed content */
  timestamp?: number;
  /** Footer information */
  footer?: EmbedFooter;
  /** Image information */
  image?: EmbedImage;
  /** Thumbnail information */
  thumbnail?: EmbedThumbnail;
  /** Video information */
  video?: EmbedVideo;
  /** Provider information */
  provider?: EmbedProvider;
  /** Author information */
  author?: EmbedAuthor;
  /** Fields information */
  fields?: EmbedField[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface EmbedAuthor extends BaseEmbedAuthor {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface EmbedField extends BaseEmbedField {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface EmbedFooter extends BaseEmbedFooter {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface EmbedImage extends BaseEmbedImage {
}

export interface EmbedProvider extends BaseEmbedProvider {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface EmbedThumbnail extends BaseEmbedThumbnail {
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface EmbedVideo extends BaseEmbedVideo {
}

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface Attachment extends BaseAttachment {
  /** Attachment id */
  id: bigint;
  /** Height of file (if image) */
  height?: number;
  /** Width of file (if image) */
  width?: number;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type Webhook = IncomingWebhook | ApplicationWebhook;

export interface IncomingWebhook extends BaseIncomingWebhook {
  /** The id of the webhook */
  id: bigint;
  /** The guild id this webhook is for */
  guildId?: bigint;
  /** The channel id this webhook is for */
  channelId: bigint;
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User;
  /** The default name of the webhook */
  name?: string;
  /** The default user avatar hash of the webhook */
  avatar?: bigint;
  /** The bot/OAuth2 application that created this webhook */
  applicationId?: bigint;
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceGuild?: Partial<Guild>;
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceChannel?: Partial<Channel>;
}

export interface ApplicationWebhook extends Omit<IncomingWebhook, "channelId"> {
  /** The channel id this webhook is for */
  channelId?: bigint;
}

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface Guild extends BaseGuild {
  /** Guild id */
  id: bigint;
  /** The shard id where this guild is */
  shardId: number;
  /** Icon hash */
  icon?: bigint;
  /** Icon hash, returned when in the template object */
  iconHash?: bigint;
  /** Splash hash */
  splash?: bigint;
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash?: bigint;
  /** Id of the owner */
  ownerId: bigint;
  /** Total permissions for the user in the guild (excludes overwrites) */
  permissions?: bigint;
  /** Id of afk channel */
  afkChannelId?: bigint;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: bigint;
  /** Roles in the guild */
  roles: Collection<bigint, Role>;
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>;
  /** Application id of the guild creator if it is bot-created */
  applicationId?: bigint;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId?: bigint;
  /** When this guild was joined at */
  joinedAt?: number;
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates?: Collection<bigint, VoiceState>;
  /** Users in the guild */
  members?: Member[];
  /** Channels in the guild */
  channels?: Channel[];
  /** All active threads in the guild that the current user has permission to view */
  threads?: Channel[];
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<PresenceUpdate>[];
  /** Banner hash */
  banner?: bigint;
  // TODO: Can be optimized to a number but is it worth it?
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: WelcomeScreen;
  /** Stage instances in the guild */
  stageInstances?: StageInstance[];
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface Role extends BaseRole {
  /** Role id */
  id: bigint;
  /** The guild id where this role is */
  guildId: bigint;
  /** The role toggle values for this role. */
  toggles: RoleToggles;
  /** Permission bit set */
  permissions: bigint;
  /** the role emoji hash */
  icon?: bigint;
  /** The id of the bot this role belongs to */
  botId?: bigint;
  /** The id of the integration this role belongs to */
  integrationId?: bigint;
  /** Whether this is the guild's premium subscriber role */
  premiumSubscriber?: boolean;
}

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji extends BaseEmoji {
  /** Emoji id */
  id?: bigint;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** User that created this emoji */
  user?: User;
  /** The boolean toggle values for this emoji */
  toggles: EmojiToggles;
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface VoiceState extends BaseVoiceState {
  /** The guild id this voice state is for */
  guildId?: bigint;
  /** The channel id this user is connected to */
  channelId?: bigint;
  /** The user id this voice state is for */
  userId: bigint;
  /** The guild member this voice state is for */
  member?: MemberWithUser;
  /** The boolean toggle values for this voice state */
  toggles: VoiceStateToggles;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp?: number;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface Channel extends BaseChannel {
  /** The id of the channel */
  id: bigint;
  /** The id of the guild */
  guildId?: bigint;
  /** Explicit permission overwrites for members and roles */
  permissionOverwrites?: bigint[];
  /** Whether the channel is nsfw */
  nsfw?: boolean;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint;
  /** Id of the creator of the group DM or thread */
  ownerId?: bigint;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: bigint;
  /** For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parentId?: bigint;
  /** When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  lastPinTimestamp?: number;
  /** Thread-specifig fields not needed by other channels */
  threadMetadata?: ThreadMetadata;
  /** Thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: ThreadMember;
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a application command interaction */
  permissions?: bigint;
}

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface PresenceUpdate extends BasePresenceUpdate {
  /** Either "idle", "dnd", "online", or "offline" */
  status: number;
  /** The user presence is being updated for */
  user: User;
  /** id of the guild */
  guildId: bigint;
  /** User's current activities */
  activities: Activity[];
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
export interface WelcomeScreen extends BaseWelcomeScreen {
  /** The server description shown in the welcome screen */
  description?: string;
  /** The channels shown in the welcome screen, up to 5 */
  welcomeChannels: WelcomeScreenChannel[];
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface WelcomeScreenChannel extends BaseWelcomeScreenChannel {
  /** The channel's id */
  channelId: bigint;
  /** The emoji id, if the emoji is custom */
  emojiId?: bigint;
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName?: string;
}

/** https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure */
export interface StageInstance extends BaseStageInstance {
  /** The id of this Stage instance */
  id: bigint;
  /** The guild id of the associated Stage channel */
  guildId: bigint;
  /** The id of the associated Stage channel */
  channelId: bigint;
}

export interface Overwrite extends BaseOverwrite {
  /** Role or user id */
  id: bigint;
  /** Permission bit set */
  allow?: bigint;
  /** Permission bit set */
  deny?: bigint;
}

export interface ThreadMetadata extends BaseThreadMetadata {
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archiveTimestamp: number;
  /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  createTimestamp?: number;
}

export interface ThreadMemberBase extends BaseThreadMemberBase {
}

export interface ThreadMember extends BaseThreadMember {
  /** The id of the thread */
  id?: bigint;
  /** The id of the user */
  userId?: bigint;
  /** The time the current user last joined the thread */
  joinTimestamp: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface Activity extends BaseActivity {
  partyId?: bigint;
  partyCurrentSize?: number;
  partyMaxSize?: number;
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
  join?: string;
  spectate?: string;
  match?: string;
  
  /** Unix time (in milliseconds) of when the activity started */
  startedAt?: number;
  /** Unix time (in milliseconds) of when the activity ends */
  endedAt?: number;
  /** Unix timestamps for start and/or end of the game */
  timestamps?: ActivityTimestamps;
  /** Application id for the game */
  applicationId?: bigint;
  /** The emoji used for a custom status */
  emoji?: ActivityEmoji;
  /** Information for the current party of the player */
  party?: ActivityParty;
  /** Images for the presence and their hover texts */
  assets?: ActivityAssets;
  /** Secrets for Rich Presence joining and spectating */
  secrets?: ActivitySecrets;
  /** The custom buttons shown in the Rich Presence (max 2) */
  buttons?: ActivityButton[];
}

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export interface ClientStatus extends BaseClientStatus {
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface ActivityTimestamps extends BaseActivityTimestamps {
  
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface ActivityEmoji extends BaseActivityEmoji {
  /** The id of the emoji */
  id?: bigint;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface ActivityParty extends BaseActivityParty {
  /** The id of the party */
  id?: bigint;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface ActivityAssets extends BaseActivityAssets {
  /** The id for a large asset of the activity, usually a snowflake */
  largeImage?: bigint;
  /** The id for a small asset of the activity, usually a snowflake */
  smallImage?: bigint;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface ActivitySecrets extends BaseActivitySecrets {

}

// https://github.com/discord/discord-api-docs/pull/2219
// TODO: add documentation link
export interface ActivityButton extends BaseActivityButton {

}

export interface MemberWithUser extends Member {
  /** The user object for this member */
  user: User;
}