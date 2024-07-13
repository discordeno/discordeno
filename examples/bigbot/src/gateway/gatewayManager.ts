import type { Worker } from 'node:worker_threads'
import { LogDepth, createGatewayManager, createLogger, createRestManager } from '@discordeno/bot'
import { DISCORD_TOKEN, GATEWAY_INTENTS, REST_AUTHORIZATION, REST_URL, SHARDS_PER_WORKER, TOTAL_SHARDS, TOTAL_WORKERS } from '../config.js'
import { createWorker } from './worker/createWorker.js'
import type { WorkerMessage } from './worker/types.js'

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
  shardsPerWorker: SHARDS_PER_WORKER,
  totalShards: TOTAL_SHARDS,
  totalWorkers: TOTAL_WORKERS,
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
