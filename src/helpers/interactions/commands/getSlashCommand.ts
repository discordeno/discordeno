import type { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import type { Bot } from "../../../bot.ts";

/** Fetches the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getSlashCommand(bot: Bot, commandId: bigint, guildId?: bigint) {
  const result = await bot.rest.runMethod<ApplicationCommand>(
    bot.rest,
    "get",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, commandId)
  );

  return {
    ...result,
    id: bot.transformers.snowflake(result.id),
    applicationId: bot.transformers.snowflake(result.application_id),
  };
}
