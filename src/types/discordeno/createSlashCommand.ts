import { CreateGlobalApplicationCommand } from "../interactions/commands/create_global_application_command.ts";

export interface DiscordenoCreateApplicationCommand extends CreateGlobalApplicationCommand {
  /** Id of the guild to create a guild only application command */
  guildId: string;
}
