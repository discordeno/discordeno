import type { DiscordEmbed, DiscordEmbedAuthor, DiscordEmbedFooter, DiscordEmbedImage, DiscordEmbedVideo } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Embed, EmbedAuthor, EmbedFooter, EmbedImage, EmbedVideo } from './types.js';

export function transformEmbed(bot: Bot, payload: Partial<DiscordEmbed>, extra?: { partial?: boolean }) {
  const embed = {} as SetupDesiredProps<Embed, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.title) embed.title = payload.title;
  if (payload.type) embed.type = payload.type;
  if (payload.description) embed.description = payload.description;
  if (payload.url) embed.url = payload.url;
  if (payload.timestamp) embed.timestamp = Date.parse(payload.timestamp);
  if (payload.color !== undefined) embed.color = payload.color;
  if (payload.footer) embed.footer = bot.transformers.embedFooter(bot, payload.footer);
  if (payload.image) embed.image = bot.transformers.embedImage(bot, payload.image);
  if (payload.thumbnail) embed.thumbnail = bot.transformers.embedImage(bot, payload.thumbnail);
  if (payload.video) embed.video = bot.transformers.embedVideo(bot, payload.video);
  if (payload.provider) embed.provider = payload.provider;
  if (payload.author) embed.author = bot.transformers.embedAuthor(bot, payload.author);
  if (payload.fields) embed.fields = payload.fields;
  if (payload.flags !== undefined) embed.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embed', bot, payload, embed, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedFooter(bot: Bot, payload: Partial<DiscordEmbedFooter>, extra?: { partial?: boolean }) {
  const embedFooter = {} as SetupDesiredProps<EmbedFooter, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.text) embedFooter.text = payload.text;
  if (payload.icon_url) embedFooter.iconUrl = payload.icon_url;
  if (payload.proxy_icon_url) embedFooter.proxyIconUrl = payload.proxy_icon_url;

  return callCustomizer('embedFooter', bot, payload, embedFooter, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedImage(bot: Bot, payload: Partial<DiscordEmbedImage>, extra?: { partial?: boolean }) {
  const embedImage = {} as SetupDesiredProps<EmbedImage, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.url) embedImage.url = payload.url;
  if (payload.proxy_url) embedImage.proxyUrl = payload.proxy_url;
  if (payload.height !== undefined) embedImage.height = payload.height;
  if (payload.width !== undefined) embedImage.width = payload.width;
  if (payload.content_type) embedImage.contentType = payload.content_type;
  if (payload.placeholder) embedImage.placeholder = payload.placeholder;
  if (payload.placeholder_version) embedImage.placeholderVersion = payload.placeholder_version;
  if (payload.description) embedImage.description = payload.description;
  if (payload.flags !== undefined) embedImage.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embedImage', bot, payload, embedImage, {
    partial: extra?.partial ?? false,
  });
}
export function transformEmbedVideo(bot: Bot, payload: Partial<DiscordEmbedVideo>, extra?: { partial?: boolean }) {
  const embedVideo = {} as SetupDesiredProps<EmbedVideo, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.url) embedVideo.url = payload.url;
  if (payload.proxy_url) embedVideo.proxyUrl = payload.proxy_url;
  if (payload.height !== undefined) embedVideo.height = payload.height;
  if (payload.width !== undefined) embedVideo.width = payload.width;
  if (payload.content_type) embedVideo.contentType = payload.content_type;
  if (payload.placeholder) embedVideo.placeholder = payload.placeholder;
  if (payload.placeholder_version) embedVideo.placeholderVersion = payload.placeholder_version;
  if (payload.description) embedVideo.description = payload.description;
  if (payload.flags !== undefined) embedVideo.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('embedVideo', bot, payload, embedVideo, {
    partial: extra?.partial ?? false,
  });
}

export function transformEmbedAuthor(bot: Bot, payload: Partial<DiscordEmbedAuthor>, extra?: { partial?: boolean }) {
  const embedAuthor = {} as SetupDesiredProps<EmbedAuthor, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.name) embedAuthor.name = payload.name;
  if (payload.url) embedAuthor.url = payload.url;
  if (payload.icon_url) embedAuthor.iconUrl = payload.icon_url;
  if (payload.proxy_icon_url) embedAuthor.proxyIconUrl = payload.proxy_icon_url;

  return callCustomizer('embedAuthor', bot, payload, embedAuthor, {
    partial: extra?.partial ?? false,
  });
}
