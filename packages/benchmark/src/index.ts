import { camelize, snakelize } from '@discordeno/utils'
import Benchmark from 'benchmark'
import fs from 'node:fs/promises'

const events: any[] = []
const camelizedEvents: any[] = []

const files = await fs.readdir('db/events')

await Promise.all(
  files.map(async (file) => {
    const eventsInFile = Object.values(await fs.readFile(`db/events/${file}`, 'utf8').then((text) => JSON.parse(text)))
    eventsInFile.forEach((eventInFile) => {
      if (typeof eventInFile === 'string') return
      events.push(eventInFile)
    })
  }),
)

events.forEach((event) => {
  camelizedEvents.push(camelize(event))
})

const suite = new Benchmark.Suite()

suite.add(`Camelize ${events.length} events`, () => {
  events.forEach((event) => {
    camelize(event)
  })
})

suite.add(`Snakelize ${events.length} events`, () => {
  camelizedEvents.forEach((event) => {
    snakelize(event)
  })
})

suite
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .run()
