import { camelize, snakelize } from '@discordeno/utils'
import { suite } from '../benchmarkSuite.js'
import { events } from '../utils/db.js'

const camelizedEvents: any[] = []

events.forEach((event) => {
  camelizedEvents.push(camelize(event))
})

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
