import { ApplicationCommandOption } from "../transformers/applicationCommandOption.ts";
import { ApplicationCommandOptionChoice } from "../transformers/applicationCommandOptionChoice.ts";
import { Embed } from "../transformers/embed.ts";
import {
  AllowedMentionsTypes,
  ApplicationCommandTypes,
  ButtonStyles,
  InteractionResponseTypes,
  Localization,
  MessageComponentTypes,
  OverwriteTypes,
  PermissionStrings,
  TextStyles,
} from "./shared.ts";

export type MessageComponents = ActionRow[];

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: MessageComponentTypes.ActionRow;
  /** The components in this row */
  components:
    | [SelectMenuComponent | ButtonComponent | InputTextComponent]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
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
    id?: bigint;
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

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface SelectMenuComponent {
  /** SelectMenu Component is of type 3 */
  type: MessageComponentTypes.SelectMenu;
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string;
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number;
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number;
  /** The choices! Maximum of 25 items. */
  options: SelectOption[];
  /** Whether or not this select is disabled */
  disabled?: boolean;
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
    id?: bigint;
    /** Emoji name */
    name?: string;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** Will render this option as already-selected by default. */
  default?: boolean;
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 4 */
  type: MessageComponentTypes.InputText;
  /** The style of the InputText */
  style: TextStyles;
  /** The customId of the InputText */
  customId: string;
  /** The label of the InputText. Maximum 45 characters */
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
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;

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

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string;
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
}

export type CreateApplicationCommand = CreateSlashApplicationCommand | CreateContextApplicationCommand;

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateSlashApplicationCommand {
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string;
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization;
  /** 1-100 character description */
  description: string;
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization;
  /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
  type?: ApplicationCommandTypes;
  /** Parameters for the command */
  options?: ApplicationCommandOption[];
  /** Set of permissions represented as a bit set */
  defaultMemberPermissions?: PermissionStrings[];
  /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dmPermission?: boolean;
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateContextApplicationCommand
  extends Omit<CreateSlashApplicationCommand, "options" | "description" | "descriptionLocalizations"> {
  /** The type of the command */
  type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User;
}

export function isContextApplicationCommand(
  command: CreateApplicationCommand,
): command is CreateContextApplicationCommand {
  return command.type === ApplicationCommandTypes.Message || command.type === ApplicationCommandTypes.User;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** True if this is a TTS message */
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
  /** Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** Autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}

export interface WithReason {
  /** The reason which should be added in the audit logs for doing this action. */
  reason?: string;
}

export interface OverwriteReadable {
  /** Role or user id */
  id: bigint;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** Permission bit set */
  allow?: PermissionStrings[];
  /** Permission bit set */
  deny?: PermissionStrings[];
}
