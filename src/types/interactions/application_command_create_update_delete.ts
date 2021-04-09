import { SnakeCasedPropertiesDeep } from "../util.ts";
import { ApplicationCommand } from "./application_command.ts";

export interface ApplicationCommandCreateUpdateDelete
  extends ApplicationCommand {
  /** Id of the guild the command is in */
  guildId?: string;
}

/** https://discord.com/developers/docs/topics/gateway#application-command-delete-application-command-extra-fields */
export type DiscordApplicationCommandCreateUpdateDelete =
  SnakeCasedPropertiesDeep<ApplicationCommandCreateUpdateDelete>;
