import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "../messages/allowedMentions.ts";
import { FileContent } from "../discordeno/fileContent.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { MessageComponents } from "../messages/components/messageComponents.ts";

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: bigint;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatarUrl?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** Embedded `rich` content */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: Omit<AllowedMentions, "users" | "roles"> & {
    /** Array of role_ids to mention (Max size of 100) */
    roles?: bigint[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: bigint[];
  };
  /** the components to include with the message */
  components: MessageComponents;
}

export type DiscordExecuteWebhook = SnakeCasedPropertiesDeep<Omit<ExecuteWebhook, "wait">>;
