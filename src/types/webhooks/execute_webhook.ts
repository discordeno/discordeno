import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "../messages/allowed_mentions.ts";
import { FileContent } from "../misc/file_content.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface ExecuteWebhook {
  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatarUrl?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** The contents of the file being sent */
  file: FileContent | FileContent[];
  /** Embedded `rich` content */
  embeds: Embed[];
  /** Allowed mentions for the message */
  allowedMentions: AllowedMentions;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export type DiscordExecuteWebhook = SnakeCasedPropertiesDeep<
  Omit<ExecuteWebhook, "wait">
>;
