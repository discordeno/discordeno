import type {Bot} from "../../bot.ts";

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(bot: Bot, guildId: bigint, id: bigint) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.GUILD_ROLE(guildId, id));
}
