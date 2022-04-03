import { GatewayOpcodes } from "../../types/shared.ts";
import { Shard, ShardSocketCloseCodes, ShardState } from "./types.ts";

export async function identify(shard: Shard): Promise<void> {
  // A new identify has been requested even though there is already a connection open.
  // Therefore we need to close the old connection and heartbeating before creating a new one.
  if (shard.state === ShardState.Connected) {
    console.log("CLOSING EXISTING SHARD: #" + shard.id);
    shard.close(ShardSocketCloseCodes.ReIdentifying, "Re-identifying closure of old connection.");
  }

  shard.state = ShardState.Identifying;
  shard.events.identifying?.(shard);

  // It is possible that the shard is in Heartbeating state but not identified,
  // so check whether there is already a gateway connection existing.
  // If not we need to create one before we identify.
  if (!shard.isOpen()) {
    await shard.connect();
  }

  // Wait until an identify is free for this shard.
  await shard.requestIdentify();

  shard.send({
    op: GatewayOpcodes.Identify,
    d: {
      token: `Bot ${shard.gatewayConfig.token}`,
      compress: shard.gatewayConfig.compress,
      properties: shard.gatewayConfig.properties,
      intents: shard.gatewayConfig.intents,
      shard: [shard.id, shard.totalShards],
      presence: await shard.makePresence?.(shard.id),
    },
  }, true);

  return new Promise((resolve) => {
    shard.resolves.set("READY", () => {
      shard.events.identified?.(shard);
      resolve();
    });
    // When identifying too fast,
    // Discord sends an invalid session payload.
    // This can safely be ignored though and the shard starts a new identify action.
    shard.resolves.set("INVALID_SESSION", () => {
      shard.resolves.delete("READY");
      resolve();
    });
  });
}
