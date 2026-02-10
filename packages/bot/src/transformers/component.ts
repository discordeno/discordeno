import {
  type DiscordActionRow,
  type DiscordButtonComponent,
  type DiscordContainerComponent,
  type DiscordFileComponent,
  type DiscordFileUploadComponent,
  type DiscordFileUploadInteractionResponse,
  type DiscordLabelComponent,
  type DiscordLabelInteractionResponse,
  type DiscordMediaGalleryComponent,
  type DiscordMediaGalleryItem,
  type DiscordMessageComponent,
  type DiscordMessageComponentFromModalInteractionResponse,
  type DiscordSectionComponent,
  type DiscordSelectMenuComponent,
  type DiscordSeparatorComponent,
  type DiscordStringSelectInteractionResponse,
  type DiscordTextDisplayComponent,
  type DiscordTextDisplayInteractionResponse,
  type DiscordTextInputComponent,
  type DiscordTextInputInteractionResponse,
  type DiscordThumbnailComponent,
  type DiscordUnfurledMediaItem,
  MessageComponentTypes,
} from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Component, MediaGalleryItem, UnfurledMediaItem } from './types.js';

export function transformComponent(
  bot: Bot,
  payload: Partial<DiscordMessageComponent | DiscordMessageComponentFromModalInteractionResponse>,
  extra?: { partial?: boolean },
) {
  let component: SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  // I don't know what we could do with a component without a type, so we just throw an error
  if (!payload.type) {
    throw new Error(`[Component transformer] Received component payload without a type.`);
  }

  // This switch is exhaustive, so we dont need the default case and TS does not error out for the un-initialized component variable
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      component = transformActionRow(bot, payload);
      break;
    case MessageComponentTypes.Button:
      component = transformButtonComponent(bot, payload);
      break;
    case MessageComponentTypes.Container:
      component = transformContainerComponent(bot, payload);
      break;
    case MessageComponentTypes.TextInput:
      component = transformInputTextComponent(bot, payload);
      break;
    case MessageComponentTypes.StringSelect:
    case MessageComponentTypes.UserSelect:
    case MessageComponentTypes.RoleSelect:
    case MessageComponentTypes.MentionableSelect:
    case MessageComponentTypes.ChannelSelect:
      component = transformSelectMenuComponent(bot, payload);
      break;
    case MessageComponentTypes.Section:
      component = transformSectionComponent(bot, payload);
      break;
    case MessageComponentTypes.Thumbnail:
      component = transformThumbnailComponent(bot, payload);
      break;
    case MessageComponentTypes.MediaGallery:
      component = transformMediaGalleryComponent(bot, payload);
      break;
    case MessageComponentTypes.File:
      component = transformFileComponent(bot, payload);
      break;
    case MessageComponentTypes.Separator:
      component = transformSeparatorComponent(bot, payload);
      break;
    case MessageComponentTypes.TextDisplay:
      component = transformTextDisplayComponent(bot, payload);
      break;
    case MessageComponentTypes.Label:
      component = transformLabelComponent(bot, payload);
      break;
    case MessageComponentTypes.FileUpload:
      component = transformFileUploadComponent(bot, payload);
      break;
  }

  return callCustomizer('component', bot, payload, component, {
    partial: extra?.partial ?? false,
  });
}

export function transformUnfurledMediaItem(bot: Bot, payload: Partial<DiscordUnfurledMediaItem>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.unfurledMediaItem;
  const mediaItem = {} as SetupDesiredProps<UnfurledMediaItem, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.url && payload.url) mediaItem.url = payload.url;
  if (props.proxyUrl && payload.proxy_url) mediaItem.proxyUrl = payload.proxy_url;
  if (props.height && payload.height) mediaItem.height = payload.height;
  if (props.width && payload.width) mediaItem.width = payload.width;
  if (props.contentType && payload.content_type) mediaItem.contentType = payload.content_type;
  if (props.attachmentId && payload.attachment_id) mediaItem.attachmentId = bot.transformers.snowflake(payload.attachment_id);

  return callCustomizer('unfurledMediaItem', bot, payload, mediaItem, {
    partial: extra?.partial ?? false,
  });
}

export function transformMediaGalleryItem(bot: Bot, payload: Partial<DiscordMediaGalleryItem>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.mediaGalleryItem;
  const galleryItem = {} as SetupDesiredProps<MediaGalleryItem, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.media && payload.media) galleryItem.media = bot.transformers.unfurledMediaItem(bot, payload.media);
  if (props.description && payload.description) galleryItem.description = payload.description;
  if (props.spoiler && payload.spoiler) galleryItem.spoiler = payload.spoiler;

  return callCustomizer('mediaGalleryItem', bot, payload, galleryItem, {
    partial: extra?.partial ?? false,
  });
}

function transformActionRow(bot: Bot, payload: Partial<DiscordActionRow>) {
  const props = bot.transformers.desiredProperties.component;
  const actionRow = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) actionRow.type = payload.type;
  if (props.id && payload.id) actionRow.id = payload.id;
  if (props.components && payload.components)
    actionRow.components = payload.components.map((component) => bot.transformers.component(bot, component));

  return actionRow;
}

function transformContainerComponent(bot: Bot, payload: Partial<DiscordContainerComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const container = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) container.type = payload.type;
  if (props.id && payload.id) container.id = payload.id;
  if (props.accentColor && payload.accent_color) container.accentColor = payload.accent_color;
  if (props.spoiler && payload.spoiler) container.spoiler = payload.spoiler;
  if (props.components && payload.components)
    container.components = payload.components.map((component) => bot.transformers.component(bot, component));

  return container;
}

function transformButtonComponent(bot: Bot, payload: Partial<DiscordButtonComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const button = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) button.type = payload.type;
  if (props.id && payload.id) button.id = payload.id;
  if (props.label && payload.label) button.label = payload.label;
  if (props.customId && payload.custom_id) button.customId = payload.custom_id;
  if (props.style && payload.style) button.style = payload.style;
  if (props.emoji && payload.emoji) button.emoji = bot.transformers.emoji(bot, payload.emoji);
  if (props.url && payload.url) button.url = payload.url;
  if (props.disabled && payload.disabled) button.disabled = payload.disabled;
  if (props.skuId && payload.sku_id) button.skuId = bot.transformers.snowflake(payload.sku_id);

  return button;
}

function transformInputTextComponent(bot: Bot, payload: Partial<DiscordTextInputComponent | DiscordTextInputInteractionResponse>) {
  const props = bot.transformers.desiredProperties.component;
  const input = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) input.type = payload.type;
  if (props.id && payload.id) input.id = payload.id;
  if (props.value && payload.value) input.value = payload.value;
  if (props.customId && payload.custom_id) input.customId = payload.custom_id;

  // Check if it is the component or the response
  if ('style' in payload) {
    if (props.style && payload.style) input.style = payload.style;
    if (props.required && payload.required) input.required = payload.required;
    if (props.label && payload.label) input.label = payload.label;
    if (props.placeholder && payload.placeholder) input.placeholder = payload.placeholder;
    if (props.minLength && payload.min_length) input.minLength = payload.min_length;
    if (props.maxLength && payload.max_length) input.maxLength = payload.max_length;
  }

  return input;
}

function transformSelectMenuComponent(bot: Bot, payload: Partial<DiscordSelectMenuComponent | DiscordStringSelectInteractionResponse>) {
  const props = bot.transformers.desiredProperties.component;
  const select = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) select.type = payload.type;
  if (props.id && payload.id) select.id = payload.id;
  if (props.customId && payload.custom_id) select.customId = payload.custom_id;

  // We assume that if we find 'values' it is the interaction response
  if ('values' in payload) {
    if (props.values && payload.values) select.values = payload.values;
  } else {
    const _payload = payload as Partial<DiscordSelectMenuComponent>;

    if (props.placeholder && _payload.placeholder) select.placeholder = _payload.placeholder;
    if (props.minValues && _payload.min_values) select.minValues = _payload.min_values;
    if (props.maxValues && _payload.max_values) select.maxValues = _payload.max_values;
    if (props.defaultValues && _payload.default_values)
      select.defaultValues = _payload.default_values.map((defaultValue) => ({
        id: bot.transformers.snowflake(defaultValue.id),
        type: defaultValue.type,
      }));
    if (props.channelTypes && _payload.channel_types) select.channelTypes = _payload.channel_types;
    if (props.options && _payload.options)
      select.options = _payload.options.map((option) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        emoji: option.emoji
          ? {
              id: option.emoji.id ? bot.transformers.snowflake(option.emoji.id) : undefined,
              name: option.emoji.name ?? undefined,
              animated: option.emoji.animated,
            }
          : undefined,
        default: option.default,
      }));
    if (props.disabled && _payload.disabled) select.disabled = _payload.disabled;
  }

  return select;
}

function transformSectionComponent(bot: Bot, payload: Partial<DiscordSectionComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const section = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) section.type = payload.type;
  if (props.id && payload.id) section.id = payload.id;
  if (props.components && payload.components) section.components = payload.components.map((component) => bot.transformers.component(bot, component));
  if (props.accessory && payload.accessory) section.accessory = bot.transformers.component(bot, payload.accessory);

  return section;
}

function transformThumbnailComponent(bot: Bot, payload: Partial<DiscordThumbnailComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const thumbnail = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) thumbnail.type = payload.type;
  if (props.id && payload.id) thumbnail.id = payload.id;
  if (props.media && payload.media) thumbnail.media = bot.transformers.unfurledMediaItem(bot, payload.media);
  if (props.description && payload.description) thumbnail.description = payload.description;
  if (props.spoiler && payload.spoiler) thumbnail.spoiler = payload.spoiler;

  return thumbnail;
}

function transformMediaGalleryComponent(bot: Bot, payload: Partial<DiscordMediaGalleryComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const mediaGallery = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) mediaGallery.type = payload.type;
  if (props.id && payload.id) mediaGallery.id = payload.id;
  if (props.items && payload.items) mediaGallery.items = payload.items.map((item) => bot.transformers.mediaGalleryItem(bot, item));

  return mediaGallery;
}

function transformFileComponent(bot: Bot, payload: Partial<DiscordFileComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const file = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) file.type = payload.type;
  if (props.id && payload.id) file.id = payload.id;
  if (props.file && payload.file) file.file = bot.transformers.unfurledMediaItem(bot, payload.file);
  if (props.spoiler && payload.spoiler) file.spoiler = payload.spoiler;
  if (props.name && payload.name) file.name = payload.name;
  if (props.size && payload.size) file.size = payload.size;

  return file;
}

function transformTextDisplayComponent(bot: Bot, payload: Partial<DiscordTextDisplayComponent | DiscordTextDisplayInteractionResponse>) {
  const props = bot.transformers.desiredProperties.component;
  const textDisplay = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) textDisplay.type = payload.type;
  if (props.id && payload.id) textDisplay.id = payload.id;
  // That that this isn't a response
  if ('content' in payload) {
    if (props.content && payload.content) textDisplay.content = payload.content;
  }

  return textDisplay;
}

function transformSeparatorComponent(bot: Bot, payload: Partial<DiscordSeparatorComponent>) {
  const props = bot.transformers.desiredProperties.component;
  const separator = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) separator.type = payload.type;
  if (props.id && payload.id) separator.id = payload.id;
  if (props.divider && payload.divider) separator.divider = payload.divider;
  if (props.spacing && payload.spacing) separator.spacing = payload.spacing;

  return separator;
}

function transformLabelComponent(bot: Bot, payload: Partial<DiscordLabelComponent | DiscordLabelInteractionResponse>) {
  const props = bot.transformers.desiredProperties.component;
  const label = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) label.type = payload.type;
  if (props.id && payload.id) label.id = payload.id;
  // Check that this isn't a response
  if ('label' in payload) {
    if (props.label && payload.label) label.label = payload.label;
    if (props.description && payload.description) label.description = payload.description;
  }
  if (props.component && payload.component) label.component = bot.transformers.component(bot, payload.component);

  return label;
}

function transformFileUploadComponent(bot: Bot, payload: Partial<DiscordFileUploadComponent | DiscordFileUploadInteractionResponse>) {
  const props = bot.transformers.desiredProperties.component;
  const fileUpload = {} as SetupDesiredProps<Component, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) fileUpload.type = payload.type;
  if (props.id && payload.id) fileUpload.id = payload.id;
  if (props.customId && payload.custom_id) fileUpload.customId = payload.custom_id;

  // Check that this is a response
  if ('values' in payload) {
    if (props.values && payload.values) fileUpload.values = payload.values;
  } else {
    const _payload = payload as Partial<DiscordFileUploadComponent>;

    if (props.minValues && _payload.min_values) fileUpload.minValues = _payload.min_values;
    if (props.maxValues && _payload.max_values) fileUpload.maxValues = _payload.max_values;
    if (props.required && _payload.required) fileUpload.required = _payload.required;
  }

  return fileUpload;
}
