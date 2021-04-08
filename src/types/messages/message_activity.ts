import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscordMessageActivityTypes } from "./message_activity_types.ts";

export interface MessageActivity {
  /** Type of message activity */
  type: DiscordMessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  partyId?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export type DiscordMessageActivity = SnakeCasedPropertiesDeep<MessageActivity>;
