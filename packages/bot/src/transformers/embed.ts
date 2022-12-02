import { DiscordEmbed, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformEmbed (bot: Bot, payload: DiscordEmbed) {
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
          proxyIconUrl: payload.footer.proxy_icon_url
        }
      : undefined,
    image: payload.image
      ? {
          url: payload.image.url,
          proxyUrl: payload.image.proxy_url,
          height: payload.image.height,
          width: payload.image.width
        }
      : undefined,
    thumbnail: payload.thumbnail
      ? {
          url: payload.thumbnail.url,
          proxyUrl: payload.thumbnail.proxy_url,
          height: payload.thumbnail.height,
          width: payload.thumbnail.width
        }
      : undefined,
    video: payload.video
      ? {
          url: payload.video.url,
          proxyUrl: payload.video.proxy_url,
          height: payload.video.height,
          width: payload.video.width
        }
      : undefined,
    provider: payload.provider,
    author: payload.author
      ? {
          name: payload.author.name,
          url: payload.author.url,
          iconUrl: payload.author.icon_url,
          proxyIconUrl: payload.author.proxy_icon_url
        }
      : undefined,
    fields: payload.fields
  }

  return embed as Optionalize<typeof embed>
}

export interface Embed extends ReturnType<typeof transformEmbed> {}
