/** Types for: https://discord.com/developers/docs/components/reference */

import type { Require } from '../shared.js';
import type { ChannelTypes } from './channel.js';
import type { DiscordEmoji } from './emoji.js';
import type { DiscordInteractionDataResolved } from './interactions.js';

/** https://discord.com/developers/docs/components/reference#component-object-component-types */
export enum MessageComponentTypes {
  /** A container for other components */
  ActionRow = 1,
  /** A button object */
  Button,
  /** A select menu for picking from choices */
  StringSelect,
  /** A text input object */
  TextInput,
  /** Select menu for users */
  UserSelect,
  /** Select menu for roles */
  RoleSelect,
  /** Select menu for users and roles */
  MentionableSelect,
  /** Select menu for channels */
  ChannelSelect,
  /** Container to display text alongside an accessory component */
  Section,
  /** Markdown text */
  TextDisplay,
  /** Small image that can be used as an accessory */
  Thumbnail,
  /** Display images and other media */
  MediaGallery,
  /** Displays an attached file */
  File,
  /** Component to add vertical padding between other components */
  Separator,
  /** Container that visually groups a set of components */
  Container = 17,
  /** Container associating a label and description with a component */
  Label,
  /** Component for uploading files */
  FileUpload,
}

export type DiscordMessageComponents = DiscordMessageComponent[];
export type DiscordMessageComponent =
  | DiscordActionRow
  | DiscordSelectMenuComponent
  | DiscordButtonComponent
  | DiscordTextInputComponent
  | DiscordSectionComponent
  | DiscordTextDisplayComponent
  | DiscordThumbnailComponent
  | DiscordMediaGalleryComponent
  | DiscordSeparatorComponent
  | DiscordContainerComponent
  | DiscordFileComponent
  | DiscordLabelComponent
  | DiscordFileUploadComponent;

export type DiscordMessageComponentFromModalInteractionResponse =
  | DiscordTextInputInteractionResponse
  | DiscordTextDisplayInteractionResponse
  | DiscordLabelInteractionResponse;

export type DiscordMessageComponentFromMessageComponentInteractionResponse =
  | DiscordRoleSelectInteractionResponseFromMessageComponent
  | DiscordUserSelectInteractionResponseFromMessageComponent
  | DiscordStringSelectInteractionResponseFromMessageComponent
  | DiscordChannelSelectInteractionResponseFromMessageComponent
  | DiscordMentionableSelectInteractionResponseFromMessageComponent;

/** https://discord.com/developers/docs/components/reference#anatomy-of-a-component */
export interface DiscordBaseComponent {
  /** The type of the component */
  type: MessageComponentTypes;
  /** 32 bit integer used as an optional identifier for component */
  id?: number;
}

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface DiscordActionRow extends DiscordBaseComponent {
  type: MessageComponentTypes.ActionRow;

  /**
   * The components in this row
   *
   * @remarks
   * Up to 5 button components, a single select component or a single text input component
   *
   * Using a {@link DiscordTextInputComponent} inside the Action Row is deprecated,
   * use a {@link DiscordLabelComponent} for modals
   */
  components: (DiscordButtonComponent | DiscordSelectMenuComponent | DiscordTextInputComponent)[];
}

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface DiscordButtonComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Button;

  /** For different styles/colors of the buttons */
  style: ButtonStyles;
  /**
   * Text that appears on the button
   *
   * @remarks
   * A label can have a max of 80 characters
   * A button of style {@link ButtonStyles.Premium | Premium} cannot have a label
   */
  label?: string;
  /**
   * Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.
   *
   * @remarks
   * A button of style {@link ButtonStyles.Premium | Premium} cannot have an emoji
   */
  emoji?: Pick<DiscordEmoji, 'id' | 'name' | 'animated'>;
  /**
   * A dev-defined unique string sent on click (max 100 characters).
   *
   * @remarks
   * A button of style {@link ButtonStyles.Link | Link} or {@link ButtonStyles.Premium | Premium} cannot have a custom_id
   */
  custom_id?: string;
  /**
   * Identifier for a purchasable SKU
   *
   * @remarks
   * Buttons of style {@link ButtonStyles.Premium | Premium} must have a sku_id, any other button with a different style can not have a a sku_id
   */
  sku_id?: string;
  /**
   * Url for {@link ButtonStyles.Link | link} buttons that can navigate a user to the web.
   *
   * @remarks
   * Buttons of style {@link ButtonStyles.Link | Link} must have an url, any other button with a different style can not have an url
   *
   * Maximum 512 characters.
   */
  url?: string;
  /** Whether or not this button is disabled */
  disabled?: boolean;
}

/** https://discord.com/developers/docs/components/reference#button-button-styles */
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
  /** A blurple button to show a Premium item in the shop */
  Premium,
}

/**
 * https://discord.com/developers/docs/components/reference#string-select
 * https://discord.com/developers/docs/components/reference#user-select
 * https://discord.com/developers/docs/components/reference#role-select
 * https://discord.com/developers/docs/components/reference#mentionable-select
 * https://discord.com/developers/docs/components/reference#channel-select
 */
export interface DiscordSelectMenuComponent extends DiscordBaseComponent {
  type:
    | MessageComponentTypes.StringSelect
    | MessageComponentTypes.UserSelect
    | MessageComponentTypes.RoleSelect
    | MessageComponentTypes.MentionableSelect
    | MessageComponentTypes.ChannelSelect;

  /** A custom identifier for this component. Maximum 100 characters. */
  custom_id: string;
  /** Specified choices in a select menu; Maximum of 25 items. */
  options?: DiscordSelectOption[];
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string;
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  min_values?: number;
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  max_values?: number;
  /**
   * Whether this component is required to be filled
   *
   * @remarks
   * This value is only valid for select menus in modals
   *
   * @default true
   */
  required?: boolean;
  /**
   * Whether select menu is disabled
   *
   * @remarks
   * This value cannot be set for select menus in modals
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * List of default values for auto-populated select menu components
   *
   * @remarks
   * The number of default values must be in the range defined by min_values and max_values
   */
  default_values?: DiscordSelectMenuDefaultValue[];
  /** List of channel types to include in a channel select menu options list */
  channel_types?: ChannelTypes[];
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface DiscordSelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string;
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string;
  /** An additional description of the option. Maximum 50 characters. */
  description?: string;
  /** The id, name, and animated properties of an emoji. */
  emoji?: Pick<DiscordEmoji, 'id' | 'name' | 'animated'>;
  /** Will render this option as already-selected by default. */
  default?: boolean;
}

/** https://discord.com/developers/docs/components/reference#string-select-strings-select-interaction-response-structure */
export interface DiscordStringSelectInteractionResponse {
  /**
   * @remarks
   * This is only returned for interaction responses from modals
   */
  type?: MessageComponentTypes.StringSelect;
  /**
   * @remarks
   * This is only returned for interaction responses from message interactions
   */
  component_type?: MessageComponentTypes.StringSelect;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the string select menu */
  custom_id: string;
  /** The text of the selected options */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-interaction-response-structure */
export type DiscordStringSelectInteractionResponseFromModal = Require<Omit<DiscordStringSelectInteractionResponse, 'component_type'>, 'type'>;
/** https://discord.com/developers/docs/components/reference#string-select-string-select-interaction-response-structure */
export type DiscordStringSelectInteractionResponseFromMessageComponent = Require<
  Omit<DiscordStringSelectInteractionResponse, 'type'>,
  'component_type'
>;

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface DiscordTextInputComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.TextInput;

  /** The customId of the InputText */
  custom_id: string;
  /** The style of the InputText */
  style: TextStyles;
  /**
   * The label of the InputText.
   *
   * @remarks
   * Maximum 45 characters
   *
   * @deprecated Use the `label` and `description` from the {@link DiscordLabelComponent}
   */
  label?: string;
  /** The minimum length of the text the user has to provide */
  min_length?: number;
  /** The maximum length of the text the user has to provide */
  max_length?: number;
  /** whether this component is required to be filled, default true */
  required?: boolean;
  /** Pre-filled value for input text. */
  value?: string;
  /** The placeholder of the InputText */
  placeholder?: string;
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-styles */
export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-interaction-response-structure */
export interface DiscordTextInputInteractionResponse {
  type: MessageComponentTypes.TextInput;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the text input */
  custom_id: string;
  /** The user's input text */
  value: string;
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface DiscordSelectMenuDefaultValue {
  /** ID of a user, role, or channel */
  id: string;
  /** Type of value that id represents. */
  type: 'user' | 'role' | 'channel';
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
export interface DiscordUserSelectInteractionResponse {
  /**
   * @remarks
   * This is only returned for interaction responses from modals
   */
  type?: MessageComponentTypes.UserSelect;
  /**
   * @remarks
   * This is only returned for interaction responses from message interactions
   */
  component_type?: MessageComponentTypes.UserSelect;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the user select */
  custom_id: string;
  /** Resolved entities from selected options */
  resolved: DiscordInteractionDataResolved;
  /** IDs of the selected users */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
export type DiscordUserSelectInteractionResponseFromModal = Require<Omit<DiscordUserSelectInteractionResponse, 'component_type'>, 'type'>;
/** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
export type DiscordUserSelectInteractionResponseFromMessageComponent = Require<Omit<DiscordUserSelectInteractionResponse, 'type'>, 'component_type'>;

/** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
export interface DiscordRoleSelectInteractionResponse {
  /**
   * @remarks
   * This is only returned for interaction responses from modals
   */
  type?: MessageComponentTypes.RoleSelect;
  /**
   * @remarks
   * This is only returned for interaction responses from message interactions
   */
  component_type?: MessageComponentTypes.RoleSelect;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the role select */
  custom_id: string;
  /** Resolved entities from selected options */
  resolved: DiscordInteractionDataResolved;
  /** IDs of the selected roles */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
export type DiscordRoleSelectInteractionResponseFromModal = Require<Omit<DiscordRoleSelectInteractionResponse, 'component_type'>, 'type'>;
/** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
export type DiscordRoleSelectInteractionResponseFromMessageComponent = Require<Omit<DiscordRoleSelectInteractionResponse, 'type'>, 'component_type'>;

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export interface DiscordMentionableSelectInteractionResponse {
  /**
   * @remarks
   * This is only returned for interaction responses from modals
   */
  type?: MessageComponentTypes.MentionableSelect;
  /**
   * @remarks
   * This is only returned for interaction responses from message interactions
   */
  component_type?: MessageComponentTypes.MentionableSelect;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the mentionable select */
  custom_id: string;
  /** Resolved entities from selected options */
  resolved: DiscordInteractionDataResolved;
  /** IDs of the selected mentionables */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export type DiscordMentionableSelectInteractionResponseFromModal = Require<
  Omit<DiscordMentionableSelectInteractionResponse, 'component_type'>,
  'type'
>;
/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export type DiscordMentionableSelectInteractionResponseFromMessageComponent = Require<
  Omit<DiscordMentionableSelectInteractionResponse, 'type'>,
  'component_type'
>;

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
export interface DiscordChannelSelectInteractionResponse {
  /**
   * @remarks
   * This is only returned for interaction responses from modals
   */
  type?: MessageComponentTypes.ChannelSelect;
  /**
   * @remarks
   * This is only returned for interaction responses from message interactions
   */
  component_type?: MessageComponentTypes.ChannelSelect;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The custom id for the channel select */
  custom_id: string;
  /** Resolved entities from selected options */
  resolved: DiscordInteractionDataResolved;
  /** IDs of the selected channels */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
export type DiscordChannelSelectInteractionResponseFromModal = Require<Omit<DiscordChannelSelectInteractionResponse, 'component_type'>, 'type'>;
/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
export type DiscordChannelSelectInteractionResponseFromMessageComponent = Require<
  Omit<DiscordChannelSelectInteractionResponse, 'type'>,
  'component_type'
>;

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface DiscordSectionComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Section;

  /** One to three text components */
  components: DiscordTextDisplayComponent[];
  /** A thumbnail or a button component, with a future possibility of adding more compatible components */
  accessory: DiscordButtonComponent | DiscordThumbnailComponent;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
export interface DiscordTextDisplayComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.TextDisplay;

  /** Text that will be displayed similar to a message */
  content: string;
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-interaction-response-structure */
export interface DiscordTextDisplayInteractionResponse {
  type: MessageComponentTypes.TextDisplay;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
}

export interface DiscordThumbnailComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Thumbnail;

  /** A url or attachment */
  media: DiscordUnfurledMediaItem;
  /** Alt text for the media, max 1024 characters */
  description?: string | null;
  /** Whether the thumbnail should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-structure */
export interface DiscordMediaGalleryComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.MediaGallery;

  /** 1 to 10 media gallery items */
  items: DiscordMediaGalleryItem[];
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure */
export interface DiscordMediaGalleryItem {
  /** A url or attachment */
  media: DiscordUnfurledMediaItem;
  /** Alt text for the media, max 1024 characters */
  description?: string | null;
  /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#file-file-structure */
export interface DiscordFileComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.File;

  /** This unfurled media item is unique in that it only supports attachment references using the attachment://<filename> syntax */
  file: DiscordUnfurledMediaItem;
  /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean;
  /** The name of the file. This field is ignored and provided by the API as part of the response */
  name: string;
  /** The size of the file in bytes. This field is ignored and provided by the API as part of the response */
  size: number;
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure */
export interface DiscordSeparatorComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Separator;

  /** Whether a visual divider should be displayed in the component. Defaults to `true` */
  divider?: boolean;
  /** Size of separator padding — `1` for small padding, `2` for large padding. Defaults to `1` */
  spacing?: SeparatorSpacingSize;
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure, spacing description */
export enum SeparatorSpacingSize {
  Small = 1,
  Large = 2,
}

/** https://discord.com/developers/docs/components/reference#container-container-structure */
export interface DiscordContainerComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Container;

  /** Components of the type action row, text display, section, media gallery, separator, or file */
  components: Array<
    | DiscordActionRow
    | DiscordTextDisplayComponent
    | DiscordSectionComponent
    | DiscordMediaGalleryComponent
    | DiscordSeparatorComponent
    | DiscordFileComponent
  >;
  /** Color for the accent on the container as RGB from 0x000000 to 0xFFFFFF */
  accent_color?: number | null;
  /** Whether the container should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean;
}

/** https://discord.com/developers/docs/components/reference#label-label-structure */
export interface DiscordLabelComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Label;

  /**
   * The label text
   *
   * @remarks
   * Max 45 characters.
   */
  label: string;
  /**
   * An optional description text for the label
   *
   * @remarks
   * Max 100 characters.
   */
  description?: string;
  /** The component within the label */
  component: DiscordTextInputComponent | DiscordSelectMenuComponent | DiscordFileUploadComponent;
}

/** https://discord.com/developers/docs/components/reference#label-label-interaction-response-structure */
export interface DiscordLabelInteractionResponse {
  type: MessageComponentTypes.Label;
  /** 32 bit integer used as an optional identifier for component */
  id: number;
  /** The component within the label */
  component:
    | DiscordTextInputInteractionResponse
    | DiscordStringSelectInteractionResponseFromModal
    | DiscordUserSelectInteractionResponseFromModal
    | DiscordRoleSelectInteractionResponseFromModal
    | DiscordMentionableSelectInteractionResponseFromModal
    | DiscordChannelSelectInteractionResponseFromModal
    | DiscordFileUploadInteractionResponse;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-structure */
export interface DiscordFileUploadComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.FileUpload;

  /** The custom id for the file upload */
  custom_id: string;
  /**
   * The minimum number of files that must be uploaded
   *
   * @remarks
   * Between 0-10
   *
   * @default 1
   */
  min_values?: number;
  /** The maximum number of files that can be uploaded
   *
   * @remarks
   * Between 1-10
   *
   * @default 1
   */
  max_values?: number;
  /**
   * Whether this component is required to be filled
   *
   * @default true
   */
  required?: boolean;
}

/** https://discord.com/developers/docs/components/reference#file-upload-file-upload-interaction-response-structure */
export interface DiscordFileUploadInteractionResponse {
  type: MessageComponentTypes.FileUpload;

  /** Unique identifier for the component */
  id: number;
  /** The custom id for the file upload */
  custom_id: string;
  /** IDs of the uploaded files found in the resolved data */
  values: string[];
}

/** https://discord.com/developers/docs/components/reference#unfurled-media-item-structure */
export interface DiscordUnfurledMediaItem {
  /** Supports arbitrary urls and attachment://<filename> references */
  url: string;
  /** The proxied url of the media item. This field is ignored and provided by the API as part of the response */
  proxy_url?: string;
  /** The height of the media item. This field is ignored and provided by the API as part of the response */
  height?: number | null;
  /** The width of the media item. This field is ignored and provided by the API as part of the response */
  width?: number | null;
  /** The media type of the content. This field is ignored and provided by the API as part of the response */
  content_type?: string;
  /** The id of the uploaded attachment. Only present if the media was uploaded as an attachment. This field is ignored and provided by the API as part of the response */
  attachment_id?: string | null;
}
