import { Message } from "../messages/message.ts";
import { User } from "../users/user.ts";
import { ApplicationCommandInteractionData } from "./commands/application_command_interaction_data.ts";
import { InteractionGuildMember } from "./interaction_guild_member.ts";
import { DiscordInteractionTypes } from "./interaction_types.ts";
import { SelectMenuData } from "../messages/components/select_data.ts";
import { ButtonData } from "../messages/components/button_data.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface Interaction extends BaseInteraction {
  /** The command data payload */
  data?: ApplicationCommandInteractionData | ButtonData | SelectMenuData;
}

export interface SlashCommandInteraction extends BaseInteraction {
  type: DiscordInteractionTypes.ApplicationCommand;
  data?: ApplicationCommandInteractionData;
}

export interface ComponentInteraction extends BaseInteraction {
  type: DiscordInteractionTypes.MessageComponent;
  data?: ButtonData | SelectMenuData;
}

export interface BaseInteraction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: DiscordInteractionTypes;
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
}
