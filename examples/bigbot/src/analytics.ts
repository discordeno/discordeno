import { InfluxDB, Point } from '@influxdata/influxdb-client'
import type { RestManager } from 'discordeno/rest'

const INFLUX_ORG = process.env.INFLUX_ORG!
const INFLUX_BUCKET = process.env.INFLUX_BUCKET!
const INFLUX_TOKEN = process.env.INFLUX_TOKEN!
const INFLUX_URL = process.env.INFLUX_URL!

export const influxDB = INFLUX_URL && INFLUX_TOKEN ? new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }) : undefined
export const Influx = influxDB?.getWriteApi(INFLUX_ORG, INFLUX_BUCKET)

export const setupAnalyticsHooks = (rest: RestManager): void => {
  // If influxdb data is provided, enable analytics in this proxy.
  if (Influx) {
    rest.fetching = function (options) {
      Influx?.writePoint(
        new Point('restEvents')
          // MARK THE TIME WHEN EVENT ARRIVED
          .timestamp(new Date())
          // SET THE GUILD ID
          .stringField('type', 'REQUEST_FETCHING')
          .tag('method', options.method)
          .tag('url', options.url)
          .tag('bucket', options.bucketId ?? 'NA'),
      )
    }

    rest.fetched = function (options, response) {
      Influx?.writePoint(
        new Point('restEvents')
          // MARK THE TIME WHEN EVENT ARRIVED
          .timestamp(new Date())
          // SET THE GUILD ID
          .stringField('type', 'REQUEST_FETCHED')
          .tag('method', options.method)
          .tag('url', options.url)
          .tag('bucket', options.bucketId ?? 'NA')
          .intField('status', response.status)
          .tag('statusText', response.statusText),
      )
    }

    setInterval(() => {
      console.log(`[Influx - REST] Saving events...`)
      Influx?.flush()
        .then(() => {
          console.log(`[Influx - REST] Saved events!`)
        })
        .catch((error) => {
          console.log(`[Influx - REST] Error saving events!`, error)
        })
      // Every 30seconds
    }, 30000)
  }
}
