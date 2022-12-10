import type { DiscordVoiceRegion } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { VoiceRegions } from '../../../transformers/voiceRegion.js'

/**
 * Gets the list of available voice regions.
 *
 * @param bot - The bot instance to use to make the request.
 * @returns A collection of {@link VoiceRegions | VoiceRegion} objects assorted by voice region ID.
 */
export async function getAvailableVoiceRegions (
  rest: RestManager
): Promise<Collection<string, VoiceRegions>> {
  const results = await rest.runMethod<DiscordVoiceRegion[]>(
    rest,
    'GET',
    rest.constants.routes.VOICE_REGIONS()
  )

  return new Collection(
    results.map((result) => {
      const region = rest.transformers.voiceRegion(rest, result)
      return [region.id, region]
    })
  )
}
