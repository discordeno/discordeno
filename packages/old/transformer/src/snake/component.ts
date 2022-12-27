import type { Camelize, DiscordComponent } from '@discordeno/types'

export function s1nakelize1Component (
  payload: Camelize<DiscordComponent>
): DiscordComponent {
  return {
    type: payload.type,
    custom_id: payload.customId,
    disabled: payload.disabled,
    style: payload.style,
    label: payload.label,
    value: payload.value,
    emoji: payload.emoji,
    url: payload.url,
    options: payload.options,
    placeholder: payload.placeholder,
    min_values: payload.minValues,
    max_values: payload.maxValues,
    min_length: payload.minLength,
    max_length: payload.maxLength,
    components: payload.components?.map((component) =>
      s1nakelize1Component(component)
    ),
    required: payload.required
  }
}
