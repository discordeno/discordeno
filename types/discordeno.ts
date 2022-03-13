import { Application } from "../transformers/application.ts";
import { Attachment } from "../transformers/attachment.ts";
import { SelectOption } from "../transformers/component.ts";
import { Embed } from "../transformers/embed.ts";
import { Member, User } from "../transformers/member.ts";
import { EmojiToggles } from "../transformers/toggles/emoji.ts";
import {
  BaseActivityAssets,
  BaseActivityButton,
  BaseActivityEmoji,
  BaseActivityParty,
  BaseActivitySecrets,
  BaseActivityTimestamps,
  BaseAllowedMentions,
  BaseClientStatus,
  BaseEmoji,
  BaseOverwrite,
  BaseStageInstance,
  BaseTeamMember,
  BaseThreadMemberBase,
  BaseThreadMetadata,
  BaseWelcomeScreen,
  BaseWelcomeScreenChannel,
  ButtonStyles,
  ChannelTypes,
  InviteTargetTypes,
  MessageComponentTypes,
  PermissionStrings,
  TextStyles,
} from "./shared.ts";

/**
 * https://discord.com/developers/docs/reference#image-formatting
 * json is only for stickers
 */
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "json";

/** https://discord.com/developers/docs/reference#image-formatting */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

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
