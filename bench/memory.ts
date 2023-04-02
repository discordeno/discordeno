import { memoryBenchmarks } from 'https://raw.githubusercontent.com/discordeno/benchmarks/main/index.ts'
import { createBot } from '../mod.ts.js'
import { enableCachePlugin } from '../plugins/mod.ts.js'

const results = await memoryBenchmarks(() =>
  enableCachePlugin(
    createBot({
      applicationId: 1n,
      botId: 0n,
    }),
  ),
)

const output: Array<{
  name: string
  value: number
  range: string
  unit: string
}> = JSON.parse(await Deno.readTextFile('output.txt'))

for (const resultKey of Object.keys(results.Cached) as Array<keyof typeof results.Cached>) {
  output.push({
    name: `[Cache Plugin] ${resultKey.toString()}`,
    value: results.Cached[resultKey].value,
    range: `${results.Cached[resultKey].min} … ${results.Cached[resultKey].max}`,
    unit: 'MB',
  })
}

Deno.writeTextFile('output.txt', JSON.stringify(output, undefined, 2))
