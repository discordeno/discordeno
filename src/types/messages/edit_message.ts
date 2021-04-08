import { Embed } from "../embeds/embed.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { AllowedMentions } from "./allowed_mentions.ts";

export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content */
  embed?: Embed | null;
  /** Edit the flags of the message (only `SUPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions | null;
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export type DiscordEditMessage = SnakeCasedPropertiesDeep<EditMessage>;
