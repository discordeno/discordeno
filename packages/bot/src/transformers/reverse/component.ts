import {
  type ButtonStyles,
  type DiscordActionRow,
  type DiscordButtonComponent,
  type DiscordCheckboxComponent,
  type DiscordCheckboxGroupComponent,
  type DiscordContainerComponent,
  type DiscordFileComponent,
  type DiscordFileUploadComponent,
  type DiscordLabelComponent,
  type DiscordMediaGalleryComponent,
  type DiscordMediaGalleryItem,
  type DiscordMessageComponent,
  type DiscordMessageComponentFromModalInteractionResponse,
  type DiscordRadioGroupComponent,
  type DiscordSectionComponent,
  type DiscordSelectMenuComponent,
  type DiscordStringSelectInteractionResponseFromModal,
  type DiscordTextDisplayComponent,
  type DiscordTextInputComponent,
  type DiscordTextInputInteractionResponse,
  type DiscordThumbnailComponent,
  type DiscordUnfurledMediaItem,
  MessageComponentTypes,
  type TextStyles,
} from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { Component, MediaGalleryItem, UnfurledMediaItem } from '../types.js';

export function transformComponentToDiscordComponent(
  bot: Bot,
  payload: Component,
): DiscordMessageComponent | DiscordMessageComponentFromModalInteractionResponse {
  // This switch should include all cases
  switch (payload.type) {
    case MessageComponentTypes.ActionRow:
      return transformActionRow(bot, payload);
    case MessageComponentTypes.Button:
      return transformButtonComponent(bot, payload);
    case MessageComponentTypes.Container:
      return transformContainerComponent(bot, payload);
    case MessageComponentTypes.TextInput:
      return transformInputTextComponent(bot, payload);
    case MessageComponentTypes.StringSelect:
    case MessageComponentTypes.ChannelSelect:
    case MessageComponentTypes.RoleSelect:
    case MessageComponentTypes.UserSelect:
    case MessageComponentTypes.MentionableSelect:
      return transformSelectMenuComponent(bot, payload);
    case MessageComponentTypes.Section:
      return transformSectionComponent(bot, payload);
    case MessageComponentTypes.File:
      return transformFileComponent(bot, payload);
    case MessageComponentTypes.MediaGallery:
      return transformMediaGalleryComponent(bot, payload);
    case MessageComponentTypes.Thumbnail:
      return transformThumbnailComponent(bot, payload);
    case MessageComponentTypes.Label:
      return transformLabelComponent(bot, payload);
    case MessageComponentTypes.FileUpload:
      return transformFileUploadComponent(bot, payload);
    case MessageComponentTypes.RadioGroup:
      return transformRadioGroupComponent(bot, payload);
    case MessageComponentTypes.CheckboxGroup:
      return transformCheckboxGroupComponent(bot, payload);
    case MessageComponentTypes.Checkbox:
      return transformCheckboxComponent(bot, payload);
    case MessageComponentTypes.Separator:
    case MessageComponentTypes.TextDisplay:
      // As of now they are compatible
      return payload as DiscordMessageComponent;
  }
}

export function transformUnfurledMediaItemToDiscordUnfurledMediaItem(bot: Bot, payload: UnfurledMediaItem): DiscordUnfurledMediaItem {
  return {
    url: payload.url,
    proxy_url: payload.proxyUrl,
    height: payload.height,
    width: payload.width,
    content_type: payload.contentType,
    attachment_id: payload.attachmentId ? bot.transformers.reverse.snowflake(payload.attachmentId) : undefined,
  };
}

export function transformMediaGalleryItemToDiscordMediaGalleryItem(bot: Bot, payload: MediaGalleryItem): DiscordMediaGalleryItem {
  return {
    media: bot.transformers.reverse.unfurledMediaItem(bot, payload.media),
    description: payload.description,
    spoiler: payload.spoiler,
  };
}

function transformActionRow(bot: Bot, payload: Component): DiscordActionRow {
  return {
    type: MessageComponentTypes.ActionRow,
    id: payload.id,
    // The actionRow.components type is kinda annoying, so we need a cast for this
    components: (payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) ?? []) as DiscordActionRow['components'],
  };
}

function transformContainerComponent(bot: Bot, payload: Component): DiscordContainerComponent {
  return {
    type: MessageComponentTypes.Container,
    id: payload.id,
    accent_color: payload.accentColor,
    spoiler: payload.spoiler,
    components: (payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) ??
      []) as DiscordContainerComponent['components'],
  };
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
          id: payload.emoji.id ? bot.transformers.reverse.snowflake(payload.emoji.id) : null,
          name: payload.emoji.name ?? null,
          animated: payload.emoji.animated,
        }
      : undefined,
    label: payload.label,
    url: payload.url,
    sku_id: payload.skuId ? bot.transformers.reverse.snowflake(payload.skuId) : undefined,
  };
}

function transformInputTextComponent(_bot: Bot, payload: Component): DiscordTextInputComponent | DiscordTextInputInteractionResponse {
  // Since Component is a merge of all components, some casts are necessary
  return {
    type: MessageComponentTypes.TextInput,
    id: payload.id,
    style: payload.style as TextStyles,
    custom_id: payload.customId!,
    label: payload.label!,
    value: payload.value as string | undefined,
    max_length: payload.maxLength,
    min_length: payload.minLength,
    placeholder: payload.placeholder,
    required: payload.required,
  };
}

function transformSelectMenuComponent(bot: Bot, payload: Component): DiscordSelectMenuComponent | DiscordStringSelectInteractionResponseFromModal {
  if (payload.values) {
    return {
      type: MessageComponentTypes.StringSelect,
      values: payload.values,
      custom_id: payload.customId!,
      id: payload.id!,
    };
  }

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
            id: option.emoji.id ? bot.transformers.reverse.snowflake(option.emoji.id) : null,
            name: option.emoji.name ?? null,
            animated: option.emoji.animated,
          }
        : undefined,
      default: option.default,
    })),
    placeholder: payload.placeholder,
    required: payload.required,
  };
}

function transformSectionComponent(bot: Bot, payload: Component): DiscordSectionComponent {
  return {
    type: MessageComponentTypes.Section,
    id: payload.id,
    components: payload.components?.map((component) => bot.transformers.reverse.component(bot, component)) as DiscordTextDisplayComponent[],
    accessory: (payload.accessory ? bot.transformers.reverse.component(bot, payload.accessory) : undefined) as DiscordSectionComponent['accessory'],
  };
}

function transformFileComponent(bot: Bot, payload: Component): DiscordFileComponent {
  return {
    type: MessageComponentTypes.File,
    id: payload.id,
    file: bot.transformers.reverse.unfurledMediaItem(bot, payload.file!),
    spoiler: payload.spoiler,
    name: payload.name!,
    size: payload.size!,
  };
}

function transformMediaGalleryComponent(bot: Bot, payload: Component): DiscordMediaGalleryComponent {
  return {
    type: MessageComponentTypes.MediaGallery,
    id: payload.id,
    items: payload.items?.map((item) => bot.transformers.reverse.mediaGalleryItem(bot, item)) ?? [],
  };
}

function transformThumbnailComponent(bot: Bot, payload: Component): DiscordThumbnailComponent {
  return {
    type: MessageComponentTypes.Thumbnail,
    id: payload.id,
    media: bot.transformers.reverse.unfurledMediaItem(bot, payload.media!),
    description: payload.description,
    spoiler: payload.spoiler,
  };
}

function transformLabelComponent(bot: Bot, payload: Component): DiscordLabelComponent {
  return {
    type: MessageComponentTypes.Label,
    id: payload.id,
    label: payload.label!,
    description: payload.description,
    component: bot.transformers.reverse.component(bot, payload.component!) as DiscordLabelComponent['component'],
  };
}

function transformFileUploadComponent(bot: Bot, payload: Component): DiscordFileUploadComponent {
  return {
    type: MessageComponentTypes.FileUpload,
    id: payload.id,
    custom_id: payload.customId!,
    max_values: payload.maxValues,
    min_values: payload.minValues,
    required: payload.required,
  };
}

function transformRadioGroupComponent(bot: Bot, payload: Component): DiscordRadioGroupComponent {
  return {
    type: MessageComponentTypes.RadioGroup,
    id: payload.id,
    custom_id: payload.customId!,
    options: payload.options ?? [],
    required: payload.required,
  };
}

function transformCheckboxGroupComponent(bot: Bot, payload: Component): DiscordCheckboxGroupComponent {
  return {
    type: MessageComponentTypes.CheckboxGroup,
    id: payload.id,
    custom_id: payload.customId!,
    options: payload.options ?? [],
    min_values: payload.minValues,
    max_values: payload.maxValues,
    required: payload.required,
  };
}

function transformCheckboxComponent(bot: Bot, payload: Component): DiscordCheckboxComponent {
  return {
    type: MessageComponentTypes.Checkbox,
    id: payload.id,
    custom_id: payload.customId!,
    default: payload.default,
  };
}
