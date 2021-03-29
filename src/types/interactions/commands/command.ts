import { SnakeCaseProps } from "../../util.ts";
import { CommandOption } from "./command_option.ts";

export interface Command {
  /** Unique id of the command */
  id: string;
  /** Unique id of the parent application */
  applicationId: string;
  /** 1-32 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** The parameters for the command */
  options?: CommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export type DiscordCommand = SnakeCaseProps<Command>;
