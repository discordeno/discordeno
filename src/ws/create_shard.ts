import { identify } from "./identify.ts";
import { handleOnMessage } from "./proxy/shard.ts";
import { resume } from "./resume.ts";
import { ws } from "./ws.ts";

// deno-lint-ignore require-await
export async function createShard(shardID: number) {
  const socket = new WebSocket(ws.botGatewayData.url);
  socket.binaryType = "arraybuffer";

  socket.onerror = (errorEvent) => {
    ws.log("ERROR", { shardID, error: errorEvent });
  };

  socket.onmessage = ({ data: message }) => handleOnMessage(message, shardID);

  socket.onclose = (event) => {
    ws.log("CLOSED", { shardID, payload: event });

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
          event.reason || "Discord gave no reason! GG! You broke Discord!"
        );
      // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
      case 4003:
      case 4007:
      case 4008:
      case 4009:
        ws.log("CLOSED_RECONNECT", { shardID, payload: event });
        identify(shardID, ws.maxShards);
        break;
      default:
        resume(shardID);
        break;
    }
  };

  return socket;
}
