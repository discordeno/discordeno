import { GATEWAY_AUTHORIZATION, GATEWAY_HOST, GATEWAY_PORT } from '../config.js'
import { buildFastifyApp } from './fastify.js'
import gatewayManager, { logger } from './gatewayManager.js'
import type { WorkerPresencesUpdate, WorkerShardPayload } from './worker/types.js'

if (!GATEWAY_AUTHORIZATION) throw new Error('The GATEWAY_AUTHORIZATION environment variable is missing')
if (!GATEWAY_HOST) throw new Error('The GATEWAY_HOST environment variable is missing')
if (!GATEWAY_PORT) throw new Error('The GATEWAY_PORT environment variable is missing')

const portNumber = Number.parseInt(GATEWAY_PORT)

if (Number.isNaN(portNumber)) throw new Error('The GATEWAY_PORT environment variable should be a valid number')

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
  port: portNumber,
})

logger.info(`Gateway manager listening on port ${portNumber}`)
