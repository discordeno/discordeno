/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface DiscordMessageReference {
  /** id of the originating message */
  message_id?: string;
  /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
  channel_id?: string;
  /** id of the originating message's guild */
  guild_id?: string;
  /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  fail_if_not_exists: boolean;
}
