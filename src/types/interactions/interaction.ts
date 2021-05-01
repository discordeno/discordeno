import { GuildMemberWithUser } from "../guilds/guild_member.ts";
import { User } from "../users/user.ts";
import { ApplicationCommandInteractionData } from "./application_command_interaction_data.ts";
import { DiscordInteractionTypes } from "./interaction_types.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface Interaction {
  /** Id of the interaction */
  id: string;
  /** Id of the application this interaction is for */
  applicationId: string;
  /** The type of interaction */
  type: DiscordInteractionTypes;
  /** The command data payload */
  data?: ApplicationCommandInteractionData;
  /** The guild it was sent from */
  guildId?: string;
  /** The channel it was sent from */
  channelId?: string;
  /** Guild member data for the invoking user, including permissions */
  member?: GuildMemberWithUser;
  /** User object for the invoking user, if invoked in a DM */
  user?: User;
  /** A continuation token for responding to the interaction */
  token: string;
  /** Read-only property, always `1` */
  version: 1;
}
