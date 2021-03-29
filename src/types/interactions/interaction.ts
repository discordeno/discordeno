import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";
import { ApplicationCommandCallbackData } from "./application_command_callback_data.ts";
import { InteractionTypes } from "./interaction_types.ts";

export interface Interaction {
  /** Id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionTypes;
  /** The command data payload */
  data?: ApplicationCommandCallbackData;
  /** The guild it was sent from */
  guildId?: string;
  /** The channel it was sent from */
  channelId?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: GuildMember;
  /** User object for the invoking user, if invoked in a DM */
  user?: User;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export type DiscordInteraction = SnakeCaseProps<Interaction>;
