import type { DiscordAttachment } from '@discordeno/types'
import type { Bot } from '../index.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAttachment(bot: Bot, payload: DiscordAttachment) {
  const props = bot.transformers.desiredProperties.attachment
  const attachment = {} as Attachment

  if (props.id && payload.id) attachment.id = bot.transformers.snowflake(payload.id)
  if (props.filename && payload.filename) attachment.filename = payload.filename
  if (props.contentType && payload.content_type) attachment.contentType = payload.content_type
  if (props.size && payload.size) attachment.size = payload.size
  if (props.url && payload.url) attachment.url = payload.url
  if (props.proxyUrl && payload.proxy_url) attachment.proxyUrl = payload.proxy_url
  if (props.height && payload.height) attachment.height = payload.height
  if (props.width && payload.width) attachment.width = payload.width
  if (props.ephemeral && payload.ephemeral) attachment.ephemeral = payload.ephemeral
  if (props.description && payload.description) attachment.description = payload.description

  return bot.transformers.customizers.attachment(bot, payload, attachment)
}

export interface Attachment {
  /** Name of file attached */
  filename: string
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  contentType?: string
  /** Size of file in bytes */
  size: number
  /** Source url of file */
  url: string
  /** A proxied url of file */
  proxyUrl: string
  /** Attachment id */
  id: bigint
  /** description for the file (max 1024 characters) */
  description?: string
  /** Height of file (if image) */
  height?: number
  /** Width of file (if image) */
  width?: number
  /**
   * whether this attachment is ephemeral.
   * Ephemeral attachments will automatically be removed after a set period of time.
   * Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.
   */
  ephemeral?: boolean
}
