export async function memoryBenchmark<O, E>(
  name: string,
  objectCreator: () => O,
  objectFeeder: (object: O, event: E) => void,
  events: E[],
  options: { times: number; log: boolean; table: boolean } = {
    times: 3,
    log: false,
    table: false,
  },
): Promise<void> {
  const garbageCollect = global.gc ?? (() => {})

  const stages = ['start', 'loaded', 'end', 'cached'] as const
  const typesOfMemUsages = ['rss', 'heapUsed', 'heapTotal'] as const

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function runTest(object: O) {
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

    // events.forEach((event, i) => {
    //   console.log('logging event', i)
    //   objectFeeder(object, event)
    // })
    for (const event of events) {
      objectFeeder(object, event)
    }

    if (options.log) {
      console.log(`[INFO] Processed ${events.length} events.`)
    }

    // Set results for data once all events are processed
    results.end = process.memoryUsage()

    // @ts-expect-error init the object
    results.cached = {}
    for (const typeOfMemUsage of typesOfMemUsages) {
      results.cached![typeOfMemUsage] = results.end[typeOfMemUsage] - results.loaded[typeOfMemUsage]
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
    const currentResult = await runTest(objectCreator())
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

  for (const resultKey of Object.keys(processedResults.Cached) as Array<keyof typeof processedResults.Cached>) {
    const range = Math.max(
      Math.round((processedResults.Cached[resultKey].min / processedResults.Cached[resultKey].value) * 100) / 100,
      Math.round((processedResults.Cached[resultKey].max / processedResults.Cached[resultKey].value) * 100) / 100,
    )

    console.log(`${name} ${resultKey.toString()} x ${processedResults.Cached[resultKey].value} MB ±${isFinite(range) ? range : 0}% (3 runs sampled)`)
  }
}
