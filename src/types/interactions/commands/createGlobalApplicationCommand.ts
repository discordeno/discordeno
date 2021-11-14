import { ApplicationCommandOption } from "./applicationCommandOption.ts";
import { ApplicationCommandTypes } from "./applicationCommandTypes.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command-json-params */
export interface CreateGlobalApplicationCommand {
  /** 1-31 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** The type of the command */
  type?: ApplicationCommandTypes;
  /** The parameters for the command */
  options?: ApplicationCommandOption[];
}

export interface CreateGlobalContextMenuCommand {
  /** 1-31 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** The type of the command */
  type: ApplicationCommandTypes;
}
