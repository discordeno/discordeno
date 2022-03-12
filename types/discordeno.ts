import { Application } from "../transformers/application.ts";
import { ApplicationCommandOption } from "../transformers/applicationCommandOption.ts";
import { Attachment } from "../transformers/attachment.ts";
import { Channel } from "../transformers/channel.ts";
import { SelectOption } from "../transformers/component.ts";
import { Embed } from "../transformers/embed.ts";
import { Member, User } from "../transformers/member.ts";
import { Role } from "../transformers/role.ts";
import { EmojiToggles } from "../transformers/toggles/emoji.ts";
import { VoiceStateToggles } from "../transformers/toggles/voice.ts";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  BaseActivityAssets,
  BaseActivityButton,
  BaseActivityEmoji,
  BaseActivityParty,
  BaseActivitySecrets,
  BaseActivityTimestamps,
  BaseAllowedMentions,
  BaseAttachment,
  BaseClientStatus,
  BaseEmoji,
  BaseOverwrite,
  BaseStageInstance,
  BaseTeam,
  BaseTeamMember,
  BaseThreadMember,
  BaseThreadMemberBase,
  BaseThreadMetadata,
  BaseTypingStart,
  BaseVoiceState,
  BaseWelcomeScreen,
  BaseWelcomeScreenChannel,
  ButtonStyles,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  GetGuildWidgetImageStyleOptions,
  InteractionResponseTypes,
  InviteTargetTypes,
  MessageComponentTypes,
  PermissionStrings,
  SystemChannelFlags,
  TextStyles,
VerificationLevels,
} from "./shared.ts";

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
  allowedMentions?: AllowedMentions;
  /** Attached files to keep */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
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

export interface OverwriteReadable extends BaseOverwrite {
  /** Role or user id */
  id: bigint;
  /** Permission bit set */
  allow?: PermissionStrings[];
  /** Permission bit set */
  deny?: PermissionStrings[];
}

export interface ThreadMetadata extends BaseThreadMetadata {
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archiveTimestamp: number;
  /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  createTimestamp?: number;
}

export interface ThreadMemberBase extends BaseThreadMemberBase {
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

// TODO: add docs link
export interface StartThreadBase {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The reason you are creating the thread */
  reason?: string;
}

export interface StartThreadWithoutMessage extends StartThreadBase {
  /** the type of thread to create */
  type: ChannelTypes.GuildNewsThread | ChannelTypes.GuildPublicThread | ChannelTypes.GuildPrivateThread;
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: bigint;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: bigint;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: bigint;
}

export interface CreateChannelInvite {
  /** Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days). Default: 86400 (24 hours) */
  maxAge?: number;
  /** Max number of users or 0 for unlimited. Between 0 and 100. Default: 0 */
  maxUses?: number;
  /** Whether this invite only grants temporary membership. Default: false */
  temporary?: boolean;
  /** If true, don't try to reuse simmilar invite (useful for creating many unique one time use invites). Default: false */
  unique?: boolean;
  /** The type of target for this voice channel invite */
  targetType?: InviteTargetTypes;
  /** The id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
  targetUserId?: string;
  /** The id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
  targetApplicationId?: string;
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: bigint;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  userIds?: bigint[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

export interface CreateMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** Include to make your message a reply */
  messageReference?: {
    /** id of the originating message */
    messageId?: bigint;
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channelId?: bigint;
    /** id of the originating message's guild */
    guildId?: bigint;
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    failIfNotExists: boolean;
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean;
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean;
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: bigint;
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

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** Value of the choice, up to 100 characters if string */
  value: string | number;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null;
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: bigint[] | null;
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null;
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null;
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: bigint | null;
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission */
  communicationDisabledUntil?: number;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /** Style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1000 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The customId you want to use for this modal response. */
  customId?: string;
  /** The title you want to use for this modal response. */
  title?: string;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}
