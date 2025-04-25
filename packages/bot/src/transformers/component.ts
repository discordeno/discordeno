import {
  type DiscordActionRow,
  type DiscordButtonComponent,
  type DiscordFileComponent,
  type DiscordMediaGalleryComponent,
  type DiscordMessageComponent,
  type DiscordSectionComponent,
  type DiscordSelectMenuComponent,
  type DiscordSeparatorComponent,
  type DiscordTextDisplayComponent,
  type DiscordTextInputComponent,
  type DiscordThumbnailComponent,
  MessageComponentTypes,
} from '@discordeno/types'
import type {
  Bot,
  Component,
  DiscordContainerComponent,
  DiscordMediaGalleryItem,
  DiscordUnfurledMediaItem,
  MediaGalleryItem,
  UnfurledMediaItem,
} from '../index.js'

export function transformComponent(bot: Bot, payload: DiscordMessageComponent): Component {
  let component: Component

  // This switch is exhaustive, so we dont need the default case and TS does not error out for the un-initialized component variable
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      component = transformActionRow(bot, payload)
      break
    case MessageComponentTypes.Button:
      component = transformButtonComponent(bot, payload)
      break
    case MessageComponentTypes.Container:
      component = transformContainerComponent(bot, payload)
      break
    case MessageComponentTypes.InputText:
      component = transformInputTextComponent(bot, payload)
      break
    case MessageComponentTypes.SelectMenu:
    case MessageComponentTypes.SelectMenuChannels:
    case MessageComponentTypes.SelectMenuRoles:
    case MessageComponentTypes.SelectMenuUsers:
    case MessageComponentTypes.SelectMenuUsersAndRoles:
      component = transformSelectMenuComponent(bot, payload)
      break
    case MessageComponentTypes.Section:
      component = transformSectionComponent(bot, payload)
      break
    case MessageComponentTypes.Thumbnail:
      component = transformThumbnailComponent(bot, payload)
      break
    case MessageComponentTypes.MediaGallery:
      component = transformMediaGalleryComponent(bot, payload)
      break
    case MessageComponentTypes.File:
      component = transformFileComponent(bot, payload)
      break
    case MessageComponentTypes.Separator:
    case MessageComponentTypes.TextDisplay:
      component = keepAsIs(bot, payload)
      break
  }

  return bot.transformers.customizers.component(bot, payload, component)
}

export function transformUnfurledMediaItem(bot: Bot, payload: DiscordUnfurledMediaItem): UnfurledMediaItem {
  const mediaItem: UnfurledMediaItem = {
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height,
    width: payload.width,
    contentType: payload.content_type,
  }

  return bot.transformers.customizers.unfurledMediaItem(bot, payload, mediaItem)
}

export function transformMediaGalleryItem(bot: Bot, payload: DiscordMediaGalleryItem): MediaGalleryItem {
  const mediaItem: MediaGalleryItem = {
    media: bot.transformers.unfurledMediaItem(bot, payload.media),
    description: payload.description,
    spoiler: payload.spoiler,
  }

  return bot.transformers.customizers.mediaGalleryItem(bot, payload, mediaItem)
}

function transformActionRow(bot: Bot, payload: DiscordActionRow): Component {
  return {
    type: MessageComponentTypes.ActionRow,
    id: payload.id,
    components: payload.components.map((component) => bot.transformers.component(bot, component)),
  }
}

function transformContainerComponent(bot: Bot, payload: DiscordContainerComponent): Component {
  return {
    type: MessageComponentTypes.Container,
    id: payload.id,
    accentColor: payload.accent_color ?? undefined,
    spoiler: payload.spoiler,
    components: payload.components.map((component) => bot.transformers.component(bot, component)),
  }
}

function transformButtonComponent(bot: Bot, payload: DiscordButtonComponent): Component {
  return {
    type: MessageComponentTypes.Button,
    id: payload.id,
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

function transformInputTextComponent(_bot: Bot, payload: DiscordTextInputComponent): Component {
  return {
    type: MessageComponentTypes.InputText,
    id: payload.id,
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
    id: payload.id,
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

function transformSectionComponent(bot: Bot, payload: DiscordSectionComponent): Component {
  return {
    type: MessageComponentTypes.Section,
    id: payload.id,
    components: payload.components.map((component) => bot.transformers.component(bot, component)),
    accessory: bot.transformers.component(bot, payload.accessory),
  }
}

function transformThumbnailComponent(bot: Bot, payload: DiscordThumbnailComponent): Component {
  return {
    type: MessageComponentTypes.Thumbnail,
    id: payload.id,
    media: bot.transformers.unfurledMediaItem(bot, payload.media),
    description: payload.description,
    spoiler: payload.spoiler,
  }
}

function transformMediaGalleryComponent(bot: Bot, payload: DiscordMediaGalleryComponent): Component {
  return {
    type: MessageComponentTypes.MediaGallery,
    id: payload.id,
    items: payload.items.map((media) => bot.transformers.mediaGalleryItem(bot, media)),
  }
}

function transformFileComponent(bot: Bot, payload: DiscordFileComponent): Component {
  return {
    type: MessageComponentTypes.File,
    id: payload.id,
    file: bot.transformers.unfurledMediaItem(bot, payload.file),
    spoiler: payload.spoiler,
  }
}

function keepAsIs(_bot: Bot, payload: DiscordTextDisplayComponent | DiscordSeparatorComponent): Component {
  return payload
}
