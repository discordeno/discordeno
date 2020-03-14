export const spawnShards = (total: number, id = 1) => {
	// this.ShardingManager.spawnShard(id);
	if (id < total) spawnShards(total, id + 1)
}
