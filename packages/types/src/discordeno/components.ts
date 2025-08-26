/** Types for: https://discord.com/developers/docs/components/reference */

import type { ChannelTypes } from '../discord/channel.js'
import type {
  ButtonStyles,
  DiscordMediaGalleryItem,
  DiscordUnfurledMediaItem,
  MessageComponentTypes,
  SeparatorSpacingSize,
  TextStyles,
} from '../discord/components.js'
import type { BigString } from '../shared.js'

export type MessageComponents = MessageComponent[]
export type MessageComponent =
  | ActionRow
  | ButtonComponent
  | TextInputComponent
  | StringSelectComponent
  | ChannelSelectComponent
  | RoleSelectComponent
  | UserSelectComponent
  | MentionableSelectComponent
  | SectionComponent
  | TextDisplayComponent
  | ThumbnailComponent
  | MediaGalleryComponent
  | SeparatorComponent
  | ContainerComponent
  | FileComponent

/** https://discord.com/developers/docs/components/reference#anatomy-of-a-component */
export interface BaseComponent {
  /** The type of the component */
  type: MessageComponentTypes
  /** 32 bit integer used as an optional identifier for component */
  id?: number
}

/** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
export interface ActionRow extends BaseComponent {
  type: MessageComponentTypes.ActionRow

  /**
   * The components in this row
   *
   * @remarks
   * Up to 5 button components, a single select component or a single text input component
   */
  components: (
    | ButtonComponent
    | StringSelectComponent
    | UserSelectComponent
    | RoleSelectComponent
    | MentionableSelectComponent
    | ChannelSelectComponent
    | TextInputComponent
  )[]
}

/** https://discord.com/developers/docs/components/reference#button-button-structure */
export interface ButtonComponent extends BaseComponent {
  type: MessageComponentTypes.Button

  /** For different styles/colors of the buttons */
  style: ButtonStyles
  /** for what the button says (max 80 characters) */
  label?: string
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: BigString
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string
  /** Identifier for a purchasable SKU, only available when using premium-style buttons */
  skuId?: BigString
  /**
   * optional url for link-style buttons that can navigate a user to the web.
   *
   * @remarks
   * Only {@link ButtonStyles.Link | Link} buttons can have a url.
   *
   * Maximum 512 characters.
   */
  url?: string
  /** Whether or not this button is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#string-select-string-select-structure */
export interface StringSelectComponent extends BaseComponent {
  type: MessageComponentTypes.StringSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** The choices! Maximum of 25 items. */
  options: SelectOption[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string
  /** An additional description of the option. Maximum 50 characters. */
  description?: string
  // TODO: Make an alias for this type since it is used a few times
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: BigString
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** Will render this option as already-selected by default. */
  default?: boolean
}

/** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
export interface TextInputComponent extends BaseComponent {
  type: MessageComponentTypes.TextInput

  /** The customId of the InputText */
  customId: string
  /** The style of the InputText */
  style: TextStyles
  /** The label of the InputText. Maximum 45 characters */
  label: string
  /** The minimum length of the text the user has to provide */
  minLength?: number
  /** The maximum length of the text the user has to provide */
  maxLength?: number
  /** Whether or not this input is required. */
  required?: boolean
  /** Pre-filled value for input text. */
  value?: string
  /** The placeholder of the InputText */
  placeholder?: string
}

/** https://discord.com/developers/docs/components/reference#user-select-user-select-structure */
export interface UserSelectComponent extends BaseComponent {
  type: MessageComponentTypes.UserSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
export interface SelectMenuDefaultValue {
  /** ID of a user, role, or channel */
  id: BigString
  /** Type of value that id represents. */
  type: 'user' | 'role' | 'channel'
}

/** https://discord.com/developers/docs/components/reference#role-select-role-select-structure */
export interface RoleSelectComponent extends BaseComponent {
  type: MessageComponentTypes.RoleSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-structure */
export interface MentionableSelectComponent extends BaseComponent {
  type: MessageComponentTypes.MentionableSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#channel-select-channel-select-structure */
export interface ChannelSelectComponent extends BaseComponent {
  type: MessageComponentTypes.ChannelSelect

  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** List of channel types to include in the options list */
  channelTypes?: ChannelTypes[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /**
   * List of default values for auto-populated select menu components
   * The number of default values must be in the range defined by minValues and maxValues
   */
  defaultValues?: SelectMenuDefaultValue[]
  /** The minimum number of items that must be selected. Default 1. Between 0-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Max 25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/components/reference#section-section-structure */
export interface SectionComponent extends BaseComponent {
  type: MessageComponentTypes.Section

  /** One to three text components */
  components: TextDisplayComponent[]
  /** A thumbnail or a button component, with a future possibility of adding more compatible components */
  accessory: ButtonComponent | ThumbnailComponent
}

/** https://discord.com/developers/docs/components/reference#text-display */
export interface TextDisplayComponent extends BaseComponent {
  type: MessageComponentTypes.TextDisplay

  /** Text that will be displayed similar to a message */
  content: string
}

/** https://discord.com/developers/docs/components/reference#thumbnail */
export interface ThumbnailComponent extends BaseComponent {
  type: MessageComponentTypes.Thumbnail

  /** A url or attachment */
  media: DiscordUnfurledMediaItem
  /** Alt text for the media */
  description?: string
  /** Whether the thumbnail should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
}

/** https://discord.com/developers/docs/components/reference#media-gallery */
export interface MediaGalleryComponent extends BaseComponent {
  type: MessageComponentTypes.MediaGallery

  /** 1 to 10 media gallery items */
  items: DiscordMediaGalleryItem[]
}

/** https://discord.com/developers/docs/components/reference#file */
export interface FileComponent extends BaseComponent {
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

/** https://discord.com/developers/docs/components/reference#separator */
export interface SeparatorComponent extends BaseComponent {
  type: MessageComponentTypes.Separator

  /** Whether a visual divider should be displayed in the component. Defaults to `true` */
  divider?: boolean
  /** Size of separator padding — `1` for small padding, `2` for large padding. Defaults to `1` */
  spacing?: SeparatorSpacingSize
}

/** https://discord.com/developers/docs/components/reference#container */
export interface ContainerComponent extends BaseComponent {
  type: MessageComponentTypes.Container

  /** Components of the type action row, text display, section, media gallery, separator, or file */
  components: Array<ActionRow | TextDisplayComponent | SectionComponent | MediaGalleryComponent | SeparatorComponent | FileComponent>
  /** Color for the accent on the container as RGB from 0x000000 to 0xFFFFFF */
  accentColor?: number | null
  /** Whether the container should be a spoiler (or blurred out). Defaults to `false` */
  spoiler?: boolean
}
