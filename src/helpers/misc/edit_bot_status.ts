import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayOpcodes } from "../../types/codes/gateway_opcodes.ts";
import type { StatusUpdate } from "../../types/gateway/status_update.ts";
import { sendShardMessage } from "../../ws/send_shard_message.ts";
import { ws } from "../../ws/ws.ts";

export function editBotStatus(data: Omit<StatusUpdate, "afk" | "since">) {
  ws.shards.forEach((shard) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach loop in editBotStatus function.`,
    );

    sendShardMessage(shard, {
      op: DiscordGatewayOpcodes.StatusUpdate,
      d: {
        since: null,
        afk: false,
        ...data,
      },
    });
  });
}
