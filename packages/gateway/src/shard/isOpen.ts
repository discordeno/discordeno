import { WebSocket } from 'ws'
import { Shard } from './types.js'

export function isOpen (shard: Shard): boolean {
  return shard.socket?.readyState === WebSocket.OPEN
}
