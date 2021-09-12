import { Message } from "../messages/message.ts";
import { User } from "../users/user.ts";
import { ApplicationCommandInteractionData } from "./commands/application_command_interaction_data.ts";
import { InteractionGuildMember } from "./interaction_guild_member.ts";
import { DiscordInteractionTypes } from "./interaction_types.ts";
import { SelectMenuData } from "../messages/components/select_data.ts";
import { ButtonData } from "../messages/components/button_data.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export type Interaction = PingInteraction | SlashCommandInteraction | ComponentInteraction;

export type PingInteraction = BaseInteraction<DiscordInteractionTypes.Ping, undefined>;

export type SlashCommandInteraction = BaseInteraction<
  DiscordInteractionTypes.ApplicationCommand,
  ApplicationCommandInteractionData
>;

export type ComponentInteraction = BaseInteraction<
  DiscordInteractionTypes.MessageComponent,
  ButtonData | SelectMenuData
>;

export interface BaseInteraction<
  T extends DiscordInteractionTypes,
  D extends ApplicationCommandInteractionData | ButtonData | SelectMenuData | undefined
> {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: T;
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

  data?: D;
}
