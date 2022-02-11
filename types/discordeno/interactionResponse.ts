import { InteractionResponse } from "../interactions/interactionResponse.ts";

export interface DiscordenoInteractionResponse extends InteractionResponse {
  /** Set to true if the response should be private */
  private?: boolean;
}
