import type { DiscordEmbed } from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { Embed } from '../types.js';

export function transformEmbedToDiscordEmbed(_bot: Bot, payload: Embed): DiscordEmbed {
  return {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp ? new Date(payload.timestamp).toISOString() : undefined,
    color: payload.color,
    footer: payload.footer
      ? {
          text: payload.footer.text,
          icon_url: payload.footer.iconUrl,
          proxy_icon_url: payload.footer.proxyIconUrl,
        }
      : undefined,
    image: payload.image
      ? {
          url: payload.image.url,
          proxy_url: payload.image.proxyUrl,
          height: payload.image.height,
          width: payload.image.width,
          content_type: payload.image.contentType,
          placeholder: payload.image.placeholder,
          placeholder_version: payload.image.placeholderVersion,
          description: payload.image.description,
          flags: payload.image.flags?.bitfield,
        }
      : undefined,
    thumbnail: payload.thumbnail
      ? {
          url: payload.thumbnail.url,
          proxy_url: payload.thumbnail.proxyUrl,
          height: payload.thumbnail.height,
          width: payload.thumbnail.width,
          content_type: payload.thumbnail.contentType,
          placeholder: payload.thumbnail.placeholder,
          placeholder_version: payload.thumbnail.placeholderVersion,
          description: payload.thumbnail.description,
          flags: payload.thumbnail.flags?.bitfield,
        }
      : undefined,
    video: payload.video
      ? {
          url: payload.video.url,
          proxy_url: payload.video.proxyUrl,
          height: payload.video.height,
          width: payload.video.width,
          content_type: payload.video.contentType,
          placeholder: payload.video.placeholder,
          placeholder_version: payload.video.placeholderVersion,
          description: payload.video.description,
          flags: payload.video.flags?.bitfield,
        }
      : undefined,
    provider: payload.provider,
    author: payload.author
      ? {
          name: payload.author.name,
          url: payload.author.url,
          icon_url: payload.author.iconUrl,
          proxy_icon_url: payload.author.proxyIconUrl,
        }
      : undefined,
    fields: payload.fields,
  };
}
