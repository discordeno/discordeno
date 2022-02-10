import { ApplicationCommand } from "./applicationCommand.ts";

/** https://discord.com/developers/docs/topics/gateway#application-command-delete-application-command-extra-fields */
export interface ApplicationCommandCreateUpdateDelete extends ApplicationCommand {
  /** Id of the guild the command is in */
  guildId?: string;
}
