/** Use this function to stop the gateway properly */
export async function stopGateway(gateway: GatewayManager) {
    // STOP WS
    gateway.shards.forEach((shard) => {
        clearInterval(shard.heartbeat.intervalId);
        gateway.closeWS(
          shard.ws,
          3061,
          "Discordeno Testing Finished! Do Not RESUME!",
        );
      });

    await delay(5000);
}
