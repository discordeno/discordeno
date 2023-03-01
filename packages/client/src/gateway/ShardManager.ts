/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Base from '../Base.js'
import type Client from '../Client.js'
import Collection from '../Collection.js'
import type { ShardManagerOptions } from '../typings.js'
import Shard from './Shard.js'

export class ShardManager extends Collection<number, Shard> {
  /** The client manager */
  client: Client
  /** The options that were used to configure this manager. */
  options: ShardManagerOptions
  /** The buckets that this manager is handling. */
  buckets: Map<number, number>
  /** The queue in which to connect a shard. */
  connectQueue: Shard[]
  /** The timeout to use for connecting a shard. */
  connectTimeout: NodeJS.Timeout | null

  constructor(client: Client, options: ShardManagerOptions = {}) {
    super()
    this.client = client

    this.options = Object.assign({ concurrency: 1 }, options)
    this.buckets = new Map()
    this.connectQueue = []
    this.connectTimeout = null
  }

  /**
   * @deprecated Use `.client` instead.
   */
  get _client(): Client {
    return this.client
  }

  connect(shard: Shard) {
    this.connectQueue.push(shard)
    this.tryConnect()
  }

  get concurrency(): number {
    return this.options.concurrency as number
  }

  setConcurrency(concurrency: number) {
    this.options.concurrency = concurrency
  }

  spawn(id: number) {
    let shard = this.get(id)

    if (!shard) {
      shard = new Shard(id, this.client)
      this.set(id, shard)

      shard
        .on('ready', () => {
          this.client.emit('shardReady', shard!.id)
          if (this.client.ready) return

          for (const other of this.values()) if (!other.ready) return

          this.client.ready = true
          this.client.startTime = Date.now()

          this.client.emit('ready')
        })
        .on('resume', () => {
          this.client.emit('shardResume', shard!.id)
          if (this.client.ready) return

          for (const other of this.values()) if (!other.ready) return

          this.client.ready = true
          this.client.startTime = Date.now()
          this.client.emit('ready')
        })
        .on('disconnect', (error) => {
          this.client.emit('shardDisconnect', error, shard!.id)
          for (const other of this.values()) if (other.ready) return

          this.client.ready = false
          this.client.startTime = 0
          this.client.emit('disconnect')
        })
    }

    if (shard.status === 'disconnected') {
      return this.connect(shard)
    }
  }

  tryConnect() {
    // nothing in queue
    if (this.connectQueue.length === 0) {
      return
    }

    // loop over the connectQueue
    for (const shard of this.connectQueue) {
      // find the bucket for our shard
      const rateLimitKey = shard.id % this.concurrency || 0
      const lastConnect = this.buckets.get(rateLimitKey) ?? 0

      // has enough time passed since the last connect for this bucket (5s/bucket)?
      // alternatively if we have a sessionID, we can skip this check
      if (!shard.sessionID && Date.now() - lastConnect < 5000) {
        continue
      }

      // Are there any connecting shards in the same bucket we should wait on?
      if (this.some((s) => s.connecting && (s.id % this.concurrency || 0) === rateLimitKey)) {
        continue
      }

      // connect the shard
      shard.identify()
      this.buckets.set(rateLimitKey, Date.now())

      // remove the shard from the queue
      const index = this.connectQueue.findIndex((s) => s.id === shard.id)
      this.connectQueue.splice(index, 1)
    }

    // set the next timeout if we have more shards to connect
    if (!this.connectTimeout && this.connectQueue.length > 0) {
      this.connectTimeout = setTimeout(() => {
        this.connectTimeout = null
        this.tryConnect()
      }, 500)
    }
  }

  _readyPacketCB(shardID: number) {
    const rateLimitKey = shardID % this.concurrency || 0
    this.buckets.set(rateLimitKey, Date.now())

    this.tryConnect()
  }

  toString() {
    return `[ShardManager ${this.size}]`
  }

  toJSON(props = []) {
    return Base.prototype.toJSON.call(this, ['buckets', 'connectQueue', 'connectTimeout', 'options', ...props])
  }
}

export default ShardManager
