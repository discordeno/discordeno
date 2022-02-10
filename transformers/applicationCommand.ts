import { Bot } from "../bot.ts";
import { ApplicationCommand } from "../types/interactions/commands/applicationCommand.ts";
import { ApplicationCommandTypes } from "../types/interactions/commands/applicationCommandTypes.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoApplicationCommandOption } from "./applicationCommandOption.ts";

export function transformApplicationCommand(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<ApplicationCommand>,
): DiscordenoApplicationCommand {
  return {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    name: payload.name,
    description: payload.description,
    defaultPermission: payload.default_permission ?? false,
    type: payload.type,
    version: payload.version,

    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
  };
}

export interface DiscordenoApplicationCommand {
  /** Unique id of the command */
  id: bigint;
  /** Unique id of the parent application */
  applicationId: bigint;
  /** Guild id of the command, if not global */
  guildId?: bigint;
  /** 1-32 character name matching */
  name: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: DiscordenoApplicationCommandOption[];
  /** Whether the command is enbaled by default when the app is added to a guild */
  defaultPermission?: boolean;
  /** The type of command. By default this is a application command(ChatInput). */
  type?: ApplicationCommandTypes;
  /** Autoincrementing version identifier updated during substantial record changes */
  version: string;
}
