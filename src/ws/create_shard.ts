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

    // TODO: ENUM FOR THESE CODES?
    switch (event.code) {
      // Discordeno tests finished
      case 3061:
        return;
      case 3063: // Resharded
      case 3064: // Resuming
      case 3065: // Reidentifying
      case 3066: // Missing ACK
        // Will restart shard manually
        return ws.log("CLOSED_RECONNECT", { shardId, payload: event });
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
