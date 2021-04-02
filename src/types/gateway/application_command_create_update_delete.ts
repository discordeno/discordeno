import { ApplicationCommand } from "../interactions/application_command.ts";
import { SnakeCaseProps } from "../util.ts";

export interface ApplicationCommandCreateUpdateDelete
  extends ApplicationCommand {
  guildId?: string;
}

/** https://discord.com/developers/docs/topics/gateway#application-command-delete-application-command-extra-fields */
export type DiscordApplicationCommandCreateUpdateDelete = SnakeCaseProps<
  ApplicationCommandCreateUpdateDelete
>;
