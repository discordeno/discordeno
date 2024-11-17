import { ActivityTypes } from '@discordeno/bot'
import { bot } from '../bot.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger({ name: 'Event: Ready' })

bot.events.ready = async ({ shardId }) => {
  logger.info('Bot Ready')

  await bot.gateway.editShardStatus(shardId, {
    status: 'online',
    activities: [
      {
        name: 'Discordeno is the Best Lib',
        type: ActivityTypes.Playing,
        timestamps: {
          start: Date.now(),
        },
      },
    ],
  })
}
