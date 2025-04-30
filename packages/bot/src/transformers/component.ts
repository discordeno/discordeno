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
    case MessageComponentTypes.TextInput:
      component = transformInputTextComponent(bot, payload)
      break
    case MessageComponentTypes.StringSelect:
    case MessageComponentTypes.UserSelect:
    case MessageComponentTypes.RoleSelect:
    case MessageComponentTypes.MentionableSelect:
    case MessageComponentTypes.ChannelSelect:
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
      component = transformSeparatorComponent(bot, payload)
      break
    case MessageComponentTypes.TextDisplay:
      component = transformTextDisplayComponent(bot, payload)
      break
  }

  return bot.transformers.customizers.component(bot, payload, component)
}

export function transformUnfurledMediaItem(bot: Bot, payload: DiscordUnfurledMediaItem): UnfurledMediaItem {
  const props = bot.transformers.desiredProperties.unfurledMediaItem
  const mediaItem = {} as UnfurledMediaItem

  if (props.url && payload.url) mediaItem.url = payload.url
  if (props.proxyUrl && payload.proxy_url) mediaItem.proxyUrl = payload.proxy_url
  if (props.height && payload.height) mediaItem.height = payload.height
  if (props.width && payload.width) mediaItem.width = payload.width
  if (props.contentType && payload.content_type) mediaItem.contentType = payload.content_type

  return bot.transformers.customizers.unfurledMediaItem(bot, payload, mediaItem)
}

export function transformMediaGalleryItem(bot: Bot, payload: DiscordMediaGalleryItem): MediaGalleryItem {
  const props = bot.transformers.desiredProperties.mediaGalleryItem
  const galleryItem = {} as MediaGalleryItem

  if (props.media && payload.media) galleryItem.media = bot.transformers.unfurledMediaItem(bot, payload.media)
  if (props.description && payload.description) galleryItem.description = payload.description
  if (props.spoiler && payload.spoiler) galleryItem.spoiler = payload.spoiler

  return bot.transformers.customizers.mediaGalleryItem(bot, payload, galleryItem)
}

function transformActionRow(bot: Bot, payload: DiscordActionRow): Component {
  const props = bot.transformers.desiredProperties.component
  const actionRow = {} as Component

  if (props.type && payload.type) actionRow.type = payload.type
  if (props.id && payload.id) actionRow.id = payload.id
  if (props.components && payload.components) actionRow.components = payload.components.map((component) => bot.transformers.component(bot, component))

  return actionRow
}

function transformContainerComponent(bot: Bot, payload: DiscordContainerComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const container = {} as Component

  if (props.type && payload.type) container.type = payload.type
  if (props.id && payload.id) container.id = payload.id
  if (props.accentColor && payload.accent_color) container.accentColor = payload.accent_color
  if (props.spoiler && payload.spoiler) container.spoiler = payload.spoiler
  if (props.components && payload.components) container.components = payload.components.map((component) => bot.transformers.component(bot, component))

  return container
}

function transformButtonComponent(bot: Bot, payload: DiscordButtonComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const button = {} as Component

  if (props.type && payload.type) button.type = payload.type
  if (props.id && payload.id) button.id = payload.id
  if (props.label && payload.label) button.label = payload.label
  if (props.customId && payload.custom_id) button.customId = payload.custom_id
  if (props.style && payload.style) button.style = payload.style
  if (props.emoji && payload.emoji) button.emoji = bot.transformers.emoji(bot, payload.emoji)
  if (props.url && payload.url) button.url = payload.url
  if (props.disabled && payload.disabled) button.disabled = payload.disabled
  if (props.skuId && payload.sku_id) button.skuId = bot.transformers.snowflake(payload.sku_id)

  return button
}

function transformInputTextComponent(bot: Bot, payload: DiscordTextInputComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const input = {} as Component

  if (props.type && payload.type) input.type = payload.type
  if (props.id && payload.id) input.id = payload.id
  if (props.style && payload.style) input.style = payload.style
  if (props.required && payload.required) input.required = payload.required
  if (props.customId && payload.custom_id) input.customId = payload.custom_id
  if (props.label && payload.label) input.label = payload.label
  if (props.placeholder && payload.placeholder) input.placeholder = payload.placeholder
  if (props.minLength && payload.min_length) input.minLength = payload.min_length
  if (props.maxLength && payload.max_length) input.maxLength = payload.max_length
  if (props.value && payload.value) input.value = payload.value

  return input
}

function transformSelectMenuComponent(bot: Bot, payload: DiscordSelectMenuComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const select = {} as Component

  if (props.type && payload.type) select.type = payload.type
  if (props.id && payload.id) select.id = payload.id
  if (props.customId && payload.custom_id) select.customId = payload.custom_id
  if (props.placeholder && payload.placeholder) select.placeholder = payload.placeholder
  if (props.minValues && payload.min_values) select.minValues = payload.min_values
  if (props.maxValues && payload.max_values) select.maxValues = payload.max_values
  if (props.defaultValues && payload.default_values)
    select.defaultValues = payload.default_values.map((defaultValue) => ({
      id: bot.transformers.snowflake(defaultValue.id),
      type: defaultValue.type,
    }))
  if (props.channelTypes && payload.channel_types) select.channelTypes = payload.channel_types
  if (props.options && payload.options)
    select.options = payload.options.map((option) => ({
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
    }))
  if (props.disabled && payload.disabled) select.disabled = payload.disabled

  return select
}

function transformSectionComponent(bot: Bot, payload: DiscordSectionComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const section = {} as Component

  if (props.type && payload.type) section.type = payload.type
  if (props.id && payload.id) section.id = payload.id
  if (props.components && payload.components) section.components = payload.components.map((component) => bot.transformers.component(bot, component))
  if (props.accessory && payload.accessory) section.accessory = bot.transformers.component(bot, payload.accessory)

  return section
}

function transformThumbnailComponent(bot: Bot, payload: DiscordThumbnailComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const thumbnail = {} as Component

  if (props.type && payload.type) thumbnail.type = payload.type
  if (props.id && payload.id) thumbnail.id = payload.id
  if (props.media && payload.media) thumbnail.media = bot.transformers.unfurledMediaItem(bot, payload.media)
  if (props.description && payload.description) thumbnail.description = payload.description
  if (props.spoiler && payload.spoiler) thumbnail.spoiler = payload.spoiler

  return thumbnail
}

function transformMediaGalleryComponent(bot: Bot, payload: DiscordMediaGalleryComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const mediaGallery = {} as Component

  if (props.type && payload.type) mediaGallery.type = payload.type
  if (props.id && payload.id) mediaGallery.id = payload.id
  if (props.items && payload.items) mediaGallery.items = payload.items.map((item) => bot.transformers.mediaGalleryItem(bot, item))

  return mediaGallery
}

function transformFileComponent(bot: Bot, payload: DiscordFileComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const file = {} as Component

  if (props.type && payload.type) file.type = payload.type
  if (props.id && payload.id) file.id = payload.id
  if (props.file && payload.file) file.file = bot.transformers.unfurledMediaItem(bot, payload.file)
  if (props.spoiler && payload.spoiler) file.spoiler = payload.spoiler

  return file
}

function transformTextDisplayComponent(bot: Bot, payload: DiscordTextDisplayComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const textDisplay = {} as Component

  if (props.type && payload.type) textDisplay.type = payload.type
  if (props.id && payload.id) textDisplay.id = payload.id
  if (props.content && payload.content) textDisplay.content = payload.content

  return textDisplay
}

function transformSeparatorComponent(bot: Bot, payload: DiscordSeparatorComponent): Component {
  const props = bot.transformers.desiredProperties.component
  const separator = {} as Component

  if (props.type && payload.type) separator.type = payload.type
  if (props.id && payload.id) separator.id = payload.id
  if (props.divider && payload.divider) separator.divider = payload.divider
  if (props.spacing && payload.spacing) separator.spacing = payload.spacing

  return separator
}
