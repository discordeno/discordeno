import { SnakeCasedPropertiesDeep } from "../util.ts";
import { InteractionApplicationCommandCallbackData } from "./application_command_callback_data.ts";
import { InteractionResponseTypes } from "./interaction_response_types.ts";

export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export type DiscordInteractionResponse = SnakeCasedPropertiesDeep<
  InteractionResponse
>;
