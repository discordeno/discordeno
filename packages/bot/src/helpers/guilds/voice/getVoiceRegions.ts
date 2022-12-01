import { BigString, DiscordVoiceRegion } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot } from '../../../bot.js'
import { VoiceRegions } from '../../../transformers/voiceRegion.js'

/**
 * Gets the list of voice regions for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the voice regions for.
 * @returns A collection of {@link VoiceRegions | VoiceRegion} objects assorted by voice region ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-voice-regions}
 */
export async function getVoiceRegions (bot: Bot, guildId: BigString): Promise<Collection<string, VoiceRegions>> {
  const results = await bot.rest.runMethod<DiscordVoiceRegion[]>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_REGIONS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const region = bot.transformers.voiceRegion(bot, result)
      return [region.id, region]
    })
  )
}
