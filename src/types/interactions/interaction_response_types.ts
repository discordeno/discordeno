/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype */
export enum DiscordInteractionResponseTypes {
  /** ACK a `Ping` */
  Pong = 1,
  /** Respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource = 5,
}
