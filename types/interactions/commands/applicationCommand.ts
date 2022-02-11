import { ApplicationCommandOption } from "./applicationCommandOption.ts";
import { ApplicationCommandTypes } from "./applicationCommandTypes.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommand {
  /** Unique id of the command */
  id: string;
  /** Unique id of the parent application */
  applicationId: string;
  /** Guild id of the command, if not global */
  guildId?: string;
  /** 1-32 character name matching */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
  /** Whether the command is enbaled by default when the app is added to a guild */
  defaultPermission?: boolean;
  /** The type of command. By default this is a application command(ChatInput). */
  type?: ApplicationCommandTypes;
  /** Autoincrementing version identifier updated during substantial record changes */
  version: string;
}
