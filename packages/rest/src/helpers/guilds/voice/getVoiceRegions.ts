import { routes } from '@discordeno/constant'
import type { BigString, DiscordVoiceRegion } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { VoiceRegions } from '../../../transformers/voiceRegion.js'

/**
 * Gets the list of voice regions for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the voice regions for.
 * @returns A collection of {@link VoiceRegions | VoiceRegion} objects assorted by voice region ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-voice-regions}
 */
export async function getVoiceRegions (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, VoiceRegions>> {
  const results = await rest.runMethod<DiscordVoiceRegion[]>(

    'GET',
    routes.GUILD_REGIONS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const region = rest.transformers.voiceRegion(rest, result)
      return [region.id, region]
    })
  )
}
