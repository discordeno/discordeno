import { Channel } from "../../channels/channel.ts";
import { DiscordMember } from "../../discord.ts";
import { Role } from "../../permissions/role.ts";
import { ApplicationCommandOptionTypes } from "./applicationCommandOptionTypes.ts";

export type InteractionDataOption = {
  /** the name of the parameter */
  name: string;
  /** value of application command option type */
  type: ApplicationCommandOptionTypes;
  /** the value of the pair */
  value?: string | boolean | number | DiscordMember | Channel | Role;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
};
