import dotenv from 'dotenv'
import { createGatewayManager } from './manager.js'

dotenv.config({ path: '../../.env' })

if (!process.env.DISCORD_TOKEN) throw new Error('Token was not provided.')
export const token = process.env.DISCORD_TOKEN

const manager = createGatewayManager({
  token,
  connection: {
    url: 'wss://gateway.discord.gg',
    shards: 1,
    sessionStartLimit: {
      total: 1,
      maxConcurrency: 1,
      remaining: 1000,
      resetAfter: Date.now() + 60000 * 24,
    },
  },
  events: {},
})

console.log('SPAWNING')
await manager.spawnShards()
console.log('SPAWNED')
