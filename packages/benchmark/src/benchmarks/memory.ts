import type { Bot } from '@discordeno/bot'
import { createBot } from '@discordeno/bot'
import { events } from '../utils/db.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function memoryBenchmarks(
  botCreator: () => any,
  options: { times: number; log: boolean; table: boolean } = {
    times: 3,
    log: false,
    table: true,
  },
) {
  let gcEnable = false
  let garbageCollect = (): void => {}
  try {
    // @ts-expect-error
    global.gc()
    gcEnable = true
  } catch (error) {
    // @ts-expect-error
    if (error.message === 'TypeError: global.gc is not a function') {
      console.error(`[WARN] add the flag "--expose-gc" for higher accuracy, or change options.times to 1`)
    }
  }
  // @ts-expect-error
  if (gcEnable) garbageCollect = global.gc

  const stages = ['start', 'loaded', 'end', 'cached'] as const
  const typesOfMemUsages = ['rss', 'heapUsed', 'heapTotal'] as const

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function runTest(bot: any) {
    // Determine memory stats now before touching anything
    const results: {
      start: NodeJS.MemoryUsage
      loaded?: NodeJS.MemoryUsage
      end?: NodeJS.MemoryUsage
      cached?: NodeJS.MemoryUsage
    } = {
      start: process.memoryUsage(),
    }
    garbageCollect()
    results.start = process.memoryUsage()
    if (options.log) console.log(`[INFO] Loading json files.`)

    if (options.log) {
      console.log(`[INFO] DB files loaded into memory.`, events.length)
    }
    // Set the memory stats for when files are loaded in.
    results.loaded = process.memoryUsage()

    events.forEach((event) => {
      if (!event.payload.t) return
      bot.events[
        event.payload.t.toLowerCase().replace(/_([a-z])/g, function (g) {
          return g[1].toUpperCase()
        })
      ]?.(event.payload.d, {})
    })

    if (options.log) {
      console.log(`[INFO] Processed ${events.length} events.`)
    }

    // Set results for data once all events are processed
    results.end = process.memoryUsage()
    // @ts-expect-error
    results.cached = {}
    for (const typeOfMemUsage of typesOfMemUsages) {
      results.cached![typeOfMemUsage] = results.end[typeOfMemUsage] - results.loaded[typeOfMemUsage]
    }

    if (options.log) {
      console.log(
        'channels',
        bot.channels.size.toLocaleString(),
        'guilds',
        bot.guilds.size.toLocaleString(),
        'members',
        bot.members.size.toLocaleString(),
        'users',
        bot.users.size.toLocaleString(),
        'messages',
        bot.messages.size.toLocaleString(),
        'presences',
        bot.presences.size.toLocaleString(),
      )
    }

    return results
  }

  const allResults = {
    start: {
      rss: [] as number[],
      heapUsed: [] as number[],
      heapTotal: [] as number[],
    },
    loaded: {
      rss: [] as number[],
      heapUsed: [] as number[],
      heapTotal: [] as number[],
    },
    end: {
      rss: [] as number[],
      heapUsed: [] as number[],
      heapTotal: [] as number[],
    },
    cached: {
      rss: [] as number[],
      heapUsed: [] as number[],
      heapTotal: [] as number[],
    },
  }

  const BYTES = 1000000

  for (let index = 0; index < options.times; index++) {
    if (options.log) console.log('running the', index + 1, 'time')
    const currentResult = await runTest(botCreator())
    for (const typeOfMemUsage of typesOfMemUsages) {
      for (const stage of stages) {
        allResults[stage][typeOfMemUsage].push(currentResult[stage]![typeOfMemUsage])
      }
    }
  }

  type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never

  const tableRows = ['Starting', 'Loaded', 'End', 'Cached'] as const
  const tableFields = ['RSS', 'Heap Used', 'Heap Total'] as const

  const preprocessedResults: {
    [K in ArrayElement<typeof tableRows>]?: {
      [K in ArrayElement<typeof tableFields>]?: {
        value: number
        min: number
        max: number
      }
    }
  } = {}

  for (const [index, tableRow] of tableRows.entries()) {
    for (const [index2, tableField] of tableFields.entries()) {
      if (index2 === 0) preprocessedResults[tableRow] = {}
      preprocessedResults[tableRow]![tableField] = {
        value:
          Math.round(
            (allResults[stages[index]][typesOfMemUsages[index2]].reduce((acc, c) => acc + c, 0) / allResults.start.rss.length / BYTES) * 100,
          ) / 100,
        min: Math.round((Math.min(...allResults[stages[index]][typesOfMemUsages[index2]]) / BYTES) * 100) / 100,
        max: Math.round((Math.max(...allResults[stages[index]][typesOfMemUsages[index2]]) / BYTES) * 100) / 100,
      }
    }
  }

  const processedResults = preprocessedResults as {
    [K in ArrayElement<typeof tableRows>]: {
      [K in ArrayElement<typeof tableFields>]: {
        value: number
        min: number
        max: number
      }
    }
  }

  const humanReadable: {
    [K in ArrayElement<typeof tableRows>]?: {
      [K in ArrayElement<typeof tableFields>]?: string
    }
  } = {}

  for (const tableRow of tableRows) {
    for (const [index, tableField] of tableFields.entries()) {
      if (index === 0) humanReadable[tableRow] = {}
      humanReadable[tableRow]![
        tableField
      ] = `${processedResults[tableRow][tableField].value} MB (${processedResults[tableRow][tableField].min} MB … ${processedResults[tableRow][tableField].max} MB)`
    }
  }

  if (options.table) console.table(humanReadable)

  return processedResults
}

/* Example Usage
deno run --v8-flags="--expose-gc" -A .\index.ts
*/
/*
import { createBot } from "https://deno.land/x/discordeno@17.1.0/mod.ts";
import { enableCachePlugin } from "https://deno.land/x/discordeno@17.1.0/plugins/mod.ts";
memoryBenchmarks(() => enableCachePlugin(createBot({
  token: " ",
  botId: 0n,
})))
*/

const enableCachePlugin = (bot: Bot): Bot => bot

const results = await memoryBenchmarks(() =>
  enableCachePlugin(
    createBot({
      token: ' ',
      events: {},
    }),
  ),
)

for (const resultKey of Object.keys(results.Cached) as Array<keyof typeof results.Cached>) {
  console.log(
    `[Cache Plugin] ${resultKey.toString()} x ${results.Cached[resultKey].value} MB ±${
      (Math.max(Math.round((results.Cached[resultKey].min / results.Cached[resultKey].value) * 100) / 100),
      Math.round((results.Cached[resultKey].max / results.Cached[resultKey].value) * 100) / 100)
    }% (3 runs sampled)`,
  )
}
