import type { Bot } from "../../bot.ts";

/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
export async function deleteIntegration(bot: Bot, guildId: bigint, id: bigint) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.GUILD_INTEGRATION(guildId, id)
  );
}
