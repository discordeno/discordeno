import { GatewayCloseEventCodes } from "../../types/shared.ts";
import { Shard, ShardSocketCloseCodes, ShardState } from "./types.ts";

export async function handleClose(shard: Shard, close: CloseEvent): Promise<void> {
  //   gateway.debug("GW CLOSED", { shardId, payload: event });

  shard.stopHeartbeating();

  switch (close.code) {
    case ShardSocketCloseCodes.TestingFinished: {
      shard.state = ShardState.Offline;
      shard.events.disconnected?.(shard);

      return;
    }
    // On these codes a manual start will be done.
    case ShardSocketCloseCodes.Shutdown:
    case ShardSocketCloseCodes.ReIdentifying:
    case ShardSocketCloseCodes.Resharded:
    case ShardSocketCloseCodes.ResumeClosingOldConnection:
    case ShardSocketCloseCodes.ZombiedConnection: {
      shard.state = ShardState.Disconnected;
      shard.events.disconnected?.(shard);

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
      shard.events.disconnected?.(shard);

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
      shard.events.disconnected?.(shard);

      throw new Error(close.reason || "Discord gave no reason! GG! You broke Discord!");
    }
    // Gateway connection closes on which a resume is allowed.
    case GatewayCloseEventCodes.UnknownError:
    case GatewayCloseEventCodes.DecodeError:
    case GatewayCloseEventCodes.AlreadyAuthenticated:
    default: {
      shard.state = ShardState.Resuming;
      shard.events.disconnected?.(shard);

      return await shard.resume();
    }
  }
}
