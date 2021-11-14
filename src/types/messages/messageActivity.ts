import { MessageActivityTypes } from "./messageActivityTypes.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface MessageActivity {
  /** Type of message activity */
  type: MessageActivityTypes;
  /** `party_id` from a Rich Presence event */
  partyId?: string;
}
