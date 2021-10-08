import {eventHandlers, GatewayManager} from "../../bot.ts";
import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";
import type { StatusUpdate } from "../../types/gateway/status_update.ts";
import { snakelize } from "../../util/utils.ts";

export function editBotStatus(gateway: GatewayManager, data: Omit<StatusUpdate, "afk" | "since">) {
  gateway.shards.forEach((shard) => {
    eventHandlers.debug?.("loop", `Running forEach loop in editBotStatus function.`);

    gateway.sendShardMessage(gateway, shard, {
      op: DiscordGatewayOpcodes.StatusUpdate,
      d: {
        since: null,
        afk: false,
        ...snakelize<Omit<StatusUpdate, "afk" | "since">>(data),
      },
    });
  });
}
