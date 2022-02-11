import { Bot } from "../bot.ts";
import { Attachment } from "../types/messages/attachment.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformAttachment(bot: Bot, payload: SnakeCasedPropertiesDeep<Attachment>): DiscordenoAttachment {
  return {
    id: bot.transformers.snowflake(payload.id),
    filename: payload.filename,
    contentType: payload.content_type,
    size: payload.size,
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height ?? undefined,
    width: payload.width ?? undefined,
  };
}

export interface DiscordenoAttachment {
  /** Attachment id */
  id: bigint;
  /** Name of file attached */
  filename: string;
  /** The attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  contentType?: string;
  /** Size of file in bytes */
  size: number;
  /** Source url of file */
  url: string;
  /** A proxied url of file */
  proxyUrl: string;
  /** Height of file (if image) */
  height?: number;
  /** Width of file (if image) */
  width?: number;
}
