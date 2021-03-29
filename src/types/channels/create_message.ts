import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "../messages/allowed_mentions.ts";
import { MessageReference } from "../messages/message_reference.ts";
import { SnakeCaseProps } from "../util.ts";

export interface CreateMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** A nonce that can be used for optimistic message sending */
  nonce?: number | string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content */
  embed?: Embed;
  /** Allowed mentions for a message */
  allowedMentions?: AllowedMentions;
  /** Include to make your message a reply */
  messageReference?: MessageReference;
}

/** https://discord.com/developers/docs/resources/channel#create-message */
export type DiscordCreateMessage = SnakeCaseProps<CreateMessage>;
