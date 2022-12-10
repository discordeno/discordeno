import type { DiscordAttachment } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Attachment } from '../attachment.js'

export function transformAttachmentToDiscordAttachment (
  rest: RestManager,
  payload: Attachment
): DiscordAttachment {
  return {
    id: rest.transformers.reverse.snowflake(payload.id),
    filename: payload.filename,
    content_type: payload.contentType,
    size: payload.size,
    url: payload.url,
    proxy_url: payload.proxyUrl,
    height: payload.height,
    width: payload.width,
    ephemeral: payload.ephemeral,
    description: payload.description
  }
}
