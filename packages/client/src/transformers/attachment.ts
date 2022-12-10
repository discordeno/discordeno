import type { DiscordAttachment, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAttachment (
  client: Client,
  payload: DiscordAttachment
) {
  const attachment = {
    id: client.transformers.snowflake(payload.id),
    filename: payload.filename,
    contentType: payload.content_type,
    size: payload.size,
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height ?? undefined,
    width: payload.width ?? undefined,
    ephemeral: payload.ephemeral,
    description: payload.description
  }

  return attachment as Optionalize<typeof attachment>
}

export interface Attachment extends ReturnType<typeof transformAttachment> {}
