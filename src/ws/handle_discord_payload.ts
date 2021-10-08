import type { DiscordGatewayPayload } from "../types/gateway/gateway_payload.ts";
import {GatewayManager} from "../bot.ts";

/** Handler for processing all dispatch payloads that should be sent/forwarded to another server/vps/process. */
export async function handleDiscordPayload(gateway: GatewayManager, data: DiscordGatewayPayload, shardId: number) {
  await fetch(gateway.url, {
    headers: {
      authorization: gateway.secretKey,
    },
    method: "post",
    body: JSON.stringify({
      shardId,
      data,
    }),
  }).catch(console.error);
}
