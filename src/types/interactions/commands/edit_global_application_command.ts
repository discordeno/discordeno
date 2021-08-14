import { ApplicationCommandOption } from "./application_command_option.ts";
import { ApplicationCommandTypes } from "./application_command_types.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command-json-params */
export interface EditGlobalApplicationCommand {
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The type of the command */
  type?: ApplicationCommandTypes;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
  /** Whether the command is enabled by default when the app is added to a guild. Default: true */
  defaultPermission?: boolean;
}
