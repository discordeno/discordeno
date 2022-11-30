import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Deletes an integration attached to a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild from which to delete the integration.
 * @param integrationId - The ID of the integration to delete from the guild.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
 *
 * Fires a _Guild Integrations Update_ gateway event.
 * Fires a _Integration Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
 */
export async function deleteIntegration(bot: Bot, guildId: BigString, integrationId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_INTEGRATION(guildId, integrationId),
  );
}
