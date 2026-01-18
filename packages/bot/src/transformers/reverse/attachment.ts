import type { DiscordAttachment } from '@discordeno/types';
import type { Bot } from '../../bot.js';
import type { Attachment } from '../types.js';

export function transformAttachmentToDiscordAttachment(bot: Bot, payload: typeof bot.transformers.$inferredTypes.attachment): DiscordAttachment {
  const _payload = payload as Partial<Attachment>;

  return {
    id: _payload.id ? bot.transformers.reverse.snowflake(_payload.id) : undefined!,
    filename: _payload.filename!,
    content_type: _payload.contentType,
    size: _payload.size!,
    url: _payload.url!,
    proxy_url: _payload.proxyUrl!,
    height: _payload.height,
    width: _payload.width,
    ephemeral: _payload.ephemeral,
    description: _payload.description,
    duration_secs: _payload.duration_secs,
    waveform: _payload.waveform,
    flags: _payload.flags,
  };
}
