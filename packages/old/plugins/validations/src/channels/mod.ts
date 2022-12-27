import { Bot } from '../../deps.js'
import { threads } from './threads/index.js.js'

export function channels (bot: Bot) {
  threads(bot)

  // TODO: validations createChannel
  // BITRATE IS IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
  // if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000

  // TODO: validations editChannelPositions
  // if (channelPositions.length === 0) {
  //   throw new Error('You must provide at least one channels to be moved.')
  // }
}
