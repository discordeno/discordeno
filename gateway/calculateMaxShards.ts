/** Handler used to determine max number of shards to use based upon the max concurrency. */
export function calculateMaxShards(maxShards: number, maxConcurrency: number): number {
  if (maxShards < 100) return maxShards;

  return Math.ceil(
    maxShards /
      (maxConcurrency === 1 ? 16 : maxConcurrency),
  ) * maxConcurrency;
}
