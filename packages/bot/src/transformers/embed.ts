import type { DiscordEmbed, DiscordEmbedAuthor, DiscordEmbedFooter, DiscordEmbedImage, DiscordEmbedVideo } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Embed, EmbedAuthor, EmbedFooter, EmbedImage, EmbedVideo } from './types.js';

export function transformEmbed(bot: Bot, payload: Partial<DiscordEmbed>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.embed;
  const embed = {} as SetupDesiredProps<Embed, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.title && payload.title) embed.title = payload.title;
  if (props.type && payload.type) embed.type = payload.type;
  if (props.description && payload.description) embed.description = payload.description;
  if (props.url && payload.url) embed.url = payload.url;
  if (props.timestamp && payload.timestamp) embed.timestamp = Date.parse(payload.timestamp);
  if (props.color && payload.color !== undefined) embed.color = payload.color;
  if (props.footer && payload.footer) embed.footer = bot.transformers.embedFooter(bot, payload.footer);
  if (props.image && payload.image) embed.image = bot.transformers.embedImage(bot, payload.image);
  if (props.thumbnail && payload.thumbnail) embed.thumbnail = bot.transformers.embedImage(bot, payload.thumbnail);
  if (props.video && payload.video) embed.video = bot.transformers.embedVideo(bot, payload.video);
  if (props.provider && payload.provider) embed.provider = payload.provider;
  if (props.author && payload.author) embed.author = bot.transformers.embedAuthor(bot, payload.author);
  if (props.fields && payload.fields) embed.fields = payload.fields;
  if (props.components && payload.components) embed.components = payload.components.map((c) => bot.transformers.component(bot, c));
  if (props.flags && payload.flags !== undefined) embed.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embed', bot, payload, embed, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedFooter(bot: Bot, payload: Partial<DiscordEmbedFooter>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.embedFooter;
  const embedFooter = {} as SetupDesiredProps<EmbedFooter, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.text && payload.text) embedFooter.text = payload.text;
  if (props.iconUrl && payload.icon_url) embedFooter.iconUrl = payload.icon_url;
  if (props.proxyIconUrl && payload.proxy_icon_url) embedFooter.proxyIconUrl = payload.proxy_icon_url;

  return callCustomizer('embedFooter', bot, payload, embedFooter, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedImage(bot: Bot, payload: Partial<DiscordEmbedImage>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.embedMedia;
  const embedImage = {} as SetupDesiredProps<EmbedImage, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.url && payload.url) embedImage.url = payload.url;
  if (props.proxyUrl && payload.proxy_url) embedImage.proxyUrl = payload.proxy_url;
  if (props.height && payload.height !== undefined) embedImage.height = payload.height;
  if (props.width && payload.width !== undefined) embedImage.width = payload.width;
  if (props.contentType && payload.content_type) embedImage.contentType = payload.content_type;
  if (props.placeholder && payload.placeholder) embedImage.placeholder = payload.placeholder;
  if (props.placeholderVersion && payload.placeholder_version) embedImage.placeholderVersion = payload.placeholder_version;
  if (props.description && payload.description) embedImage.description = payload.description;
  if (props.flags && payload.flags !== undefined) embedImage.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embedImage', bot, payload, embedImage, {
    partial: extra?.partial ?? false,
  });
}
export function transformEmbedVideo(bot: Bot, payload: Partial<DiscordEmbedVideo>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.embedMedia;
  const embedVideo = {} as SetupDesiredProps<EmbedVideo, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.url && payload.url) embedVideo.url = payload.url;
  if (props.proxyUrl && payload.proxy_url) embedVideo.proxyUrl = payload.proxy_url;
  if (props.height && payload.height !== undefined) embedVideo.height = payload.height;
  if (props.width && payload.width !== undefined) embedVideo.width = payload.width;
  if (props.contentType && payload.content_type) embedVideo.contentType = payload.content_type;
  if (props.placeholder && payload.placeholder) embedVideo.placeholder = payload.placeholder;
  if (props.placeholderVersion && payload.placeholder_version) embedVideo.placeholderVersion = payload.placeholder_version;
  if (props.description && payload.description) embedVideo.description = payload.description;
  if (props.flags && payload.flags !== undefined) embedVideo.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embedVideo', bot, payload, embedVideo, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedAuthor(bot: Bot, payload: Partial<DiscordEmbedAuthor>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.embedAuthor;
  const embedAuthor = {} as SetupDesiredProps<EmbedAuthor, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.name && payload.name) embedAuthor.name = payload.name;
  if (props.url && payload.url) embedAuthor.url = payload.url;
  if (props.iconUrl && payload.icon_url) embedAuthor.iconUrl = payload.icon_url;
  if (props.proxyIconUrl && payload.proxy_icon_url) embedAuthor.proxyIconUrl = payload.proxy_icon_url;

  return callCustomizer('embedAuthor', bot, payload, embedAuthor, {
    partial: extra?.partial ?? false,
  });
}
