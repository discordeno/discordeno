import { GatewayCloseEventCodes } from "../../types/shared.ts";
import { Shard, ShardSocketCloseCodes, ShardState } from "./types.ts";

export async function handleClose(shard: Shard, close: CloseEvent): Promise<void> {
  //   gateway.debug("GW CLOSED", { shardId, payload: event });

  shard.stopHeartbeating();

  console.log({ id: shard.id, close });

  switch (close.code) {
    case ShardSocketCloseCodes.Shutdown: {
      throw new Error("SHUTDOWN");
    }
    case ShardSocketCloseCodes.TestingFinished: {
      shard.state = ShardState.Offline;
      shard.event.disconnected?.(shard);

      return;
    }
    // On these codes a manual start will be done.
    case ShardSocketCloseCodes.ReIdentifying:
    case ShardSocketCloseCodes.Resharded:
    case ShardSocketCloseCodes.ResumeClosingOldConnection:
    case ShardSocketCloseCodes.ZombiedConnection:
    case ShardSocketCloseCodes.Shutdown: {
      shard.state = ShardState.Disconnected;
      shard.event.disconnected?.(shard);

      // gateway.debug("GW CLOSED_RECONNECT", { shardId, payload: event });
      return;
    }
    // Gateway connection closes which require a new identify.
    case GatewayCloseEventCodes.UnknownOpcode:
    case GatewayCloseEventCodes.NotAuthenticated:
    case GatewayCloseEventCodes.InvalidSeq:
    case GatewayCloseEventCodes.RateLimited:
    case GatewayCloseEventCodes.SessionTimedOut: {
      shard.state = ShardState.Identifying;
      shard.event.disconnected?.(shard);

      return await shard.identify();
    }
    // When these codes are received something went really wrong.
    // On those we cannot start a reconnect attempt.
    case GatewayCloseEventCodes.AuthenticationFailed:
    case GatewayCloseEventCodes.InvalidShard:
    case GatewayCloseEventCodes.ShardingRequired:
    case GatewayCloseEventCodes.InvalidApiVersion:
    case GatewayCloseEventCodes.InvalidIntents:
    case GatewayCloseEventCodes.DisallowedIntents: {
      shard.state = ShardState.Offline;
      shard.event.disconnected?.(shard);

      throw new Error(close.reason || "Discord gave no reason! GG! You broke Discord!");
    }
    // Gateway connection closes on which a resume is allowed.
    case GatewayCloseEventCodes.UnknownError:
    case GatewayCloseEventCodes.DecodeError:
    case GatewayCloseEventCodes.AlreadyAuthenticated:
    default: {
      shard.state = ShardState.Resuming;
      shard.event.disconnected?.(shard);

      return await shard.resume();
    }
  }
}
