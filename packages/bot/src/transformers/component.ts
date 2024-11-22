import {
  type DiscordActionRow,
  type DiscordButtonComponent,
  type DiscordInputTextComponent,
  type DiscordMessageComponent,
  type DiscordSelectMenuComponent,
  MessageComponentTypes,
} from '@discordeno/types'
import type { Bot, Component } from '../index.js'

export function transformComponent(bot: Bot, payload: DiscordMessageComponent): Component {
  let component: Component

  // This switch is exhaustive, so we dont need the default case and TS does not error out for the un-initialized component variable
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      component = transformActionRow(bot, payload)
      break
    case MessageComponentTypes.Button:
      component = transformButtonComponent(bot, payload as DiscordButtonComponent)
      break
    case MessageComponentTypes.InputText:
      component = transformInputTextComponent(bot, payload as DiscordInputTextComponent)
      break
    case MessageComponentTypes.SelectMenu:
    case MessageComponentTypes.SelectMenuChannels:
    case MessageComponentTypes.SelectMenuRoles:
    case MessageComponentTypes.SelectMenuUsers:
    case MessageComponentTypes.SelectMenuUsersAndRoles:
      component = transformSelectMenuComponent(bot, payload as DiscordSelectMenuComponent)
      break
  }

  return bot.transformers.customizers.component(bot, payload, component)
}

function transformActionRow(bot: Bot, payload: DiscordActionRow): Component {
  return {
    type: MessageComponentTypes.ActionRow,
    components: payload.components.map((component) => bot.transformers.component(bot, component)),
  }
}

function transformButtonComponent(bot: Bot, payload: DiscordButtonComponent): Component {
  return {
    type: MessageComponentTypes.Button,
    label: payload.label,
    customId: payload.custom_id,
    style: payload.style,
    emoji: payload.emoji
      ? {
          id: payload.emoji.id ? bot.transformers.snowflake(payload.emoji.id) : undefined,
          name: payload.emoji.name,
          animated: payload.emoji.animated,
        }
      : undefined,
    url: payload.url,
    disabled: payload.disabled,
    skuId: payload.sku_id ? bot.transformers.snowflake(payload.sku_id) : undefined,
  }
}

function transformInputTextComponent(_bot: Bot, payload: DiscordInputTextComponent): Component {
  return {
    type: MessageComponentTypes.InputText,
    style: payload.style,
    required: payload.required,
    customId: payload.custom_id,
    label: payload.label,
    placeholder: payload.placeholder,
    minLength: payload.min_length,
    maxLength: payload.max_length,
    value: payload.value,
  }
}

function transformSelectMenuComponent(bot: Bot, payload: DiscordSelectMenuComponent): Component {
  return {
    type: payload.type,
    customId: payload.custom_id,
    placeholder: payload.placeholder,
    minValues: payload.min_values,
    maxValues: payload.max_values,
    defaultValues: payload.default_values?.map((defaultValue) => ({
      id: bot.transformers.snowflake(defaultValue.id),
      type: defaultValue.type,
    })),
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
    disabled: payload.disabled,
  }
}
