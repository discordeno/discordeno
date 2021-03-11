/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface DiscordMessageReference {
  /** id of the originating message */
  // deno-lint-ignore camelcase
  message_id?: string;
  /** id of the originating message's channel */
  // deno-lint-ignore camelcase
  channel_id?: string;
  /** id of the originating message's guild */
  // deno-lint-ignore camelcase
  guild_id?: string;
}
