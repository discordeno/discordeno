import { Shard, ShardState } from "./types.ts";

export async function connect(shard: Shard): Promise<void> {
  // Only set the shard to `Connecting` state,
  // if the connection request does not come from an identify or resume action.
  if (![ShardState.Identifying, ShardState.Resuming].includes(shard.state)) {
    shard.state = ShardState.Connecting;
  }
  shard.events.connecting?.(shard);

  let url = new URL(shard.gatewayConfig.url);
  // If not connecting to a proxy but directly to discord need to handle resuming
  if (url.origin === "wss://gateway.discord.gg") {
    if (shard.state === ShardState.Resuming) {
      url = new URL(shard.resumeGatewayUrl);
    }
    url.searchParams.set("v", shard.gatewayConfig.version.toString());
    url.searchParams.set("encoding", "json");
  }

  const socket = new WebSocket(url);

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
