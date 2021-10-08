import { ApplicationCommandOption } from "./application_command_option.ts";
import { ApplicationCommandTypes } from "./application_command_types.ts";

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
  /** Whether the command is enabled by default when the app is added to a guild */
  defaultPermission?: boolean;
  /** The type of command. By default, this is a slash command(ChatInput). */
  type?: ApplicationCommandTypes;
}
