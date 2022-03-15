import type { Bot } from "../../../bot.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

/** Fetches the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getApplicationCommand(bot: Bot, commandId: bigint, guildId?: bigint) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "get",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, commandId),
  );

  return bot.transformers.applicationCommand(bot, result);
}
