import { Bot } from "../bot.ts";
import { DiscordAttachment, Optionalize } from "../deps.ts";

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
  };

  return attachment as Optionalize<typeof attachment>;
}

export interface Attachment extends ReturnType<typeof transformAttachment> {}
