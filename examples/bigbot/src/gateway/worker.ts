import dotenv from 'dotenv'

import amqplib from 'amqplib'
import {
  createShardManager,
  type DiscordGuild,
  type DiscordReady,
  type DiscordUnavailableGuild,
  type GatewayEventNames,
  type Shard,
  type ShardSocketRequest,
  type ShardState,
} from 'discordeno'
import { createLogger } from 'discordeno/logger'
import fetch from 'node-fetch'
import crypto from 'node:crypto'
import { parentPort, workerData } from 'worker_threads'
import type { ManagerMessage } from './index.js'
dotenv.config()

if (!parentPort) {
  throw new Error('Parent port is null')
}

const script: WorkerCreateData = workerData

const log = createLogger({ name: `[WORKER #${script.workerId}]` })

const identifyPromises = new Map<number, () => void>()

let channel: amqplib.Channel | undefined

const useMessageQueue = process.env.MESSAGEQUEUE_ENABLE === 'true'

// Store guild ids, loading guild ids to change GUILD_CREATE event to GUILD_LOADED_DD if needed.
const guildIds = new Set<bigint>()
const loadingGuildIds = new Set<bigint>()

const manager = createShardManager({
  gatewayConfig: {
    intents: script.intents,
    token: script.token,
  },
  shardIds: [],
  totalShards: script.totalShards,
  handleMessage: async (shard, message) => {
    const url = script.handlerUrls[shard.id % script.handlerUrls.length]
    if (!url) return console.log('ERROR: NO URL FOUND TO SEND MESSAGE')

    if (message.t === 'READY') {
      // Marks which guilds the bot in when initial loading in cache.
      ;(message.d as DiscordReady).guilds.forEach((g) => loadingGuildIds.add(BigInt(g.id)))
    }

    // If GUILD_CREATE event came from a shard loaded event, change event to GUILD_LOADED_DD.
    if (message.t === 'GUILD_CREATE') {
      const guild = message.d as DiscordGuild
      const id = BigInt(guild.id)

      const existing = guildIds.has(id)
      if (existing) return

      if (loadingGuildIds.has(id)) {
        message.t = 'GUILD_LOADED_DD' as GatewayEventNames

        loadingGuildIds.delete(id)
      }

      guildIds.add(id)
    }

    // Delete guild id from cache so GUILD_CREATE from the same guild later works properly.
    if (message.t === 'GUILD_DELETE') {
      const guild = message.d as DiscordUnavailableGuild

      if (guild.unavailable) return

      guildIds.delete(BigInt(guild.id))
    }

    if (useMessageQueue) {
      if (!channel) return
      channel.publish('gatewayMessage', '', Buffer.from(JSON.stringify({ shard, message })), {
        contentType: 'application/json',
        headers: {
          'x-deduplication-header': crypto.createHash('md5').update(JSON.stringify(message.d)).digest('hex'),
        },
      })
    } else {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ message, shardId: shard.id }),
        headers: { 'Content-Type': 'application/json', Authorization: script.handlerAuthorization },
      }).catch((error) => log.error(error))
    }

    log.debug({ shardId: shard.id, message })
  },
  requestIdentify: async function (shardId: number): Promise<void> {
    return await new Promise((resolve) => {
      identifyPromises.set(shardId, resolve)

      const identifyRequest: ManagerMessage = {
        type: 'REQUEST_IDENTIFY',
        shardId,
      }

      parentPort?.postMessage(identifyRequest)
    })
  },
})

function buildShardInfo(shard: Shard): WorkerShardInfo {
  return {
    workerId: script.workerId,
    shardId: shard.id,
    rtt: shard.heart.rtt ?? -1,
    state: shard.state,
  }
}

parentPort.on('message', async (data: WorkerMessage) => {
  switch (data.type) {
    case 'IDENTIFY_SHARD': {
      log.info(`starting to identify shard #${data.shardId}`)
      await manager.identify(data.shardId)

      break
    }
    case 'ALLOW_IDENTIFY': {
      identifyPromises.get(data.shardId)?.()
      identifyPromises.delete(data.shardId)

      break
    }
    case 'SHARD_PAYLOAD': {
      manager.shards.get(data.shardId)?.send(data.data)

      break
    }
    case 'GET_SHARD_INFO': {
      const infos = manager.shards.map(buildShardInfo)

      parentPort?.postMessage({ type: 'NONCE_REPLY', nonce: data.nonce, data: infos })
    }
  }
})

export type WorkerMessage = WorkerIdentifyShard | WorkerAllowIdentify | WorkerShardPayload | WorkerGetShardInfo

export interface WorkerIdentifyShard {
  type: 'IDENTIFY_SHARD'
  shardId: number
}

export interface WorkerAllowIdentify {
  type: 'ALLOW_IDENTIFY'
  shardId: number
}

export interface WorkerShardPayload {
  type: 'SHARD_PAYLOAD'
  shardId: number
  data: ShardSocketRequest
}

export interface WorkerGetShardInfo {
  type: 'GET_SHARD_INFO'
  nonce: string
}

export interface WorkerCreateData {
  intents: number
  token: string
  handlerUrls: string[]
  handlerAuthorization: string
  path: string
  totalShards: number
  workerId: number
}

export interface WorkerShardInfo {
  workerId: number
  shardId: number
  rtt: number
  state: ShardState
}

const connectRabbitmq = async (): Promise<void> => {
  let connection: amqplib.Connection | undefined

  try {
    connection = await amqplib.connect(
      `amqp://${process.env.MESSAGEQUEUE_USERNAME}:${process.env.MESSAGEQUEUE_PASSWORD}@${process.env.MESSAGEQUEUE_URL}`,
    )
  } catch (error) {
    channel = undefined
    log.error(error)
    setTimeout(connectRabbitmq, 1000)
  }

  if (!connection) return
  connection.on('error', (err) => {
    channel = undefined
    log.error(err)
    setTimeout(connectRabbitmq, 1000)
  })

  connection.on('close', () => {
    channel = undefined
    setTimeout(connectRabbitmq, 1000)
  })

  try {
    channel = await connection.createChannel()
    await channel.assertExchange('gatewayMessage', 'x-message-deduplication', {
      durable: true,
      arguments: {
        'x-cache-size': 1000,
        'x-cache-ttl': 500,
      },
    })
  } catch (error) {
    log.error(error)
    channel = undefined
  }
}

if (useMessageQueue) {
  connectRabbitmq()
}
