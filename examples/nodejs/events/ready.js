module.exports = async (client, payload) => {
  client.user = client.users.forge(payload.user)
  if (payload.shardId === client.gateway.lastShardId) {
    // All Shards are ready
    console.log('Successfully connected to the gateway as ' + client.user.tag)
  }
}
