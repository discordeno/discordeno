import { DiscordReference } from "./outgoing.ts";

export interface DiscordReferencePayload extends DiscordReference {
  /** The id of the originating message's channel */
  // deno-lint-ignore camelcase
  channel_id: string;
}
