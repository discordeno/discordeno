import { GATEWAY_HOST, GATEWAY_PORT } from '../config.js'
import { buildFastifyApp } from './fastify.js'
import gatewayManager, { logger } from './gatewayManager.js'
import type { WorkerPresencesUpdate, WorkerShardPayload } from './worker/types.js'

const app = buildFastifyApp()

await gatewayManager.spawnShards()

app.get('/timecheck', (_req, res) => {
  res.status(200).send({ message: Date.now() })
})

app.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Invalid body' })
    return
  }

  const data = req.body as WorkerShardPayload | WorkerPresencesUpdate

  if (data.type === 'ShardPayload') {
    await gatewayManager.sendPayload(data.shardId, data.payload)
    return
  }
  if (data.type === 'EditShardsPresence') {
    await gatewayManager.editBotStatus(data.payload)
    return
  }

  logger.warn(`Manager - Received unknown data type: ${(data as { type: string }).type}`)
})

await app.listen({
  host: GATEWAY_HOST,
  port: GATEWAY_PORT,
})

logger.info(`Gateway manager listening on port ${GATEWAY_PORT}`)
