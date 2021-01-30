import { Embed } from "./embed.ts";

export interface ExecuteWebhookOptions {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to false; when false a message that is not saved does not return an error) */
  wait?: boolean;
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook*/
  "avatar_url"?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** file contents	the contents of the file being sent	one of content, file, embeds */
  file?: { blob: unknown; name: string };
  /** array of up to 10 embed objects	embedded rich content. */
  embeds?: Embed[];
  /** allowed mentions for the message */
  mentions?: {
    /** An array of allowed mention types to parse from the content. */
    parse: ("roles" | "users" | "everyone")[];
    /** Array of role_ids to mention (Max size of 100) */
    roles?: string[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: string[];
  };
}
