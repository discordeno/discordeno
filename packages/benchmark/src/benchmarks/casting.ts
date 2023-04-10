import { camelize, camelToSnakeCase, snakelize, snakeToCamelCase } from '@discordeno/utils'
import { suite } from '../benchmarkSuite.js'
import { events } from '../utils/db.js'

const camelizedEvents: any[] = []

events.forEach((event) => {
  camelizedEvents.push(camelize(event))
})

suite.add(`Camelize 1 event`, () => {
  snakelize(events[1])
})

suite.add(`Snakelize 1 event`, () => {
  snakelize(camelizedEvents[1])
})

suite.add(`Camelize 1 string`, () => {
  snakeToCamelCase('stage_instances')
})

suite.add(`Snakelize 1 string`, () => {
  camelToSnakeCase('stageInstances')
})
