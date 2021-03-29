import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";
import { InteractionTypes } from "./interaction_types.ts";

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

/** https://discord.com/developers/docs/interactions/slash-commands#messageinteraction */
export type DiscordMessageInteraction = SnakeCaseProps<MessageInteraction>;
