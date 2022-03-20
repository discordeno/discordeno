import { GatewayOpcodes } from "../types/shared.ts";

export interface DiscordenoShard {
  /** The shard id number. */
  id: number;
  /** The websocket for this shard. */
  ws: WebSocket;
  /** The session id important for resuming connections. */
  sessionId: string;
  /** The previous sequence number, important for resuming connections. */
  previousSequenceNumber: number | null;
  /** Whether the shard is currently resuming. */
  resuming: boolean;
  /** Whether the shard has received the ready event. */
  ready: boolean;
  /** The list of guild ids that are currently unavailable due to an outage. */
  unavailableGuildIds: Set<bigint>;
  failedToLoadTimeoutId?: number;
  heartbeat: {
    /** The exact timestamp the last heartbeat was sent. */
    lastSentAt: number;
    /** The timestamp the last heartbeat ACK was received from discord. */
    lastReceivedAt: number;
    /** Whether or not the heartbeat was acknowledged  by discord in time. */
    acknowledged: boolean;
    /** Whether or not to keep heartbeating. Useful for when needing to stop heartbeating. */
    keepAlive: boolean;
    /** The interval between heartbeats requested by discord. */
    interval: number;
    /** The id of the interval, useful for stopping the interval if ws closed. */
    intervalId: number;
  };
  /** The items/requestst that are in queue to be sent to this shard websocket. */
  queue: WebSocketRequest[];
  /** Whether or not the queue for this shard is being processed. */
  processingQueue: boolean;
  /** When the first request for this minute has been sent. */
  queueStartedAt: number;
  /** The request counter of the queue. */
  queueCounter: number;
  /** The safe number of requests that can be made while preserving some for required things like heartbeating. */
  safeRequestsPerShard: number;
}

export interface WebSocketRequest {
  op: GatewayOpcodes;
  d: unknown;
}
