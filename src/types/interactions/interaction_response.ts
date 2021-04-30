import { InteractionApplicationCommandCallbackData } from "./application_command_callback_data.ts";
import { DiscordInteractionResponseTypes } from "./interaction_response_types.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: DiscordInteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}
