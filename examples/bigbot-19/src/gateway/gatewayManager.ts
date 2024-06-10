import { createGatewayManager, createLogger, createRestManager, LogDepth } from '@discordeno/bot'
import type { Worker } from 'node:worker_threads'
import { DISCORD_TOKEN, GATEWAY_INTENTS, REST_AUTHORIZATION, REST_URL, SHARDS_PER_WORKER, TOTAL_SHARDS, TOTAL_WORKERS } from '../config.js'
import { createWorker } from './worker/createWorker.js'
import type { WorkerMessage } from './worker/types.js'

if (!DISCORD_TOKEN) throw new Error('The DISCORD_TOKEN environment variable is missing')
if (!REST_AUTHORIZATION) throw new Error('The REST_AUTHORIZATION environment variable is missing')
if (!SHARDS_PER_WORKER) throw new Error('The SHARDS_PER_WORKER environment variable is missing')
if (!TOTAL_WORKERS) throw new Error('The TOTAL_WORKERS environment variable is missing')

const shardsPerWorker = Number.parseInt(SHARDS_PER_WORKER)
const totalWorkers = Number.parseInt(TOTAL_WORKERS)
const totalShards = TOTAL_SHARDS ? Number.parseInt(TOTAL_SHARDS) : undefined

if (Number.isNaN(shardsPerWorker)) throw new Error('The SHARDS_PER_WORKER environment variable should be a valid number')
if (Number.isNaN(totalWorkers)) throw new Error('The TOTAL_WORKERS environment variable should be a valid number, when set')
// NOTE: this will not return true if totalShards is undefined
if (Number.isNaN(totalShards)) throw new Error('The TOTAL_SHARDS environment variable should be a valid number, when set')

export const workers = new Map<number, Worker>()
export const logger = createLogger({ name: 'GATEWAY' })
logger.setDepth(LogDepth.Full)

const restManager = createRestManager({
  token: DISCORD_TOKEN,
  proxy: {
    baseUrl: REST_URL,
    authorization: REST_AUTHORIZATION,
  },
})

const gatewayBotConfig = await restManager.getGatewayBot()

const gatewayManager = createGatewayManager({
  token: DISCORD_TOKEN,
  intents: GATEWAY_INTENTS,
  connection: gatewayBotConfig,
  shardsPerWorker,
  totalShards,
  totalWorkers,
})

gatewayManager.tellWorkerToIdentify = async (workerId, shardId, bucketId) => {
  logger.info(`Tell worker to identify, workerId: ${workerId}, shardId: ${shardId}, bucketId: ${bucketId}`)

  const worker = workers.get(workerId) ?? createWorker(workerId)
  workers.set(workerId, worker)

  worker.postMessage({
    type: 'IdentifyShard',
    shardId,
  } satisfies WorkerMessage)
}

gatewayManager.sendPayload = async (shardId, payload) => {
  const workerId = gatewayManager.calculateWorkerId(shardId)
  const worker = workers.get(workerId)

  if (!worker) return

  worker.postMessage({
    type: 'ShardPayload',
    shardId,
    payload,
  } satisfies WorkerMessage)
}

gatewayManager.editBotStatus = async (payload) => {
  const workersArray = Array.from(workers.values())

  for (const worker of workersArray) {
    worker.postMessage({
      type: 'EditShardsPresence',
      payload,
    } satisfies WorkerMessage)
  }
}

export default gatewayManager
