import { GatewayOpcodes } from "../../types/shared.ts";
import { Shard, ShardSocketCloseCodes, ShardState } from "./types.ts";

export async function resume(shard: Shard): Promise<void> {
  //   gateway.debug("GW RESUMING", { shardId });
  // It has been requested to resume the Shards session.
  // It's possible that the shard is still connected with Discord's gateway therefore we need to forcefully close it.
  if (shard.isOpen()) {
    shard.close(ShardSocketCloseCodes.ResumeClosingOldConnection, "Reconnecting the shard, closing old connection.");
  }

  // Shard has never identified, so we cannot resume.
  if (!shard.sessionId) {
    // gateway.debug(
    //   "GW DEBUG",
    //   `[Error] Trying to resume a shard (id: ${shardId}) that was not first identified.`,
    // );

    return await shard.identify();

    // throw new Error(`[SHARD] Trying to resume a shard (id: ${shard.id}) which was never identified`);
  }

  shard.state = ShardState.Resuming;

  // Before we can resume, we need to create a new connection with Discord's gateway.
  await shard.connect();

  shard.send({
    op: GatewayOpcodes.Resume,
    d: {
      token: `Bot ${shard.gatewayConfig.token}`,
      session_id: shard.sessionId,
      seq: shard.previousSequenceNumber ?? 0,
    },
  }, true);

  return new Promise((resolve) => {
    shard.resolves.set("RESUMED", () => resolve());
    // If it is attempted to resume with an invalid session id,
    // Discord sends an invalid session payload
    // Not erroring here since it is easy that this happens, also it would be not catchable
    shard.resolves.set("INVALID_SESSION", () => {
      shard.resolves.delete("RESUMED");
      resolve();
    });
  });
}
