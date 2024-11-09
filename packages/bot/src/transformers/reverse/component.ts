import { type DiscordButtonComponent, type DiscordMessageComponent, MessageComponentTypes, type TextStyles } from '@discordeno/types'
import type { Bot, ButtonStyles, Component, DiscordActionRow, DiscordInputTextComponent, DiscordSelectMenuComponent } from '../../index.js'

export function transformComponentToDiscordComponent(bot: Bot, payload: Component): DiscordMessageComponent {
  // This switch should include all cases
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      return transformActionRow(bot, payload)
    case MessageComponentTypes.Button:
      return transformButtonComponent(bot, payload)
    case MessageComponentTypes.InputText:
      return transformInputTextComponent(bot, payload)
    case MessageComponentTypes.SelectMenu:
    case MessageComponentTypes.SelectMenuChannels:
    case MessageComponentTypes.SelectMenuRoles:
    case MessageComponentTypes.SelectMenuUsers:
    case MessageComponentTypes.SelectMenuUsersAndRoles:
      return transformSelectMenuComponent(bot, payload)
  }
}

function transformActionRow(bot: Bot, payload: Component): DiscordActionRow {
  return {
    type: MessageComponentTypes.ActionRow,
    // The actionRow.components type is kinda annoying, so we need a cast for this
    components: (payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) ?? []) as DiscordActionRow['components'],
  }
}

function transformButtonComponent(bot: Bot, payload: Component): DiscordButtonComponent {
  // Since Component is a merge of all components, some casts are necessary
  return {
    type: MessageComponentTypes.Button,
    style: payload.style as ButtonStyles,
    custom_id: payload.customId,
    disabled: payload.disabled,
    emoji: payload.emoji
      ? {
          id: payload.emoji.id ? bot.transformers.reverse.snowflake(payload.emoji.id) : undefined,
          name: payload.emoji.name,
          animated: payload.emoji.animated,
        }
      : undefined,
    label: payload.label,
    url: payload.url,
    sku_id: payload.skuId ? bot.transformers.reverse.snowflake(payload.skuId) : undefined,
  }
}

function transformInputTextComponent(_bot: Bot, payload: Component): DiscordInputTextComponent {
  // Since Component is a merge of all components, some casts are necessary
  return {
    type: MessageComponentTypes.InputText,
    style: payload.style as TextStyles,
    custom_id: payload.customId!,
    label: payload.label!,
    value: payload.value,
    max_length: payload.maxLength,
    min_length: payload.minLength,
    placeholder: payload.placeholder,
    required: payload.required,
  }
}

function transformSelectMenuComponent(bot: Bot, payload: Component): DiscordSelectMenuComponent {
  return {
    type: payload.type as DiscordSelectMenuComponent['type'],
    custom_id: payload.customId!,
    channel_types: payload.channelTypes,
    default_values: payload.defaultValues?.map((defaultValue) => ({
      id: bot.transformers.reverse.snowflake(defaultValue.id),
      type: defaultValue.type,
    })),
    disabled: payload.disabled,
    max_values: payload.maxValues,
    min_values: payload.minValues,
    options: payload.options?.map((option) => ({
      label: option.label,
      value: option.value,
      description: option.description,
      emoji: option.emoji
        ? {
            id: option.emoji.id ? bot.transformers.reverse.snowflake(option.emoji.id) : undefined,
            name: option.emoji.name,
            animated: option.emoji.animated,
          }
        : undefined,
      default: option.default,
    })),
    placeholder: payload.placeholder,
  }
}
