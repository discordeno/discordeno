import { FileContent } from "../discordeno/fileContent.ts";
import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "./allowedMentions.ts";
import { Attachment } from "./attachment.ts";
import { MessageComponents } from "./components/messageComponents.ts";

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[] | null;
  /** Edit the flags of the message (only `SUPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[] | null;
  /** Allowed mentions for the message */
  allowedMentions?:
    | (Omit<AllowedMentions, "users" | "roles"> & {
      /** Array of role_ids to mention (Max size of 100) */
      roles?: bigint[];
      /** Array of user_ids to mention (Max size of 100) */
      users?: bigint[];
    })
    | null;
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
