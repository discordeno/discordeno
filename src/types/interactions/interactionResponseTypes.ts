/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype */
export enum InteractionResponseTypes {
  /** ACK a `Ping` */
  Pong = 1,
  /** Respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource = 5,
  /** For components, ACK an interaction and edit the original message later; the user does not see a loading state */
  DeferredUpdateMessage,
  /** For components, edit the message the component was attached to */
  UpdateMessage,
  /** For Application Command Options, send an autocomplete result */
  ApplicationCommandAutocompleteResult,
}
