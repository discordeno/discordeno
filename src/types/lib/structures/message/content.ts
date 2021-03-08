import { DiscordEmbed } from "./embed/embed.ts";
import { FileContent } from "./file.ts";

export interface MessageContent {
  mentions?: {
    /** An array of allowed mention types to parse from the content. */
    parse?: ("roles" | "users" | "everyone")[];
    /** Array of role_ids to mention (Max size of 100) */
    roles?: string[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: string[];
    /** Should the message author from the original message be mention. By default this is true.  */
    repliedUser?: boolean;
  };
  /** The message contents, up to 2000 characters */
  content?: string;
  /** A nonce that can be used for optimistic message sending. */
  nonce?: number | string;
  /** Whether this is a TextToSpeech message */
  tts?: boolean;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** Embed object */
  embed?: DiscordEmbed;
  /** JSON encoded body of any additional request fields. */
  // deno-lint-ignore camelcase
  payload_json?: string;
  /** If you want to send a reply message, provide the original message id here */
  replyMessageID?: string;
  /** When sending a reply to a message that was deleted, should Discord fail and throw an error. By default we make this false to prevent your bot from crashing. */
  failReplyIfNotExists?: boolean;
}
