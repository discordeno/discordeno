/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum DiscordMessageFlags {
  /** This message has been published to subscribed channels (via Channel Following) */
  CROSSPOSTED = 1 << 0,
  /** This message originated from a message in another channel (via Channel Following) */
  IS_CROSSPOST = 1 << 1,
  /** Do not include any embeds when serializing this message */
  SUPPRESS_EMBEDS = 1 << 2,
  /** The source message for this crosspost has been deleted (via Channel Following) */
  SOURCE_MESSAGE_DELETED = 1 << 3,
  /** This message came from the urgent message system */
  URGENT = 1 << 4,
  /** This message is only visible to the user who invoked the Interaction */
  EMPHERAL = 1 << 6,
  /** This message is an Interaction Response and the bot is "thinking" */
  LOADING = 1 << 7,
}
