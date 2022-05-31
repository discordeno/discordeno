import { Shard, ShardState } from "./types.ts";

export async function connect(shard: Shard): Promise<void> {
  // Only set the shard to `Connecting` state,
  // if the connection request does not come from an identify or resume action.
  if (![ShardState.Identifying, ShardState.Resuming].includes(shard.state)) {
    shard.state = ShardState.Connecting;
  }
  shard.events.connecting?.(shard);

  // Explicitly setting the encoding to json, since we do not support ETF.
  const socket = new WebSocket(`${shard.gatewayConfig.url}/?v=${shard.gatewayConfig.version}&encoding=json`);
  shard.socket = socket;

  // TODO: proper event handling
  socket.onerror = (event) => console.log({ error: event });

  socket.onclose = (event) => shard.handleClose(event);

  socket.onmessage = (message) => shard.handleMessage(message);

  return new Promise((resolve) => {
    socket.onopen = () => {
      // Only set the shard to `Unidentified` state,
      // if the connection request does not come from an identify or resume action.
      if (![ShardState.Identifying, ShardState.Resuming].includes(shard.state)) {
        shard.state = ShardState.Unidentified;
      }
      shard.events.connected?.(shard);

      resolve();
    };
  });
}
