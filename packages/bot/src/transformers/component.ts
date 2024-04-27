import type { ButtonStyles, ChannelTypes, MessageComponentTypes, SelectOption, TextStyles } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { DiscordComponent } from '../typings.js'

export function transformComponent(bot: Bot, payload: DiscordComponent): Component {
  const component = {
    type: payload.type,
    customId: payload.custom_id,
    disabled: payload.disabled,
    style: payload.style,
    label: payload.label,
    emoji: payload.emoji
      ? {
          id: payload.emoji.id ? bot.transformers.snowflake(payload.emoji.id) : undefined,
          name: payload.emoji.name,
          animated: payload.emoji.animated,
        }
      : undefined,
    url: payload.url,
    channelTypes: payload.channel_types,
    options: payload.options?.map((option) => ({
      label: option.label,
      value: option.value,
      description: option.description,
      emoji: option.emoji
        ? {
            id: option.emoji.id ? bot.transformers.snowflake(option.emoji.id) : undefined,
            name: option.emoji.name,
            animated: option.emoji.animated,
          }
        : undefined,
      default: option.default,
    })),
    placeholder: payload.placeholder,
    minValues: payload.min_values,
    maxValues: payload.max_values,
    minLength: payload.min_length,
    maxLength: payload.max_length,
    value: payload.value,
    components: payload.components?.map((component) => bot.transformers.component(bot, component)),
  }

  return bot.transformers.customizers.component(bot, payload, component)
}

export interface Component {
  /** component type */
  type: MessageComponentTypes
  /** a developer-defined identifier for the component, max 100 characters */
  customId?: string
  /** whether this component is required to be filled, default true */
  required?: boolean
  /** whether the component is disabled, default false */
  disabled?: boolean
  /** For different styles/colors of the buttons */
  style?: ButtonStyles | TextStyles
  /** text that appears on the button (max 80 characters) */
  label?: string
  /** the dev-define value of the option, max 100 characters for select or 4000 for input. */
  value?: string
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
  /** List of channel types to include in a channel select menu options list */
  channelTypes?: ChannelTypes[]
  /** The choices! Maximum of 25 items. */
  options?: SelectOption[]
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** The minimum input length for a text input. Between 0-4000. */
  minLength?: number
  /** The maximum input length for a text input. Between 1-4000. */
  maxLength?: number
  /** a list of child components */
  components?: Component[]
}
