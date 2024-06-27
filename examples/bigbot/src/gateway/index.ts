import { GATEWAY_HOST, GATEWAY_PORT } from '../config.js'
import { promiseWithResolvers } from '../util.js'
import { buildFastifyApp } from './fastify.js'
import gatewayManager, { logger, workers } from './gatewayManager.js'
import { shardInfoRequests } from './worker/createWorker.js'
import type { ManagerGetShardInfoFromGuildId, ShardInfo, WorkerMessage, WorkerPresencesUpdate, WorkerShardPayload } from './worker/types.js'

const app = buildFastifyApp()

app.get('/timecheck', (_req, res) => {
  res.status(200).send({ message: Date.now() })
})

app.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Invalid body' })
    return
  }

  const data = req.body as WorkerShardPayload | WorkerPresencesUpdate | ManagerGetShardInfoFromGuildId

  if (data.type === 'ShardPayload') {
    await gatewayManager.sendPayload(data.shardId, data.payload)
    return
  }
  if (data.type === 'EditShardsPresence') {
    await gatewayManager.editBotStatus(data.payload)
    return
  }
  if (data.type === 'ShardInfoFromGuild') {
    // If we don't have a guildId, we use shard 0
    const shardId = data.guildId ? gatewayManager.calculateShardId(data.guildId) : 0
    const workerId = gatewayManager.calculateWorkerId(shardId)
    const worker = workers.get(workerId)

    if (!worker) {
      await res.status(400).send({ error: `worker for shard ${shardId} not found` })
      return
    }

    const nonce = crypto.randomUUID()

    const { promise, resolve } = promiseWithResolvers<ShardInfo>()

    shardInfoRequests.set(nonce, resolve)

    worker.postMessage({
      type: 'GetShardInfo',
      shardId,
      nonce,
    } satisfies WorkerMessage)

    const shardInfo = await promise

    await res.status(200).send({
      shardId: shardInfo.shardId,
      rtt: shardInfo.rtt,
    } satisfies Omit<ShardInfo, 'nonce'>)
    return
  }

  logger.warn(`Manager - Received unknown data type: ${(data as { type: string }).type}`)
})

await app.listen({
  host: GATEWAY_HOST,
  port: GATEWAY_PORT,
})

logger.info(`Gateway manager listening on port ${GATEWAY_PORT}`)

await gatewayManager.spawnShards()
