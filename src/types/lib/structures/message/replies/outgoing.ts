export interface DiscordReference {
  /** The id of the originating message */
  // deno-lint-ignore camelcase
  message_id?: string;
  /** The id of the originating message's channel */
  // deno-lint-ignore camelcase
  channel_id?: string;
  /** The id of the originating message's guild */
  // deno-lint-ignore camelcase
  guild_id?: string;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default false */
  // deno-lint-ignore camelcase
  fail_if_not_exists?: boolean;
}
