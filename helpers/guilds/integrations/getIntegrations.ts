import type { Bot } from "../../../bot.ts";
import { Integration } from "../../../transformers/integration.ts";
import { DiscordIntegration } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the list of integrations attached to a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of integrations from.
 * @returns A collection of {@link Integration} objects assorted by integration ID.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
 */
export async function getIntegrations(bot: Bot, guildId: BigString): Promise<Collection<bigint, Integration>> {
  const results = await bot.rest.runMethod<DiscordIntegration[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INTEGRATIONS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const integration = bot.transformers.integration(bot, {
        guild_id: guildId.toString(),
        id: result.id,
        name: result.name,
        type: result.type,
        enabled: result.enabled,
        syncing: result.syncing,
        role_id: result.role_id,
        enable_emoticons: result.enable_emoticons,
        expire_behavior: result.expire_behavior,
        expire_grace_period: result.expire_grace_period,
        user: result.user,
        account: result.account,
        synced_at: result.synced_at,
        subscriber_count: result.subscriber_count,
        revoked: result.revoked,
        application: result.application,
        scopes: result.scopes,
      });
      return [integration.id, integration];
    }),
  );
}
