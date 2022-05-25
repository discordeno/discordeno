import type { Bot } from "../../../bot.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

/** Fetches the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getApplicationCommand(bot: Bot, commandId: bigint, options?: GetApplicationCommand) {
  let url = options?.guildId
    ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, options.guildId, commandId, options?.withLocalizations)
    : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId, options?.withLocalizations);

  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "get",
    url,
  );

  return bot.transformers.applicationCommand(bot, result);
}

/** https://discord.com/developers/docs/interactions/application-commands#endpoints-query-string-params */
export interface GetApplicationCommand {
  /** Guild ID of the guild in which the command is available if it is a guild-specific command */
  guildId?: bigint;
  /** Whether to include full localization object (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. Default false */
  withLocalizations?: boolean;
}
