import { Worker } from 'node:worker_threads'
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_AUTHORIZATION,
  EVENT_HANDLER_URL,
  GATEWAY_INTENTS,
  MESSAGEQUEUE_ENABLE,
  MESSAGEQUEUE_PASSWORD,
  MESSAGEQUEUE_URL,
  MESSAGEQUEUE_USERNAME,
} from '../../config.js'
import gatewayManager, { logger } from '../gatewayManager.js'
import type { ManagerMessage, WorkerCreateData, WorkerMessage } from './types.js'

export function createWorker(workerId: number): Worker {
  const worker = new Worker('./dist/gateway/worker/worker.js', {
    workerData: {
      connectionData: {
        intents: GATEWAY_INTENTS,
        token: DISCORD_TOKEN!,
        totalShards: gatewayManager.totalShards,
        url: gatewayManager.url,
        version: gatewayManager.version,
      },
      eventHandler: {
        urls: [EVENT_HANDLER_URL],
        authentication: EVENT_HANDLER_AUTHORIZATION!,
      },
      workerId,
      messageQueue: {
        enabled: MESSAGEQUEUE_ENABLE === 'true',
        username: MESSAGEQUEUE_USERNAME,
        password: MESSAGEQUEUE_PASSWORD,
        url: MESSAGEQUEUE_URL,
      },
    } satisfies WorkerCreateData,
  })

  worker.on('message', async (message: ManagerMessage) => {
    if (message.type === 'RequestIdentify') {
      logger.info(`Requesting identify for shardId: #${message.shardId}`)
      await gatewayManager.requestIdentify(message.shardId)

      worker.postMessage({
        type: 'AllowIdentify',
        shardId: message.shardId,
      } satisfies WorkerMessage)

      return
    }

    logger.warn(`Worker - Received unknown message type: ${(message as { type: string }).type}`)
  })

  return worker
}
