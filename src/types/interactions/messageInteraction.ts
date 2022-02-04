import { User } from "../users/user.ts";
import { GuildMember } from "../members/guildMember.ts";
import { InteractionTypes } from "./interactionTypes.ts";

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
  /** Id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The name of the ApplicationCommand */
  name: string;
  /** The user who invoked the interaction */
  user: User;
  /** The member who invoked the interaction in the guild */
  member?: Partial<GuildMember>;
}
