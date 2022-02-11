import { InteractionApplicationCommandCallbackData } from "./commands/applicationCommandCallbackData.ts";
import { InteractionResponseTypes } from "./interactionResponseTypes.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}
