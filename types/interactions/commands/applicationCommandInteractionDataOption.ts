import { Channel } from "../../channels/channel.ts";
import { DiscordMember, DiscordRole } from "../../discord.ts";
import { ApplicationCommandOptionTypes } from "./applicationCommandOptionTypes.ts";

export type InteractionDataOption = {
  /** the name of the parameter */
  name: string;
  /** value of application command option type */
  type: ApplicationCommandOptionTypes;
  /** the value of the pair */
  value?: string | boolean | number | DiscordMember | Channel | DiscordRole;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
};
