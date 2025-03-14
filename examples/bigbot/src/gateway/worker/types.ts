import type { ShardSocketRequest, StatusUpdate } from '@discordeno/bot'

export type ManagerMessage = ManagerRequestIdentify | ManagerShardIdentified | ManagerShardInfo
export type WorkerMessage = WorkerIdentifyShard | WorkerAllowIdentify | WorkerShardPayload | WorkerPresencesUpdate | WorkerShardInfo

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

export interface WorkerShardInfo {
  type: 'GetShardInfo'
  shardId: number
  nonce: string
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

export interface ShardInfo {
  shardId: number
  rtt: number
  // the nonce is to bind to the request
  nonce: string
}

export interface ManagerShardInfo extends ShardInfo {
  type: 'ShardInfo'
}

export interface ManagerGetShardInfoFromGuildId {
  type: 'ShardInfoFromGuild'
  guildId: string | undefined
}

export interface ManagerShardIdentified {
  type: 'ShardIdentified'
  shardId: number
}
