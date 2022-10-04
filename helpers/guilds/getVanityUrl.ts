import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

export type VanityUrl = {
  code: string | null;
  uses: number;
};

// TODO: Move `VanityUrl` into its own transformer file.

/**
 * Gets information about the vanity url of a guild.
 *
 * @param bot - The bot instance used to make the request
 * @param guildId - The ID of the guild to get the vanity url information for.
 * @returns An instance of {@link VanityUrl}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * The `code` property will be `null` if the guild does not have a set vanity url.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-vanity-url}
 */
export async function getVanityUrl(bot: Bot, guildId: BigString): Promise<VanityUrl> {
  return await bot.rest.runMethod<VanityUrl>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_VANITY_URL(guildId),
  );
}
