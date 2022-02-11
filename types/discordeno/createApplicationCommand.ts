import { CreateApplicationCommand } from "../interactions/commands/createGlobalApplicationCommand.ts";

export interface DiscordenoCreateApplicationCommand extends CreateApplicationCommand {
  /** Id of the guild to create a guild only application command */
  guildId: string;
}
