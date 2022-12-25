import type { Camelize, DiscordEmbed } from '@discordeno/types'

export function c1amelize1Embed (payload: DiscordEmbed): Camelize<DiscordEmbed> {
  return {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp,
    color: payload.color,
    footer: payload.footer && {
      text: payload.footer.text,
      iconUrl: payload.footer.icon_url,
      proxyIconUrl: payload.footer.proxy_icon_url
    },
    image: payload.image && {
      url: payload.image.url,
      proxyUrl: payload.image.proxy_url,
      height: payload.image.height,
      width: payload.image.width
    },
    thumbnail: payload.thumbnail && {
      url: payload.thumbnail.url,
      proxyUrl: payload.thumbnail.proxy_url,
      height: payload.thumbnail.height,
      width: payload.thumbnail.width
    },
    video: payload.video && {
      url: payload.video.url,
      proxyUrl: payload.video.proxy_url,
      height: payload.video.height,
      width: payload.video.width
    },
    provider: payload.provider,
    author: payload.author && {
      name: payload.author.name,
      url: payload.author.url,
      iconUrl: payload.author.icon_url,
      proxyIconUrl: payload.author.proxy_icon_url
    },
    fields: payload.fields?.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field.inline
    }))
  }
}
