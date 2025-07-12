import assert from 'node:assert'
import { createHash } from 'node:crypto'
import { workerData as _workerData, parentPort } from 'node:worker_threads'
import { createLogger, DiscordenoShard, GatewayOpcodes } from '@discordeno/bot'
import { type Channel as amqpChannel, connect as connectAmqp } from 'amqplib'
import { promiseWithResolvers } from '../../util.js'
import type { ManagerMessage, WorkerCreateData, WorkerMessage } from './types.js'

assert(parentPort)

const workerData: WorkerCreateData = _workerData

const logger = createLogger({ name: `Worker #${workerData.workerId}` })

const identifyPromises = new Map<number, () => void>()
const shards = new Map<number, DiscordenoShard>()

let rabbitMQChannel: amqpChannel | undefined

if (workerData.messageQueue.enabled) {
  await connectToRabbitMQ()
}

parentPort.on('message', async (message: WorkerMessage) => {
  assert(parentPort)

  if (message.type === 'IdentifyShard') {
    logger.info(`Starting to identify shard #${message.shardId}`)
    const shard = shards.get(message.shardId) ?? createShard(message.shardId)
    shards.set(message.shardId, shard)

    await shard.identify()

    parentPort.postMessage({
      type: 'ShardIdentified',
      shardId: message.shardId,
    } satisfies ManagerMessage)

    return
  }
  if (message.type === 'AllowIdentify') {
    identifyPromises.get(message.shardId)?.()
    identifyPromises.delete(message.shardId)

    return
  }
  if (message.type === 'ShardPayload') {
    const shard = shards.get(message.shardId)

    if (!shard) return

    await shard.send(message.payload)

    return
  }
  if (message.type === 'EditShardsPresence') {
    const shardsArray = Array.from(shards.values())
    const promises = shardsArray.map(async (shard) => {
      await shard.send({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          since: null,
          afk: false,
          activities: message.payload.activities,
          status: message.payload.status,
        },
      })
    })

    await Promise.all(promises)
    return
  }
  if (message.type === 'GetShardInfo') {
    const status = {
      type: 'ShardInfo',
      shardId: message.shardId,
      rtt: shards.get(message.shardId)?.heart.rtt ?? -1,
      nonce: message.nonce,
    } satisfies ManagerMessage

    parentPort?.postMessage(status)

    return
  }

  logger.warn(`Received unknown message type: ${(message as { type: string }).type}`)
})

function createShard(shardId: number): DiscordenoShard {
  const shard = new DiscordenoShard({
    id: shardId,
    events: {},
    connection: {
      compress: false,
      intents: workerData.connectionData.intents,
      properties: {
        os: process.platform,
        browser: 'Discordeno',
        device: 'Discordeno',
      },
      token: workerData.connectionData.token,
      totalShards: workerData.connectionData.totalShards,
      url: workerData.connectionData.url,
      version: workerData.connectionData.version,
      transportCompression: null,
    },
  })

  shard.requestIdentify = async () => {
    assert(parentPort)

    const { promise, resolve } = promiseWithResolvers<void>()

    parentPort.postMessage({
      type: 'RequestIdentify',
      shardId,
    } satisfies ManagerMessage)

    identifyPromises.set(shardId, resolve)

    return await promise
  }

  // We do not want to camelize the packet, so we need to override the function as the default behavior is to camelize
  shard.forwardToBot = (packet) => {
    shard.events.message?.(shard, packet)
  }

  shard.events.message = async (shard, payload) => {
    const body = JSON.stringify({ payload, shardId: shard.id })

    if (workerData.messageQueue.enabled) {
      if (!rabbitMQChannel) {
        logger.error('The RabbitMQ channel has not been created. The event will be lost')
        return
      }

      const message = Buffer.from(body)
      const discordData = JSON.stringify(payload.d)

      const deduplicationHash = createHash('sha1')
      deduplicationHash.update(discordData)

      rabbitMQChannel.publish('gatewayMessage', '', message, {
        contentType: 'application/json',
        headers: {
          'x-deduplication-header': deduplicationHash.digest('hex'),
        },
      })

      return
    }

    const url = workerData.eventHandler.urls[shard.id % workerData.eventHandler.urls.length]
    if (!url) {
      logger.error('No url found to send events to')
      return
    }

    await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: workerData.eventHandler.authentication,
      },
    }).catch((error) => logger.error('Failed to send events to the bot code', error))
  }

  return shard
}

async function connectToRabbitMQ(): Promise<void> {
  rabbitMQChannel = undefined
  const messageQueue = workerData.messageQueue

  const connection = await connectAmqp(`amqp://${messageQueue.username}:${messageQueue.password}@${messageQueue.url}`).catch((error) => {
    logger.error('Failed to connect to RabbitMQ, retrying in 1s.', error)
    setTimeout(connectToRabbitMQ, 1000)
  })

  if (!connection) return

  connection.on('close', () => {
    rabbitMQChannel = undefined
    setTimeout(connectToRabbitMQ, 1000)
  })
  connection.on('error', (error) => {
    rabbitMQChannel = undefined
    logger.error('There was an error in the connection with RabbitMQ, reconnecting in 1s.', error)
    setTimeout(connectToRabbitMQ, 1000)
  })

  const channel = await connection.createChannel().catch((error) => {
    logger.error('There was an error creating the RabbitMQ channel', error)
  })

  if (!channel) return

  const exchange = await channel
    .assertExchange('gatewayMessage', 'x-message-deduplication', {
      durable: true,
      arguments: {
        'x-cache-size': 1000, // maximum number of entries
        'x-cache-ttl': 500, // 500ms
      },
    })
    .catch((error) => {
      logger.error('There was an error asserting the exchange', error)
    })

  if (!exchange) return

  rabbitMQChannel = channel
}
