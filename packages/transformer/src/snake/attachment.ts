import type { Camelize, DiscordAttachment } from '@discordeno/types'

export function s1nakelize1Attachment (payload: Camelize<DiscordAttachment>): DiscordAttachment {
  return {
    id: payload.id,
    url: payload.url,
    size: payload.size,
    width: payload.width,
    height: payload.height,
    filename: payload.filename,
    ephemeral: payload.ephemeral,
    description: payload.description,

    content_type: payload.contentType,
    proxy_url: payload.proxyUrl
  }
}
