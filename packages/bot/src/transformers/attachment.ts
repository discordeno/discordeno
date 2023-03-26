import type { DiscordAttachment } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAttachment(bot: Bot, payload: DiscordAttachment) {
  const attachment = {
    id: bot.transformers.snowflake(payload.id),
    filename: payload.filename,
    contentType: payload.content_type,
    size: payload.size,
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height ?? undefined,
    width: payload.width ?? undefined,
    ephemeral: payload.ephemeral,
    description: payload.description,
  }

  return attachment as Optionalize<typeof attachment>
}

export interface Attachment extends ReturnType<typeof transformAttachment> {}
