import { DiscordPayload } from "../../types/discord.ts";
import { DiscordenoShard } from "./ws.ts";

/** The handler for logging different actions happening inside the ws. User can override and put custom handling per event. */
export function log(
  type: "CLOSED",
  data: { shardID: number; payload: CloseEvent },
): unknown;
export function log(
  type: "CLOSED_RECONNECT",
  data: { shardID: number; payload: CloseEvent },
): unknown;
export function log(
  type: "ERROR",
  data: Record<string, unknown> & { shardID: number },
): unknown;
export function log(
  type: "HEARTBEATING",
  data: { shardID: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_CLOSED",
  data: { shardID: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_DETAILS",
  data: { shardID: number; interval: number; shard: DiscordenoShard },
): unknown;
export function log(
  type: "HEARTBEATING_STARTED",
  data: { shardID: number; interval: number },
): unknown;
export function log(
  type: "IDENTIFYING",
  data: { shardID: number; maxShards: number },
): unknown;
export function log(
  type: "INVALID_SESSION",
  data: { shardID: number; payload: DiscordPayload },
): unknown;
export function log(type: "RAW", data: Record<string, unknown>): unknown;
export function log(type: "RECONNECT", data: { shardID: number }): unknown;
export function log(type: "RESUMED", data: { shardID: number }): unknown;
export function log(type: "RESUMING", data: { shardID: number }): unknown;
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
