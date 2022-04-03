import { GatewayOpcodes } from "../../types/shared.ts";
import { Shard, ShardSocketCloseCodes, ShardState } from "./types.ts";

export function startHeartbeating(shard: Shard, interval: number) {
  //   gateway.debug("GW HEARTBEATING_STARTED", { shardId, interval });

  shard.heart.interval = interval;

  // Only set the shard's state to `Unidentified`
  // if heartbeating has not been started due to an identify or resume action.
  if ([ShardState.Disconnected, ShardState.Offline].includes(shard.state)) {
    shard.state = ShardState.Unidentified;
  }

  // The first heartbeat needs to be send with a random delay between `0` and `interval`
  // Using a `setTimeout(_, jitter)` here to accomplish that.
  // `Math.random()` can be `0` so we use `0.5` if this happens
  // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating
  const jitter = Math.ceil(shard.heart.interval * (Math.random() || 0.5));
  shard.heart.timeoutId = setTimeout(() => {
    // Using a direct socket.send call here because heartbeat requests are reserved by us.
    shard.socket?.send(JSON.stringify({
      op: GatewayOpcodes.Heartbeat,
      d: shard.previousSequenceNumber,
    }));

    shard.heart.lastBeat = Date.now();
    shard.heart.acknowledged = false;

    // After the random heartbeat jitter we can start a normal interval.
    shard.heart.intervalId = setInterval(async () => {
      // gateway.debug("GW DEBUG", `Running setInterval in heartbeat file. Shard: ${shardId}`);

      // gateway.debug("GW HEARTBEATING", { shardId, shard: currentShard });

      // The Shard did not receive a heartbeat ACK from Discord in time,
      // therefore we have to assume that the connection has failed or got "zombied".
      // The Shard needs to start a re-identify action accordingly.
      // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
      if (!shard.heart.acknowledged) {
        shard.close(
          ShardSocketCloseCodes.ZombiedConnection,
          "Zombied connection, did not receive an heartbeat ACK in time.",
        );

        return await shard.identify();
      }

      shard.heart.acknowledged = false;

      // Using a direct socket.send call here because heartbeat requests are reserved by us.
      shard.socket?.send(
        JSON.stringify({
          op: GatewayOpcodes.Heartbeat,
          d: shard.previousSequenceNumber,
        }),
      );

      shard.heart.lastBeat = Date.now();

      shard.events.heartbeat?.(shard);
    }, shard.heart.interval);
  }, jitter);
}
