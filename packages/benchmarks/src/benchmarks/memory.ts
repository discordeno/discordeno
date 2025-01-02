import { createBot, snakeToCamelCase } from '@discordeno/bot'
import { events as dbEvents } from '../utils/db.js'
import { memoryBenchmark } from '../utils/memoryBenchmark.js'

await memoryBenchmark(
  '[Cache Plugin]',
  () =>
    createBot({
      token: ' ',
      applicationId: 1n,
      events: {},
    }),
  (bot, event) => {
    const eventName = snakeToCamelCase(event.payload.t!)
    bot.events[eventName as keyof typeof bot.events]?.(event.payload.d as never, {})
  },
  dbEvents.filter((event) => event.payload.t),
)
