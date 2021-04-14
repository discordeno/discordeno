import { identify } from "./identify.ts";
import { resume } from "./resume.ts";
import { ws } from "./ws.ts";

// deno-lint-ignore require-await
export async function createShard(shardId: number) {
  const socket = new WebSocket(ws.botGatewayData.url);
  socket.binaryType = "arraybuffer";

  socket.onerror = (errorEvent) => {
    ws.log("ERROR", { shardId, error: errorEvent });
  };

  socket.onmessage = ({ data: message }) =>
    ws.handleOnMessage(message, shardId);

  socket.onclose = (event) => {
    ws.log("CLOSED", { shardId, payload: event });

    if (
      event.code === 3064 ||
      event.reason === "Discordeno Testing Finished! Do Not RESUME!"
    ) {
      return;
    }

    if (
      event.code === 3065 ||
      ["Resharded!", "Resuming the shard, closing old shard."].includes(
        event.reason,
      )
    ) {
      return ws.log("CLOSED_RECONNECT", { shardId, payload: event });
    }

    // TODO: ENUM FOR THESE CODES?
    switch (event.code) {
      case 4001:
      case 4002:
      case 4004:
      case 4005:
      case 4010:
      case 4011:
      case 4012:
      case 4013:
      case 4014:
        throw new Error(
          event.reason || "Discord gave no reason! GG! You broke Discord!",
        );
      // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
      case 4003:
      case 4007:
      case 4008:
      case 4009:
        identify(shardId, ws.maxShards);
        break;
      default:
        resume(shardId);
        break;
    }
  };

  return socket;
}
