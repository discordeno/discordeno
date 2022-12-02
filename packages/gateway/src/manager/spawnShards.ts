import { GatewayManager } from './gatewayManager.js'

/** Begin spawning shards. */
export function spawnShards (gateway: GatewayManager): void {
  // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
  gateway.prepareBuckets()

  // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
  // Prefer concurrency of forEach instead of forof
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  gateway.buckets.forEach(async (bucket, bucketId) => {
    for (const worker of bucket.workers) {
      for (const shardId of worker.queue) {
        await gateway.tellWorkerToIdentify(worker.id, shardId, bucketId)
      }
    }
  })
}
