import type { Camelize, DiscordAttachment } from '@discordeno/types'

export function c1amelize1Attachment (
  payload: DiscordAttachment
): Camelize<DiscordAttachment> {
  return {
    id: payload.id,
    filename: payload.filename,
    description: payload.description,
    contentType: payload.content_type,
    size: payload.size,
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height ?? undefined,
    width: payload.width ?? undefined,
    ephemeral: payload.ephemeral
  }
}
