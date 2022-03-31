import { BotClient } from "../../bot.ts";
import { ApplicationCommandOption, ApplicationCommandTypes, Interaction } from "../../deps.ts";

export interface Command {
  /** The name of this command. */
  name: string;
  /** What does this command do? */
  description: string;
  /** The type of command this is. */
  type: ApplicationCommandTypes;
  /** Whether or not this command is for the dev server only. */
  devOnly?: boolean;
  /** The options for this command */
  options?: ApplicationCommandOption[];
  /** This will be executed when the command is run. */
  execute: (bot: BotClient, interaction: Interaction) => unknown;
}
