import { BotWithCache } from '../../../deps.js'
import { connectToVoiceChannel } from './connectToVoiceChannels.js'

export function voice (bot: BotWithCache) {
  connectToVoiceChannel(bot)
}
