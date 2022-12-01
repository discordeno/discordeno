import { DiscordComponent } from '@discordeno/types'
import { Bot } from '../../bot.js'
import { Component } from '../component.js'

export function transformComponentToDiscordComponent (bot: Bot, payload: Component): DiscordComponent {
  return {
    type: payload.type,
    custom_id: payload.customId,
    disabled: payload.disabled,
    required: payload.required,
    style: payload.style,
    label: payload.label,
    emoji: (payload.emoji != null)
      ? {
          id: payload.emoji.id?.toString(),
          name: payload.emoji.name,
          animated: payload.emoji.animated
        }
      : undefined,
    url: payload.url,
    options: payload.options?.map((option) => ({
      label: option.label,
      value: option.value,
      description: option.description,
      emoji: (option.emoji != null)
        ? {
            id: option.emoji.id?.toString(),
            name: option.emoji.name,
            animated: option.emoji.animated
          }
        : undefined,
      default: option.default
    })),
    placeholder: payload.placeholder,
    min_values: payload.minValues,
    max_values: payload.maxValues,
    min_length: payload.minLength,
    max_length: payload.maxLength,
    value: payload.value,
    components: payload.components?.map((component) => bot.transformers.reverse.component(bot, component))
  }
}
