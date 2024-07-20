import type { Bot, Component } from '../index.js'
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
