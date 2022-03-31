import { GatewayCloseEventCodes } from "../types/shared.ts";
import { GatewayManager } from "./gatewayManager.ts";

export function createShard(gateway: GatewayManager, shardId: number) {
  const socket = new WebSocket(`${gateway.urlWSS}/?v=9&encoding=json`);

  socket.onerror = (errorEvent) => {
    gateway.debug("GW ERROR", { shardId, error: errorEvent });
  };

  socket.onmessage = ({ data: message }) => gateway.handleOnMessage(gateway, message, shardId);

  socket.onclose = async (event) => {
    gateway.debug("GW CLOSED", { shardId, payload: event });

    if (event.code === 3064 || event.reason === "Discordeno Testing Finished! Do Not RESUME!") {
      return;
    }

    if (event.code === 3065 || ["Resharded!", "Resuming the shard, closing old shard."].includes(event.reason)) {
      return gateway.debug("GW CLOSED_RECONNECT", { shardId, payload: event });
    }

    switch (event.code) {
      // Discordeno tests finished
      case 3061:
        return;
      case 3063: // Resharded
      case 3064: // Resuming
      case 3065: // Reidentifying
      case 3066: // Missing ACK
        // Will restart shard manually
        return gateway.debug("GW CLOSED_RECONNECT", { shardId, payload: event });
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.AuthenticationFailed:
      case GatewayCloseEventCodes.AlreadyAuthenticated:
      case GatewayCloseEventCodes.InvalidShard:
      case GatewayCloseEventCodes.ShardingRequired:
      case GatewayCloseEventCodes.InvalidApiVersion:
      case GatewayCloseEventCodes.InvalidIntents:
      case GatewayCloseEventCodes.DisallowedIntents:
        throw new Error(event.reason || "Discord gave no reason! GG! You broke Discord!");
      // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
      case GatewayCloseEventCodes.NotAuthenticated:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut:
        await gateway.identify(gateway, shardId, gateway.maxShards);
        break;
      default:
        gateway.resume(gateway, shardId);
        break;
    }
  };

  return socket;
}
