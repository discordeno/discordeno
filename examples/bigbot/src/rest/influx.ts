import type { RestManager } from '@discordeno/bot'
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { INFLUX_BUCKET, INFLUX_ENABLED, INFLUX_ORG, INFLUX_TOKEN, INFLUX_URL } from '../config.js'

export const influxDB = INFLUX_ENABLED ? new InfluxDB({ url: INFLUX_URL!, token: INFLUX_TOKEN! }) : undefined
export const influx = INFLUX_ENABLED && influxDB ? influxDB.getWriteApi(INFLUX_ORG!, INFLUX_BUCKET!) : undefined

export const setupRestAnalyticsHooks = (rest: RestManager, logger: RestManager['logger']): void => {
  // If influxdb data is provided, enable analytics in this proxy.
  if (!influx) return

  const originalSendRequest = rest.sendRequest

  rest.sendRequest = async (options) => {
    const fetchingPoint = new Point('restEvents')
      .timestamp(new Date())
      .stringField('type', 'REQUEST_FETCHING')
      .tag('method', options.method)
      .tag('route', options.route)
      .tag('bucket', options.bucketId ?? 'NA')

    influx.writePoint(fetchingPoint)

    await originalSendRequest(options)

    const fetchedPoint = new Point('restEvents')
      .timestamp(new Date())
      .stringField('type', 'REQUEST_FETCHED')
      .tag('method', options.method)
      .tag('route', options.route)
      .tag('bucket', options.bucketId ?? 'NA')
    // FIXME: rest.sendRequest returns Promise<void>, so there is no way currently to get the response status
    // .intField('status', response.status)

    influx.writePoint(fetchedPoint)
  }

  setInterval(async () => {
    logger.info('Influx - Saving events...')
    try {
      await influx.flush()
      logger.info('Influx - events saved!')
    } catch (error) {
      logger.error('Influx - error saving events!', error)
    }
  }, 30_000 /* 30s */)
}
