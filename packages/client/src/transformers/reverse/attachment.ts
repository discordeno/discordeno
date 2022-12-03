import { DiscordAttachment } from '@discordeno/types'
import { Client } from '../../client.js'
import { Attachment } from '../attachment.js'

export function transformAttachmentToDiscordAttachment (
  client: Client,
  payload: Attachment
): DiscordAttachment {
  return {
    id: client.transformers.reverse.snowflake(payload.id),
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
