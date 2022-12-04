import { DiscordAttachment, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAttachment (
  rest: RestManager,
  payload: DiscordAttachment
) {
  const attachment = {
    id: rest.transformers.snowflake(payload.id),
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
