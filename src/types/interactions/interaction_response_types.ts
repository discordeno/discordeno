/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype */
export enum DiscordInteractionResponseTypes {
  /** ACK a `Ping` */
  Pong = 1,
  /** Respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource = 5,
  /** It has no data fields. You can send this type **only in response to a button interaction .** It will acknowledge the interaction and update the button to a loading state. */
  DeferredMessageUpdate,
  /** Can be sent in response to a button interaction to immediately update the message to which the button was attached. For example, to remove buttons on a message in response to a button click */
  UpdateMessage,
}

export type InteractionResponseTypes = DiscordInteractionResponseTypes;
export const InteractionResponseTypes = DiscordInteractionResponseTypes;
