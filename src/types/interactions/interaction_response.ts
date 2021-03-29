import { SnakeCaseProps } from "../util.ts";

export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: ApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export type DiscordInteractionResponse = SnakeCaseProps<InteractionResponse>;
