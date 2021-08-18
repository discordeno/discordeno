import { DiscordGatewayCloseEventCodes } from "../../../../types/codes/gateway_close_event_codes.ts";
import { DiscordGatewayOpcodes } from "../../../../types/codes/gateway_opcodes.ts";
import { GatewayPayload } from "../../../../types/gateway/gateway_payload.ts";
import { Hello } from "../../../../types/gateway/hello.ts";
import { Ready } from "../../../../types/gateway/ready.ts";
import { camelize, delay } from "../../../../util/utils.ts";
import { decompressWith } from "../../../../ws/deps.ts";
import { WebSocketRequest } from "../../../../ws/ws.ts";
import Client from "../Client.ts";
import GatewayEvents from "./Events.ts";

export class Shard {
  /** The client itself */
  client: Client;
  /** The shard id number. */
  id: number;
  /** The worker id */
  clusterId: number;
  /** The bucket id */
  bucketId: number;
  /** The websocket for this shard. */
  socket: WebSocket;
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
  /** Last time when a GUILD_CREATE event has been received for an unavailable guild. This is used to prevent infinite loops in the READY event handler. */
  lastAvailable: number;
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
  /** The event handlers */
  events: GatewayEvents;

  constructor(client: Client, shardId: number, clusterId: number, bucketId: number) {
    this.client = client;
    this.id = shardId;
    this.clusterId = clusterId;
    this.bucketId = bucketId;
    this.socket = this.createWebSocket();

    this.sessionId = "";
    this.previousSequenceNumber = 0;
    this.resuming = false;
    this.ready = false;
    this.unavailableGuildIds = new Set();
    this.lastAvailable = 0;
    this.heartbeat = {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalId: 0,
    };
    this.queue = [];
    this.processingQueue = false;
    this.queueStartedAt = Date.now();
    this.queueCounter = 0;
    this.events = new GatewayEvents(this.client);
  }

  get gateway() {
    return this.client.gateway;
  }

  identify() {
    this.client.emit("debug", "IDENTIFYING", {
      shardId: this.id,
      maxShards: this.gateway.maxShards,
    });

    // Need to clear the old heartbeat interval
    const oldShard = this.gateway.get(this.id);
    if (oldShard) {
      oldShard.closeWS(3065, "Reidentifying closure of old shard");
      clearInterval(oldShard.heartbeat.intervalId);
    }

    this.client.gateway.set(this.id, this);

    this.socket.onopen = () => {
      this.sendShardMessage(
        {
          op: DiscordGatewayOpcodes.Identify,
          d: {
            token: this.client.token,
            compress: false,
            properties: {
              $os: "linux",
              $browser: "Discordeno",
              $device: "Discordeno",
            },
            intents: this.client.gateway.intents,
            shard: [this.id, this.client.gateway.maxShards],
          },
        },
        true
      );
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(`[Identify Failure] Shard ${this.id} has not received READY event in over a minute.`);
      }, 600000);

      this.client.gateway.loadingShards.set(this.id, {
        shardId: this.id,
        resolve: (args: unknown) => {
          clearTimeout(timeout);
          resolve(args);
        },
        startedAt: Date.now(),
      });
    });
  }

  resume() {
    this.client.emit("debug", "RESUMING", { shardId: this.id });

    // NOW WE HANDLE RESUMING THIS SHARD
    // Get the old data for this shard necessary for resuming
    const oldShard = this.gateway.get(this.id);
    if (oldShard) {
      // HOW TO CLOSE OLD SHARD SOCKET!!!
      oldShard.closeWS(3064, "Resuming the shard, closing old shard.");
      // STOP OLD HEARTBEAT
      clearInterval(oldShard.heartbeat.intervalId);
    }

    // RESET DEFAULTS
    this.socket = this.createWebSocket();
    this.resuming = false;
    this.ready = false;
    this.unavailableGuildIds = new Set();
    this.lastAvailable = 0;
    this.heartbeat.lastSentAt = 0;
    this.heartbeat.lastReceivedAt = 0;
    this.heartbeat.acknowledged = false;
    this.heartbeat.keepAlive = false;
    this.heartbeat.interval = 0;
    this.heartbeat.intervalId = 0;
    this.processingQueue = false;
    this.queueStartedAt = Date.now();
    this.queueCounter = 0;

    // Resume on open
    this.socket.onopen = () => {
      this.sendShardMessage(
        {
          op: DiscordGatewayOpcodes.Resume,
          d: {
            token: this.client.token,
            session_id: this.sessionId,
            seq: this.previousSequenceNumber,
          },
        },
        true
      );
    };
  }

  async sendShardMessage(message: WebSocketRequest, highPriority = false) {
    if (!highPriority) {
      this.queue.push(message);
    } else {
      this.queue.unshift(message);
    }

    await this.processQueue();
  }

  async processQueue() {
    // If no items or its already processing then exit
    if (!this.queue.length || this.processingQueue) return;

    this.processingQueue = true;

    while (this.queue.length) {
      if (this.socket.readyState !== WebSocket.OPEN) {
        this.processingQueue = false;
        return;
      }

      const now = Date.now();
      if (now - this.queueStartedAt >= 60000) {
        this.queueStartedAt = now;
        this.queueCounter = 0;
      }

      // Send a request that is next in line
      const request = this.queue.shift();
      if (!request) return;

      if (request?.d) {
        request.d = this.client.loopObject(
          request.d as Record<string, unknown>,
          (value) =>
            typeof value === "bigint"
              ? value.toString()
              : Array.isArray(value)
              ? value.map((v) => (typeof v === "bigint" ? v.toString() : v))
              : value,
          `Running forEach loop in shard.processQueue function for changing bigints to strings.`
        );
      }

      this.client.emit("debug", "RAW_SEND", this.id, request);

      this.socket.send(JSON.stringify(request));

      // Counter is useful for preventing 120/m requests.
      this.queueCounter++;

      // Handle if the requests have been maxed
      if (this.queueCounter >= 118) {
        this.client.emit("debug", "DEBUG", {
          message: "Max gateway requests per minute reached setting timeout for one minute",
          shardId: this.id,
        });
        await delay(60000);
        this.queueCounter = 0;
        continue;
      }
    }

    this.processingQueue = false;
  }

  createWebSocket() {
    const socket = new WebSocket(this.client.proxyWebsocketURL || this.gateway.botGatewayData.url);
    socket.binaryType = "arraybuffer";

    socket.onerror = (errorEvent) => {
      this.client.emit("debug", "ERROR", {
        shardId: this.id,
        error: errorEvent,
      });
    };

    socket.onmessage = ({ data: message }) => this.handleOnMessage(message);

    socket.onclose = (event) => {
      this.client.emit("debug", "CLOSED", {
        shardId: this.id,
        payload: event,
      });

      if (event.code === 3064 || event.reason === "Discordeno Testing Finished! Do Not RESUME!") {
        return;
      }

      if (event.code === 3065 || ["Resharded!", "Resuming the shard, closing old shard."].includes(event.reason)) {
        return this.client.emit("debug", "CLOSED_RECONNECT", {
          shardId: this.id,
          payload: event,
        });
      }

      switch (event.code) {
        // Discordeno tests finished
        case 3061:
          return;
        case 3063: // Resharded
        case 3064: // Resuming
        case 3065: // Reidentifying
        case 3066: // Missing ACK
          // Will restart shard manually
          return this.client.emit("debug", "CLOSED_RECONNECT", {
            shardId: this.id,
            payload: event,
          });
        case DiscordGatewayCloseEventCodes.UnknownOpcode:
        case DiscordGatewayCloseEventCodes.DecodeError:
        case DiscordGatewayCloseEventCodes.AuthenticationFailed:
        case DiscordGatewayCloseEventCodes.AlreadyAuthenticated:
        case DiscordGatewayCloseEventCodes.InvalidShard:
        case DiscordGatewayCloseEventCodes.ShardingRequired:
        case DiscordGatewayCloseEventCodes.InvalidApiVersion:
        case DiscordGatewayCloseEventCodes.InvalidIntents:
        case DiscordGatewayCloseEventCodes.DisallowedIntents:
          throw new Error(event.reason || "Discord gave no reason! GG! You broke Discord!");
        // THESE ERRORS CAN NO BE RESUMED! THEY MUST RE-IDENTIFY!
        case DiscordGatewayCloseEventCodes.NotAuthenticated:
        case DiscordGatewayCloseEventCodes.InvalidSeq:
        case DiscordGatewayCloseEventCodes.RateLimited:
        case DiscordGatewayCloseEventCodes.SessionTimedOut:
          this.identify();
          break;
        default:
          this.resume();
          break;
      }
    };

    return socket;
  }

  /** Use this function to close a ws connection properly */
  closeWS(code?: number, reason?: string) {
    if (this.socket.readyState !== WebSocket.OPEN) return;

    this.socket.close(code, reason);
  }

  /** Handler for handling every message event from websocket. */
  // deno-lint-ignore no-explicit-any
  async handleOnMessage(message: any) {
    if (message instanceof ArrayBuffer) {
      message = new Uint8Array(message);
    }

    if (message instanceof Uint8Array) {
      message = decompressWith(message, 0, (slice: Uint8Array) => this.gateway.utf8decoder.decode(slice));
    }

    if (typeof message !== "string") return;

    const messageData = camelize(JSON.parse(message)) as GatewayPayload;
    this.client.emit("debug", "RAW", {
      shardId: this.id,
      payload: messageData,
    });

    switch (messageData.op) {
      case DiscordGatewayOpcodes.Heartbeat:
        if (this.socket.readyState !== WebSocket.OPEN) return;

        this.heartbeat.lastSentAt = Date.now();
        // Discord randomly sends this requiring an immediate heartbeat back
        this.sendShardMessage(
          {
            op: DiscordGatewayOpcodes.Heartbeat,
            d: this.previousSequenceNumber,
          },
          true
        );
        break;
      case DiscordGatewayOpcodes.Hello:
        this.sendHeartbeat((messageData.d as Hello).heartbeatInterval);
        break;
      case DiscordGatewayOpcodes.HeartbeatACK:
        this.heartbeat.acknowledged = true;
        break;
      case DiscordGatewayOpcodes.Reconnect:
        this.client.emit("debug", "RECONNECT", { shardId: this.id });
        this.resuming = true;
        this.resume;
        break;
      case DiscordGatewayOpcodes.InvalidSession:
        this.client.emit("debug", "INVALID_SESSION", {
          shardId: this.id,
          payload: messageData,
        });

        // We need to wait for a random amount of time between 1 and 5: https://discord.com/developers/docs/topics/gateway#resuming
        await delay(Math.floor((Math.random() * 4 + 1) * 1000));

        // When d is false we need to reidentify
        if (!messageData.d) {
          this.identify();
          break;
        }

        this.resuming = true;
        this.resume();
        break;
      default:
        if (messageData.t === "RESUMED") {
          this.client.emit("debug", "RESUMED", { shardId: this.id });

          this.resuming = false;
          break;
        }

        // Important for RESUME
        if (messageData.t === "READY") {
          this.sessionId = (messageData.d as Ready).sessionId;
          this.gateway.loadingShards.get(this.id)?.resolve(true);
          this.gateway.loadingShards.delete(this.id);
          // Wait few seconds to spawn next shard
          setTimeout(() => {
            const bucket = this.gateway.buckets.get(this.bucketId);
            if (bucket) bucket.createNextShard.shift()?.();
          }, this.gateway.spawnShardDelay);
        }

        // Update the sequence number if it is present
        if (messageData.s) this.previousSequenceNumber = messageData.s;

        this.client.emit("raw", messageData);
        this.client.emit("dispatchRequirements", messageData, this.id);

        if (messageData.op !== DiscordGatewayOpcodes.Dispatch) return;

        if (messageData.t) {
          const handler = this.events[messageData.t];
          if (!handler) return this.events.missing(messageData.t, messageData);

          return this.events[messageData.t]?.(camelize(messageData), this.id);
        }

        break;
    }
  }

  async sendHeartbeat(interval: number) {
    this.client.emit("debug", "HEARTBEATING_STARTED", {
      shardId: this.id,
      interval,
    });

    this.client.emit("debug", "HEARTBEATING_DETAILS", {
      shardId: this.id,
      interval,
      shard: this,
    });

    // The first heartbeat is special so we send it without setInterval: https://discord.com/developers/docs/topics/gateway#heartbeating
    await delay(Math.floor(this.heartbeat.interval * Math.random()));

    if (this.socket.readyState !== WebSocket.OPEN) return;

    this.socket.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Heartbeat,
        d: this.previousSequenceNumber,
      })
    );

    this.heartbeat.keepAlive = true;
    this.heartbeat.acknowledged = false;
    this.heartbeat.lastSentAt = Date.now();
    this.heartbeat.interval = interval;

    this.heartbeat.intervalId = setInterval(() => {
      this.client.emit("debug", "loop", `Running setInterval in heartbeat file.`);

      this.client.emit("debug", "HEARTBEATING", {
        shardId: this.id,
      });

      if (this.socket.readyState === WebSocket.CLOSED || !this.heartbeat.keepAlive) {
        this.client.emit("debug", "HEARTBEATING_CLOSED", {
          shardId: this.id,
          shard: this,
        });

        // STOP THE HEARTBEAT
        return clearInterval(this.heartbeat.intervalId);
      }

      if (!this.heartbeat.acknowledged) {
        this.closeWS(3066, "Did not receive an ACK in time.");
        return this.identify();
      }

      if (this.socket.readyState !== WebSocket.OPEN) return;

      this.heartbeat.acknowledged = false;

      this.socket.send(
        JSON.stringify({
          op: DiscordGatewayOpcodes.Heartbeat,
          d: this.previousSequenceNumber,
        })
      );
    }, this.heartbeat.interval);
  }
}

export default Shard;
