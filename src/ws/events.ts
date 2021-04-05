import { DiscordenoShard } from "./ws.ts";

/** The handler for logging different actions happening inside the ws. User can override and put custom handling per event. */
export function log(
  type: "CLOSED",
  data: { shardId: number; payload: CloseEvent },
): unknown;
export function log(
  type: "CLOSED_RECONNECT",
  data: { shardId: number; payload: CloseEvent },
): unknown;
export function log(
  type: "ERROR",
  data: Record<string, unknown> & { shardId: number },
): unknown;
export function log(
  type: "HEARTBEATING",
  data: { shardId: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_CLOSED",
  data: { shardId: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_DETAILS",
  data: { shardId: number; interval: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_STARTED",
  data: { shardId: number; interval: number },
): unknown;
export function log(
  type: "IDENTIFYING",
  data: { shardId: number; maxShards: number },
): unknown;
export function log(
  type: "INVALID_SESSION",
  data: { shardId: number; payload: DiscordPayload },
): unknown;
export function log(type: "RAW", data: Record<string, unknown>): unknown;
export function log(type: "RECONNECT", data: { shardId: number }): unknown;
export function log(type: "RESUMED", data: { shardId: number }): unknown;
export function log(type: "RESUMING", data: { shardId: number }): unknown;
export function log(
  type:
    | "CLOSED"
    | "CLOSED_RECONNECT"
    | "ERROR"
    | "HEARTBEATING"
    | "HEARTBEATING_CLOSED"
    | "HEARTBEATING_DETAILS"
    | "HEARTBEATING_STARTED"
    | "IDENTIFYING"
    | "INVALID_SESSION"
    | "RAW"
    | "RECONNECT"
    | "RESUMED"
    | "RESUMING",
  data: unknown,
) {
  console.log(type, data);
}
