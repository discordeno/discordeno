import type { Bot } from "../../bot.ts";
import { GatewayOpcodes } from "../../types/codes/gatewayOpcodes.ts";
import type { StatusUpdate } from "../../types/gateway/statusUpdate.ts";

export function editBotStatus(bot: Bot, data: Omit<StatusUpdate, "afk" | "since">) {
  bot.gateway.shards.forEach((shard) => {
    bot.events.debug(`Running forEach loop in editBotStatus function.`);

    bot.gateway.sendShardMessage(bot.gateway, shard, {
      op: GatewayOpcodes.StatusUpdate,
      d: {
        since: null,
        afk: false,
        activities: data.activities,
        status: data.status,
      },
    });
  });
}
