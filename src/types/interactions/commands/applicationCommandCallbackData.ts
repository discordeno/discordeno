import { CreateMessage } from "../../messages/createMessage.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData extends Omit<CreateMessage, "messageReference"> {
  /** Set to `64` to make your response ephemeral */
  flags?: number;
}
