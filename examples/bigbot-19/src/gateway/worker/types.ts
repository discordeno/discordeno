import type { ShardSocketRequest, StatusUpdate } from '@discordeno/bot'

export type ManagerMessage = ManagerRequestIdentify
export type WorkerMessage = WorkerIdentifyShard | WorkerAllowIdentify | WorkerShardPayload | WorkerPresencesUpdate

export interface WorkerIdentifyShard {
  type: 'IdentifyShard'
  shardId: number
}

export interface WorkerAllowIdentify {
  type: 'AllowIdentify'
  shardId: number
}

export interface ManagerRequestIdentify {
  type: 'RequestIdentify'
  shardId: number
}

export interface WorkerShardPayload {
  type: 'ShardPayload'
  shardId: number
  payload: ShardSocketRequest
}

export interface WorkerPresencesUpdate {
  type: 'EditShardsPresence'
  payload: StatusUpdate
}

export interface WorkerCreateData {
  connectionData: {
    intents: number
    token: string
    url: string
    version: number
    totalShards: number
  }
  eventHandler: {
    urls: string[]
    authentication: string
  }
  workerId: number
  messageQueue: {
    enabled: boolean
    username?: string
    password?: string
    url?: string
  }
}
