import type { Camelize, DiscordComponent } from '@discordeno/types'

export function c1amelize1Component (
  payload: DiscordComponent
): Camelize<DiscordComponent> {
  return {
    type: payload.type,
    customId: payload.custom_id,
    disabled: payload.disabled,
    style: payload.style,
    label: payload.label,
    value: payload.value,
    emoji: payload.emoji,
    url: payload.url,
    options: payload.options,
    placeholder: payload.placeholder,
    minValues: payload.min_values,
    maxValues: payload.max_values,
    minLength: payload.min_length,
    maxLength: payload.max_length,
    components: payload.components?.map((component) =>
      c1amelize1Component(component)
    ),
    required: payload.required
  }
}
