export interface GatewayPayload {
  /** opcode for the payload */
  op: number;
  /** Event data */
  d: unknown | null;
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** The event name for this payload */
  t: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
export type DiscordGatewayPayload = GatewayPayload;
