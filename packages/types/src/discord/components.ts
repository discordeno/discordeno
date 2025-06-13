/** Types for: https://discord.com/developers/docs/components/reference */

import type { ChannelTypes } from './channel.js'

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
}

export type DiscordMessageComponents = DiscordMessageComponent[]
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

/** https://discord.com/developers/docs/components/reference#anatomy-of-a-component */
export interface DiscordBaseComponent {
  /** The type of the component */
  type: MessageComponentTypes
  /** 32 bit integer used as an optional identifier for component */
  id?: number
}

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface DiscordActionRow extends DiscordBaseComponent {
  type: MessageComponentTypes.ActionRow

  /**
   * The components in this row
   *
   * @remarks
   * Up to 5 button components, a single select component or a single text input component
   */
  components: (DiscordButtonComponent | DiscordSelectMenuComponent | DiscordTextInputComponent)[]
}

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface DiscordButtonComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Button

  /** For different styles/colors of the buttons */
  style: ButtonStyles
  /**
   * Text that appears on the button
   *
   * @remarks
   * A label can have a max of 80 characters
   * A button of style {@link ButtonStyles.Premium | Premium} cannot have a label
   */
  label?: string
  /**
   * Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.
   *
   * @remarks
   * A button of style {@link ButtonStyles.Premium | Premium} cannot have an emoji
   */
  emoji?: {
    /** Emoji id */
    id?: string
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /**
   * A dev-defined unique string sent on click (max 100 characters).
   *
   * @remarks
   * A button of style {@link ButtonStyles.Link | Link} or {@link ButtonStyles.Premium | Premium} cannot have a custom_id
   */
  custom_id?: string
  /**
   * Identifier for a purchasable SKU
   *
   * @remarks
   * Buttons of style {@link ButtonStyles.Premium | Premium} must have a sku_id, any other button with a different style can not have a a sku_id
   */
  sku_id?: string
  /**
   * Url for {@link ButtonStyles.Link | link} buttons that can navigate a user to the web.
   *
   * @remarks
   * Buttons of style {@link ButtonStyles.Link | Link} must have an url, any other button with a different style can not have an url
   */
  url?: string
  /** Whether or not this button is disabled */
  disabled?: boolean
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
    | MessageComponentTypes.ChannelSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  custom_id: string
  /** Specified choices in a select menu; Maximum of 25 items. */
  options?: DiscordSelectOption[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  min_values?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  max_values?: number
  /**
   * Whether select menu is disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * List of default values for auto-populated select menu components
   *
   * @remarks
   * The number of default values must be in the range defined by min_values and max_values
   */
  default_values?: DiscordSelectMenuDefaultValue[]
  /** List of channel types to include in a channel select menu options list */
  channel_types?: ChannelTypes[]
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface DiscordSelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string
  /** An additional description of the option. Maximum 50 characters. */
  description?: string
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: string
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** Will render this option as already-selected by default. */
  default?: boolean
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface DiscordTextInputComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.TextInput

  /** The customId of the InputText */
  custom_id: string
  /** The style of the InputText */
  style: TextStyles
  /** The label of the InputText (max 45 characters) */
  label: string
  /** The minimum length of the text the user has to provide */
  min_length?: number
  /** The maximum length of the text the user has to provide */
  max_length?: number
  /** whether this component is required to be filled, default true */
  required?: boolean
  /** Pre-filled value for input text. */
  value?: string
  /** The placeholder of the InputText */
  placeholder?: string
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-styles */
export enum TextStyles {
  /** Intended for short single-line text */
  Short = 1,
  /** Intended for much longer inputs */
  Paragraph = 2,
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface DiscordSelectMenuDefaultValue {
  /** ID of a user, role, or channel */
  id: string
  /** Type of value that id represents. */
  type: 'user' | 'role' | 'channel'
}

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface DiscordSectionComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Section

  /** One to three text components */
  components: DiscordTextDisplayComponent[]
  /** A thumbnail or a button component, with a future possibility of adding more compatible components */
  accessory: DiscordButtonComponent | DiscordThumbnailComponent
}

/** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
export interface DiscordTextDisplayComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.TextDisplay

  /** Text that will be displayed similar to a message */
  content: string
}

export interface DiscordThumbnailComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Thumbnail

  /** A url or attachment */
  media: DiscordUnfurledMediaItem
  /** Alt text for the media, max 1024 characters */
  description?: string
  /** Whether the thumbnail should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-structure */
export interface DiscordMediaGalleryComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.MediaGallery

  /** 1 to 10 media gallery items */
  items: DiscordMediaGalleryItem[]
}

/** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure */
export interface DiscordMediaGalleryItem {
  /** A url or attachment */
  media: DiscordUnfurledMediaItem
  /** Alt text for the media, max 1024 characters */
  description?: string
  /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
}

/** https://discord.com/developers/docs/components/reference#file-file-structure */
export interface DiscordFileComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.File

  /** This unfurled media item is unique in that it only supports attachment references using the attachment://<filename> syntax */
  file: DiscordUnfurledMediaItem
  /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
  /** The name of the file. This field is ignored and provided by the API as part of the response */
  name: string
  /** The size of the file in bytes. This field is ignored and provided by the API as part of the response */
  size: number
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure */
export interface DiscordSeparatorComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Separator

  /** Whether a visual divider should be displayed in the component. Defaults to `true` */
  divider?: boolean
  /** Size of separator padding — `1` for small padding, `2` for large padding. Defaults to `1` */
  spacing?: SeparatorSpacingSize
}

/** https://discord.com/developers/docs/components/reference#separator-separator-structure, spacing description */
export enum SeparatorSpacingSize {
  Small = 1,
  Large = 2,
}

/** https://discord.com/developers/docs/components/reference#container-container-structure */
export interface DiscordContainerComponent extends DiscordBaseComponent {
  type: MessageComponentTypes.Container

  /** Components of the type action row, text display, section, media gallery, separator, or file */
  components: Array<
    | DiscordActionRow
    | DiscordTextDisplayComponent
    | DiscordSectionComponent
    | DiscordMediaGalleryComponent
    | DiscordSeparatorComponent
    | DiscordFileComponent
  >
  /** Color for the accent on the container as RGB from 0x000000 to 0xFFFFFF */
  accent_color?: number | null
  /** Whether the container should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
}

/** https://discord.com/developers/docs/components/reference#unfurled-media-item-structure */
export interface DiscordUnfurledMediaItem {
  /** Supports arbitrary urls and attachment://<filename> references */
  url: string
  /** The proxied url of the media item. This field is ignored and provided by the API as part of the response */
  proxy_url?: string
  /** The height of the media item. This field is ignored and provided by the API as part of the response */
  height?: number | null
  /** The width of the media item. This field is ignored and provided by the API as part of the response */
  width?: number | null
  /** The media type of the content. This field is ignored and provided by the API as part of the response */
  content_type?: string
}
