import { CreateGlobalApplicationCommand } from "../interactions/commands/createGlobalApplicationCommand.ts";

export interface DiscordenoCreateApplicationCommand extends CreateGlobalApplicationCommand {
  /** Id of the guild to create a guild only application command */
  guildId: string;
}
