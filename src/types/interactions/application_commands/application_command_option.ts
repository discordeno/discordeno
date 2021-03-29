import { SnakeCaseProps } from "../../util.ts";

export interface ApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: number;
  /** 1-32 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** If the parameter is required or optional--default `false` */
  required?: boolean;
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[];
  /** If the optino is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export type DiscordApplicationOption = SnakeCaseProps<ApplicationCommandOption>;
