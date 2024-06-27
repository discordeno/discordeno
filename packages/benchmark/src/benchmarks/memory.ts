import { type Bot, createBot } from '@discordeno/bot'
import { events as dbEvents } from '../utils/db.js'
import { memoryBenchmark } from '../utils/memoryBenchmark.js'

/* Example Usage
deno run --v8-flags="--expose-gc" -A .\index.ts
*/
/*
import { createBot } from "https://deno.land/x/discordeno@17.1.0/mod.ts";
import { enableCachePlugin } from "https://deno.land/x/discordeno@17.1.0/plugins/mod.ts";
memoryBenchmark(() => enableCachePlugin(createBot({
  token: " ",
  botId: 0n,
})))
*/

const enableCachePlugin = (bot: Bot): Bot => bot

await memoryBenchmark(
  '[Cache Plugin]',
  () =>
    enableCachePlugin(
      createBot({
        token: ' ',
        applicationId: 1n,
        events: {},
      }),
    ),
  (bot, event) => {
    // @ts-expect-error it works
    bot.events[
      event.payload.t!.toLowerCase().replace(/_([a-z])/g, (g) => {
        return g[1].toUpperCase()
      })
    ]?.(event.payload.d, {})
  },
  dbEvents.filter((event) => event.payload.t),
)
