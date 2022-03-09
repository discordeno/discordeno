import { Embed } from "../../discordeno.ts";
import { FileContent } from "../../discordeno/fileContent.ts";
import { AllowedMentions } from "../../messages/allowedMentions.ts";
import { MessageComponents } from "../../messages/components/messageComponents.ts";
import { ApplicationCommandOptionChoice } from "./applicationCommandOptionChoice.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: Omit<AllowedMentions, "users" | "roles"> & {
    /** Array of role_ids to mention (Max size of 100) */
    roles?: bigint[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: bigint[];
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The customId you want to use for this modal response. */
  customId?: string;
  /** The title you want to use for this modal response. */
  title?: string;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}
