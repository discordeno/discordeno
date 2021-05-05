import { Embed } from "../embeds/embed.ts";
import { FileContent } from "../misc/file_content.ts";
import { AllowedMentions } from "./allowed_mentions.ts";
import { Attachment } from "./attachment.ts";

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content */
  embed?: Embed | null;
  /** Edit the flags of the message (only `SUPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[] | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions | null;
  /** Attached files to keep */
  attachments?: Attachment | null;
}
