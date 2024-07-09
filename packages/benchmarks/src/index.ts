import fs from 'node:fs/promises'
import { suite } from './benchmarkSuite.js'

const benchmarks = await fs.readdir(new URL('./benchmarks', import.meta.url)).then((files) => files.filter((file) => file.endsWith('.js')))

await Promise.all(benchmarks.map(async (file) => await import(`./benchmarks/${file}`)))

suite
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .run()
