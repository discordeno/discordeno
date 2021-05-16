import { GatewayPayload } from "../../types/mod.ts";
import {
  DiscordenoShard,
  StartGatewayOptions,
  WebSocketRequest,
  ws,
} from "../../ws/mod.ts";
import Client from "../Client.ts";

export class GatewayManager {
  /** The bot client this is managing for. */
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /** The handler to clean up shards that identified but never received a READY. */
  cleanupLoadingShards() {
    return ws.cleanupLoadingShards();
  }

  /** Use this function to close a ws connection properly */
  closeWS(
    socket: WebSocket,
    code?: number | undefined,
    reason?: string | undefined,
  ) {
    return ws.closeWS(socket, code, reason);
  }

  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard(shardId: number) {
    return ws.createShard(shardId);
  }

  /** Handler for processing all dispatch payloads that should be sent/forwarded to another server/vps/process. */
  handleDiscordPayload(data: GatewayPayload, shardId: number) {
    return ws.handleDiscordPayload(data, shardId);
  }

  /** Handler for handling every message event from websocket. */
  handleOnMessage(message: unknown, shardId: number) {
    return ws.handleOnMessage(message, shardId);
  }

  /** Begins heartbeating of the shard to keep it alive. */
  heartbeat(shardId: number, interval: number) {
    return ws.heartbeat(shardId, interval);
  }

  /** Begins identification of the shard to discord. */
  identify(shardId: number, maxShards: number) {
    return ws.identify(shardId, maxShards);
  }

  /** Handles processing queue of requests send to this shard. */
  processQueue(id: number) {
    return ws.processQueue(id);
  }

  /** The handler to automatically reshard when necessary. */
  resharder() {
    return ws.resharder();
  }

  resume(shardId: number) {
    return ws.resume(shardId);
  }

  /** Properly adds a message to the shards queue. */
  sendShardMessage(
    shard: number | DiscordenoShard,
    message: WebSocketRequest,
    highPriority?: boolean,
  ) {
    return ws.sendShardMessage(shard, message, highPriority);
  }

  /** Begin spawning shards. */
  spawnShards(firstShardId?: number) {
    return ws.spawnShards(firstShardId);
  }

  /** Starts the standalone gateway. This will require starting the bot separately. */
  startGateway(options: StartGatewayOptions) {
    return ws.startGateway(options);
  }

  /** Allows users to hook in and change to communicate to different clusters across different servers or anything they like. For example using redis pubsub to talk to other servers. */
  tellClusterToIdentify(workerId: number, shardId: number, bucketId: number) {
    return ws.tellClusterToIdentify(workerId, shardId, bucketId);
  }
}

export default GatewayManager;
