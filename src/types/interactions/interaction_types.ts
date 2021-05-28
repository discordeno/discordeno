/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum DiscordInteractionTypes {
  Ping = 1,
  ApplicationCommand,
  MessageComponent,
}

export type InteractionTypes = DiscordInteractionTypes;
export const InteractionTypes = DiscordInteractionTypes;
