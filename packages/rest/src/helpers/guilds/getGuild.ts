import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordGuild } from '@discordeno/types'
import type { RestManager } from '../../../../rest/src/restManager.js'

/**
 * Gets a guild by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get.
 * @param options - The parameters for the fetching of the guild.
 * @returns An instance of {@link Guild}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild}
 */
export async function getGuild (
  rest: RestManager,
  guildId: BigString,
  options: { counts?: boolean } = {
    counts: true
  }
): Promise<Camelize<DiscordGuild>> {
  const result = await rest.runMethod<DiscordGuild>(
    'GET',
    routes.GUILD(guildId, options.counts)
  )

  return TRANSFORMERS.guild(result)
}
