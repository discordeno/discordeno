import type { DiscordEmbed } from '@discordeno/types';
import type { Bot } from '../bot.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Embed } from './types.js';

export function transformEmbed(bot: Bot, payload: DiscordEmbed): Embed {
  const embed = {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp ? Date.parse(payload.timestamp) : undefined,
    color: payload.color,
    footer: payload.footer
      ? {
          text: payload.footer.text,
          iconUrl: payload.footer.icon_url,
          proxyIconUrl: payload.footer.proxy_icon_url,
        }
      : undefined,
    image: payload.image
      ? {
          url: payload.image.url,
          proxyUrl: payload.image.proxy_url,
          height: payload.image.height,
          width: payload.image.width,
          contentType: payload.image.content_type,
          placeholder: payload.image.placeholder,
          placeholderVersion: payload.image.placeholder_version,
          description: payload.image.description,
          flags: payload.image.flags ? new ToggleBitfield(payload.image.flags) : undefined,
        }
      : undefined,
    thumbnail: payload.thumbnail
      ? {
          url: payload.thumbnail.url,
          proxyUrl: payload.thumbnail.proxy_url,
          height: payload.thumbnail.height,
          width: payload.thumbnail.width,
          contentType: payload.thumbnail.content_type,
          placeholder: payload.thumbnail.placeholder,
          placeholderVersion: payload.thumbnail.placeholder_version,
          description: payload.thumbnail.description,
          flags: payload.thumbnail.flags ? new ToggleBitfield(payload.thumbnail.flags) : undefined,
        }
      : undefined,
    video: payload.video
      ? {
          url: payload.video.url,
          proxyUrl: payload.video.proxy_url,
          height: payload.video.height,
          width: payload.video.width,
          contentType: payload.video.content_type,
          placeholder: payload.video.placeholder,
          placeholderVersion: payload.video.placeholder_version,
          description: payload.video.description,
          flags: payload.video.flags ? new ToggleBitfield(payload.video.flags) : undefined,
        }
      : undefined,
    provider: payload.provider,
    author: payload.author
      ? {
          name: payload.author.name,
          url: payload.author.url,
          iconUrl: payload.author.icon_url,
          proxyIconUrl: payload.author.proxy_icon_url,
        }
      : undefined,
    fields: payload.fields,
    flags: payload.flags ? new ToggleBitfield(payload.flags) : undefined,
  } as Embed;

  return bot.transformers.customizers.embed(bot, payload, embed);
}
