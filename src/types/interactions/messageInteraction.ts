import { User } from "../users/user.ts";
import { InteractionTypes } from "./interactionTypes.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#messageinteraction */
export interface MessageInteraction {
  /** Id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The name of the ApplicationCommand */
  name: string;
  /** The user who invoked the interaction */
  user: User;
}
