import { type DiscordButtonComponent, type DiscordMessageComponent, MessageComponentTypes, type TextStyles } from '@discordeno/types'
import type {
  Bot,
  ButtonStyles,
  Component,
  DiscordActionRow,
  DiscordContainerComponent,
  DiscordFileComponent,
  DiscordMediaGalleryComponent,
  DiscordMediaGalleryItem,
  DiscordSectionComponent,
  DiscordSelectMenuComponent,
  DiscordTextDisplayComponent,
  DiscordTextInputComponent,
  DiscordThumbnailComponent,
  DiscordUnfurledMediaItem,
  MediaGalleryItem,
  UnfurledMediaItem,
} from '../../index.js'

export function transformComponentToDiscordComponent(bot: Bot, payload: Component): DiscordMessageComponent {
  // This switch should include all cases
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      return transformActionRow(bot, payload)
    case MessageComponentTypes.Button:
      return transformButtonComponent(bot, payload)
    case MessageComponentTypes.Container:
      return transformContainerComponent(bot, payload)
    case MessageComponentTypes.InputText:
      return transformInputTextComponent(bot, payload)
    case MessageComponentTypes.SelectMenu:
    case MessageComponentTypes.SelectMenuChannels:
    case MessageComponentTypes.SelectMenuRoles:
    case MessageComponentTypes.SelectMenuUsers:
    case MessageComponentTypes.SelectMenuUsersAndRoles:
      return transformSelectMenuComponent(bot, payload)
    case MessageComponentTypes.Section:
      return transformSectionComponent(bot, payload)
    case MessageComponentTypes.File:
      return transformFileComponent(bot, payload)
    case MessageComponentTypes.MediaGallery:
      return transformMediaGalleryComponent(bot, payload)
    case MessageComponentTypes.Thumbnail:
      return transformThumbnailComponent(bot, payload)
    case MessageComponentTypes.Separator:
    case MessageComponentTypes.TextDisplay:
      // As of now they are compatible
      return payload as DiscordMessageComponent
  }
}

export function transformUnfurledMediaItemToDiscordUnfurledMediaItem(_bot: Bot, payload: UnfurledMediaItem): DiscordUnfurledMediaItem {
  return {
    url: payload.url,
    proxy_url: payload.proxyUrl,
    height: payload.height,
    width: payload.width,
    content_type: payload.contentType,
  }
}

export function transformMediaGalleryItemToDiscordMediaGalleryItem(bot: Bot, payload: MediaGalleryItem): DiscordMediaGalleryItem {
  return {
    media: bot.transformers.reverse.unfurledMediaItem(bot, payload.media),
    description: payload.description,
    spoiler: payload.spoiler,
  }
}

function transformActionRow(bot: Bot, payload: Component): DiscordActionRow {
  return {
    type: MessageComponentTypes.ActionRow,
    id: payload.id,
    // The actionRow.components type is kinda annoying, so we need a cast for this
    components: (payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) ?? []) as DiscordActionRow['components'],
  }
}

function transformContainerComponent(bot: Bot, payload: Component): DiscordContainerComponent {
  return {
    type: MessageComponentTypes.Container,
    id: payload.id,
    accent_color: payload.accentColor,
    spoiler: payload.spoiler,
    components: (payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) ??
      []) as DiscordContainerComponent['components'],
  }
}

function transformButtonComponent(bot: Bot, payload: Component): DiscordButtonComponent {
  // Since Component is a merge of all components, some casts are necessary
  return {
    type: MessageComponentTypes.Button,
    id: payload.id,
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

function transformInputTextComponent(_bot: Bot, payload: Component): DiscordTextInputComponent {
  // Since Component is a merge of all components, some casts are necessary
  return {
    type: MessageComponentTypes.InputText,
    id: payload.id,
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
    id: payload.id,
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

function transformSectionComponent(bot: Bot, payload: Component): DiscordSectionComponent {
  return {
    type: MessageComponentTypes.Section,
    id: payload.id,
    components: payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) as DiscordTextDisplayComponent[],
    accessory: (payload.accessory ? bot.transformers.reverse.component(bot, payload.accessory) : undefined) as DiscordSectionComponent['accessory'],
  }
}

function transformFileComponent(bot: Bot, payload: Component): DiscordFileComponent {
  return {
    type: MessageComponentTypes.File,
    id: payload.id,
    file: bot.transformers.reverse.unfurledMediaItem(bot, payload.file!),
    spoiler: payload.spoiler,
  }
}

function transformMediaGalleryComponent(bot: Bot, payload: Component): DiscordMediaGalleryComponent {
  return {
    type: MessageComponentTypes.MediaGallery,
    id: payload.id,
    items: payload.items?.map((item) => bot.transformers.reverse.mediaGalleryItem(bot, item)) ?? [],
  }
}

function transformThumbnailComponent(bot: Bot, payload: Component): DiscordThumbnailComponent {
  return {
    type: MessageComponentTypes.Thumbnail,
    id: payload.id,
    media: bot.transformers.reverse.unfurledMediaItem(bot, payload.media!),
    description: payload.description,
    spoiler: payload.spoiler,
  }
}
