import { Bot } from "../../bot.ts";
import { DiscordAttachment } from "../../types/discord.ts";
import { Attachment } from "../attachment.ts";

export function transformAttachmentToDiscordAttachment(bot: Bot, payload: Attachment): DiscordAttachment {
  return {
    id: bot.transformers.reverse.snowflake(payload.id),
    filename: payload.filename,
    content_type: payload.contentType,
    size: payload.size,
    url: payload.url,
    proxy_url: payload.proxyUrl,
    height: payload.height,
    width: payload.width,
    ephemeral: payload.ephemeral,
    description: payload.description,
  };
}
