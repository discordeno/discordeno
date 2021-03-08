import { DiscordMessageActivityTypes } from "./types.ts";

export interface DiscordMessageActivity {
  /** type of message activity */
  type: DiscordMessageActivityTypes;
  /** party_id from a Rich Presence event */
  // deno-lint-ignore camelcase
  party_id?: string;
}

