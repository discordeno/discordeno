import type { AttachmentFlags, DiscordAttachment } from '@discordeno/types'
import type { Bot } from '../index.js'

export function transformAttachment(bot: Bot, payload: DiscordAttachment): Attachment {
  const props = bot.transformers.desiredProperties.attachment
  const attachment = {} as Attachment

  if (props.id && payload.id) attachment.id = bot.transformers.snowflake(payload.id)
  if (props.filename && payload.filename) attachment.filename = payload.filename
  if (props.contentType && payload.content_type) attachment.contentType = payload.content_type
  if (props.size) attachment.size = payload.size
  if (props.url && payload.url) attachment.url = payload.url
  if (props.proxyUrl && payload.proxy_url) attachment.proxyUrl = payload.proxy_url
  if (props.height && payload.height) attachment.height = payload.height
  if (props.width && payload.width) attachment.width = payload.width
  if (props.ephemeral && payload.ephemeral) attachment.ephemeral = payload.ephemeral
  if (props.description && payload.description) attachment.description = payload.description
  if (props.duration_secs && payload.duration_secs) attachment.duration_secs = payload.duration_secs
  if (props.waveform && payload.waveform) attachment.waveform = payload.waveform
  if (props.flags && payload.flags) attachment.flags = payload.flags

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
  /** The duration of the audio file for a voice message */
  duration_secs?: number
  /** A base64 encoded bytearray representing a sampled waveform for a voice message */
  waveform?: string
  /** Attachment flags combined as a bitfield */
  flags?: AttachmentFlags
}
