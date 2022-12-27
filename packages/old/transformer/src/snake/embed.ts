import type { Camelize, DiscordEmbed } from '@discordeno/types'

export function s1nakelize1Embed (
  payload: Camelize<DiscordEmbed>
): DiscordEmbed {
  return {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp,
    color: payload.color,
    footer: payload.footer && {
      text: payload.footer.text,
      icon_url: payload.footer.iconUrl,
      proxy_icon_url: payload.footer.proxyIconUrl
    },
    image: payload.image && {
      url: payload.image.url,
      proxy_url: payload.image.proxyUrl,
      height: payload.image.height,
      width: payload.image.width
    },
    thumbnail: payload.thumbnail && {
      url: payload.thumbnail.url,
      proxy_url: payload.thumbnail.proxyUrl,
      height: payload.thumbnail.height,
      width: payload.thumbnail.width
    },
    video: payload.video && {
      url: payload.video.url,
      proxy_url: payload.video.proxyUrl,
      height: payload.video.height,
      width: payload.video.width
    },
    provider: payload.provider,
    author: payload.author && {
      name: payload.author.name,
      url: payload.author.url,
      icon_url: payload.author.iconUrl,
      proxy_icon_url: payload.author.proxyIconUrl
    },
    fields: payload.fields?.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field.inline
    }))
  }
}
