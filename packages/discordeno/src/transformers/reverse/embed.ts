import { Bot } from '../../bot.js'
import { DiscordEmbed } from '../../types/discord.js'
import { Embed } from '../embed.js'

export function transformEmbedToDiscordEmbed(bot: Bot, payload: Embed): DiscordEmbed {
  return {
    title: payload.title,
    type: payload.type,
    description: payload.description,
    url: payload.url,
    timestamp: payload.timestamp ? new Date(payload.timestamp).toISOString() : undefined,
    color: payload.color,
    footer: (payload.footer != null)
      ? {
        text: payload.footer.text,
        icon_url: payload.footer.iconUrl,
        proxy_icon_url: payload.footer.proxyIconUrl
      }
      : undefined,
    image: (payload.image != null)
      ? {
        url: payload.image.url,
        proxy_url: payload.image.proxyUrl,
        height: payload.image.height,
        width: payload.image.width
      }
      : undefined,
    thumbnail: (payload.thumbnail != null)
      ? {
        url: payload.thumbnail.url,
        proxy_url: payload.thumbnail.proxyUrl,
        height: payload.thumbnail.height,
        width: payload.thumbnail.width
      }
      : undefined,
    video: (payload.video != null)
      ? {
        url: payload.video.url,
        proxy_url: payload.video.proxyUrl,
        height: payload.video.height,
        width: payload.video.width
      }
      : undefined,
    provider: payload.provider,
    author: (payload.author != null)
      ? {
        name: payload.author.name,
        url: payload.author.url,
        icon_url: payload.author.iconUrl,
        proxy_icon_url: payload.author.proxyIconUrl
      }
      : undefined,
    fields: payload.fields
  }
}
