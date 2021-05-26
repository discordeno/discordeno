import { getGatewayBot } from "../../helpers/mod.ts";
import { DiscordGatewayIntents, GatewayPayload } from "../../types/mod.ts";
import { Collection } from "../../util/collection.ts";
import { DiscordenoShard, StartGatewayOptions, WebSocketRequest, ws } from "../../ws/mod.ts";
import Client from "../Client.ts";
import { ClientOptions } from "../types/client_options.ts";

// PLACEHOLDER
export class Shard {}

export class GatewayManager extends Collection<number, Shard> {
  /** The bot client this is managing for. */
  client: Client;
  lastConnectedAt: number;
  timeout: number;

  /** The gateway version to use. */
  gatewayVersion: number;
  /** The url to connect to. */
  url: string;
  /** The token for the bot. */
  token: string;

  constructor(client: Client) {
    super();

    this.client = client;
    this.lastConnectedAt = 0;
    this.timeout = 0;

    this.gatewayVersion = this.client.options.gatewayVersion || 9;
    this.url = "wss://gateway.discord.gg/";
    this.token = `Bot ${this.client.options.token}`;

    this.setup(this.client.options);
  }

  /** The amount of buckets available to start shards concurrently. */
  get maxConcurrency() {
    return ws.botGatewayData.sessionStartLimit.maxConcurrency;
  }

  /** Change the amount of buckets available to start shards concurrently. */
  set maxConcurrency(amount: number) {
    ws.botGatewayData.sessionStartLimit.maxConcurrency = amount;
  }

  /** The max amount of shards. */
  get maxShards() {
    return ws.maxShards;
  }

  /** Change the max amount of shards. */
  set maxShards(amount: number) {
    ws.maxShards = amount;
  }

  /** The first shard id to use. */
  get firstShardId() {
    return ws.firstShardId;
  }

  /** Change the last shard id to use. */
  set firstShardId(amount: number) {
    ws.firstShardId = amount;
  }

  /** The last shard id to use. */
  get lastShardId() {
    return ws.lastShardId;
  }

  /** Change the last shard id to use. */
  set lastShardId(amount: number) {
    ws.lastShardId = amount;
  }

  /** The intents to use for the bot. */
  get intents() {
    return ws.identifyPayload.intents;
  }

  /** Change the intents to use for the bot. */
  set intents(intents: number | (DiscordGatewayIntents | keyof typeof DiscordGatewayIntents)[]) {
    if (typeof intents === "number") {
      ws.identifyPayload.intents = intents;
      return;
    }

    ws.identifyPayload.intents = intents.reduce(
      (bits, next) => (bits |= typeof next === "string" ? DiscordGatewayIntents[next] : next),
      0
    );
  }

  /** Whether or not to use compression. */
  get compress() {
    return ws.identifyPayload.compress;
  }

  /** Change whether or not to use compression. */
  set compress(enabled: boolean) {
    ws.identifyPayload.compress = enabled;
  }

  async setup(options: ClientOptions) {
    // Initial API connection to get info about bots connection
    const data = await getGatewayBot();
    if (!this.maxShards) this.maxShards = data.shards;
    if (!this.lastShardId) this.lastShardId = data.shards - 1;

    // Explicitly append gateway version and encoding
    this.url += `?v=${this.gatewayVersion}&encoding=json`;

    ws.log = (type: string, data: unknown) => {
      this.client.emit("debug", type, data);
    };

    // Set the options provided by the constructor
    for (const [key, value] of Object.entries(options)) {
      if (this[key as keyof ClientOptions]) {
        // TODO: find a better way to do this
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        this[key] = value;
      }
    }

    ws.identifyPayload.token = this.token;

    // THIS IS WHAT STARTS IT!
    this.startup();
  }

  startup() {
    this.spawnShards();
  }

  /** Use this function to close a ws connection properly */
  closeWS(socket: WebSocket, code?: number | undefined, reason?: string | undefined) {
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
  sendShardMessage(shard: number | DiscordenoShard, message: WebSocketRequest, highPriority?: boolean) {
    return ws.sendShardMessage(shard, message, highPriority);
  }

  /** Begin spawning shards. */
  spawnShards() {
    return ws.spawnShards(this.firstShardId);
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
