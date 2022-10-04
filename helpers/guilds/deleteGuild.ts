import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to delete.
 *
 * @remarks
 * The bot user must be the owner of the guild.
 *
 * Fires a _Guild Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild}
 */
export async function deleteGuild(bot: Bot, guildId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD(guildId));
}
