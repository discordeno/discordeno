import type { Integration } from "../../types/integrations/integration.ts";
import type { Bot } from "../../bot.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<Integration>(bot.rest, "get", bot.constants.endpoints.GUILD_INTEGRATIONS(guildId));
}
