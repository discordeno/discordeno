import { camelize, snakelize } from '@discordeno/utils'
import { suite } from '../benchmarkSuite.js'
import { events } from '../utils/db.js'

const camelizedEvents: any[] = []

events.forEach((event) => {
  camelizedEvents.push(camelize(event))
})

suite.add(`Camelize 1 event`, () => {
  camelize(events[1])
})

suite.add(`Snakelize 1 event`, () => {
  snakelize(camelizedEvents[1])
})
