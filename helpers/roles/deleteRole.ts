import type { Bot } from "../../bot.ts";

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(bot: Bot, guildId: bigint, id: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.routes.GUILD_ROLE(guildId, id));
}
