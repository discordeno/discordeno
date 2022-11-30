import { createBot, createRestManager } from '../mod.ts'
import { dotenv } from './deps.ts'

dotenv({ export: true, path: `${Deno.cwd()}/.env` })

export function loadBot () {
  const token = process.env.DISCORD_TOKEN
  if (!token) throw new Error('Token was not provided.')

  const bot = createBot({
    token,
    botGatewayData: {
      url: 'wss://gateway.discord.gg',
      shards: 1,
      sessionStartLimit: {
        maxConcurrency: 1,
        remaining: 1000,
        resetAfter: Date.now() + 1000 * 60 * 60 * 24,
        total: 1000
      }
    }
  })

  bot.rest = createRestManager({
    token,
    customUrl: process.env.PROXY_REST_URL,
    secretKey: process.env.PROXY_REST_SECRET
  })

  return bot
}
