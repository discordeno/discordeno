import { Message } from "../messages/message.ts";
import { User } from "../users/user.ts";
import { InteractionData } from "./commands/applicationCommandInteractionData.ts";
import { InteractionGuildMember } from "./interactionGuildMember.ts";
import { InteractionTypes } from "./interactionTypes.ts";

export interface Interaction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The guild it was sent from */
  guildId?: string;
  /** The channel it was sent from */
  channelId?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: InteractionGuildMember;
  /** User object for the invoking user, if invoked in a DM */
  user?: User;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
  /** For the message the button was attached to */
  message?: Message;

  data?: InteractionData;

  /** The selected language of the invoking user */
  locale: string;
  /** The guild's preferred locale, if invoked in a guild */
  guildLocale: string;
}
