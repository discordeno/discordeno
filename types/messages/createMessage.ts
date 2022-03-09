import { AllowedMentions } from "../messages/allowedMentions.ts";
import { FileContent } from "../discordeno/fileContent.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { MessageComponents } from "./components/messageComponents.ts";

export interface CreateMessage {
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
  /** Include to make your message a reply */
  messageReference?: {
    /** id of the originating message */
    messageId?: bigint;
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channelId?: bigint;
    /** id of the originating message's guild */
    guildId?: bigint;
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    failIfNotExists: boolean;
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}

/** https://discord.com/developers/docs/resources/channel#create-message */
export type DiscordCreateMessage = SnakeCasedPropertiesDeep<Omit<CreateMessage, "file">>;
