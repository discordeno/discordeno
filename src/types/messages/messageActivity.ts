import { DiscordMessageActivityTypes } from "./message_activity_types.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface MessageActivity {
  /** Type of message activity */
  type: DiscordMessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  partyId?: string;
}
