import type { DiscordAttachment } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Attachment } from './types.js';

export function transformAttachment(bot: Bot, payload: Partial<DiscordAttachment>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.attachment;
  const attachment = {} as SetupDesiredProps<Attachment, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) attachment.id = bot.transformers.snowflake(payload.id);
  if (props.filename && payload.filename) attachment.filename = payload.filename;
  if (props.title && payload.title) attachment.title = payload.title;
  if (props.contentType && payload.content_type) attachment.contentType = payload.content_type;
  if (props.size && payload.size !== undefined) attachment.size = payload.size;
  if (props.url && payload.url) attachment.url = payload.url;
  if (props.proxyUrl && payload.proxy_url) attachment.proxyUrl = payload.proxy_url;
  if (props.height && payload.height) attachment.height = payload.height;
  if (props.width && payload.width) attachment.width = payload.width;
  if (props.ephemeral && payload.ephemeral) attachment.ephemeral = payload.ephemeral;
  if (props.description && payload.description) attachment.description = payload.description;
  if (props.duration_secs && payload.duration_secs) attachment.duration_secs = payload.duration_secs;
  if (props.waveform && payload.waveform) attachment.waveform = payload.waveform;
  if (props.flags) attachment.flags = payload.flags;

  return callCustomizer('attachment', bot, payload, attachment, {
    partial: extra?.partial ?? false,
  });
}
