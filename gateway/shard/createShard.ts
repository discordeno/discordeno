import { identify } from "./identify.ts";
import { handleMessage } from "./handleMessage.ts";
import {
  DEFAULT_HEARTBEAT_INTERVAL,
  GATEWAY_RATE_LIMIT_RESET_INTERVAL,
  MAX_GATEWAY_REQUESTS_PER_INTERVAL,
  Shard,
  ShardEvents,
  ShardGatewayConfig,
  ShardHeart,
  ShardSocketCloseCodes,
  ShardSocketRequest,
  ShardState,
} from "./types.ts";
import { StatusUpdate } from "../../helpers/misc/editBotStatus.ts";
import { startHeartbeating } from "./startHeartbeating.ts";
import { stopHeartbeating } from "./stopHeartbeating.ts";
import { TOKEN } from "../debug.ts";
import { resume } from "./resume.ts";
import { createLeakyBucket, LeakyBucket } from "../../util/bucket.ts";
import { calculateSafeRequests } from "./calculateSafeRequests.ts";
import { send } from "./send.ts";
import { handleClose } from "./handleClose.ts";
import { connect } from "./connect.ts";
import { close } from "./close.ts";
import { shutdown } from "./shutdown.ts";
import { isOpen } from "./isOpen.ts";

// TODO: debug
// TODO: function overwrite
// TODO: improve shard event resolving

// TODO: remove
export function censor(message: any) {
  return JSON.parse(JSON.stringify(message).replace(TOKEN, "[CENSORED]"));
}

/** */
export function createShard(
  options: CreateShard,
): Shard {
  // This is done for performance reasons
  const calculateSafeRequestsOverwritten = options.calculateSafeRequests ?? calculateSafeRequests;
  const closeOverwritten = options.close ?? close;
  const connectOverwritten = options.connect ?? connect;
  const identifyOverwritten = options.identify ?? identify;
  const sendOverwritten = options.send ?? send;
  const shutdownOverwritten = options.shutdown ?? shutdown;
  const resumeOverwritten = options.resume ?? resume;
  const handleCloseOverwritten = options.handleClose ?? handleClose;
  const handleMessageOverwritten = options.handleMessage ?? handleMessage;
  const isOpenOverwritten = options.isOpen ?? isOpen;
  const startHeartbeatingOverwritten = options.startHeartbeating ?? startHeartbeating;
  const stopHeartbeatingOverwritten = options.stopHeartbeating ?? stopHeartbeating;

  return {
    gatewayConfig: options.gatewayConfig,
    id: options.id,
    maxRequestsPerRateLimitTick: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
    rateLimitResetInterval: GATEWAY_RATE_LIMIT_RESET_INTERVAL,
    state: ShardState.Offline,
    totalShards: options.totalShards,
    previousSequenceNumber: options.previousSequenceNumber || null,

    calculateSafeRequests: function () {
      return calculateSafeRequestsOverwritten(this);
    },

    close: function (code, reason) {
      return closeOverwritten(this, code, reason);
    },

    connect: async function () {
      return await connectOverwritten(this);
    },

    identify: async function () {
      return await identifyOverwritten(this);
    },

    makePresence: options.makePresence,

    send: async function (message, highPriority = false) {
      return sendOverwritten(this, message, highPriority);
    },

    shutdown: async function () {
      return await shutdownOverwritten(this);
    },

    resume: async function () {
      return await resumeOverwritten(this);
    },

    heart: {
      acknowledged: false,
      interval: DEFAULT_HEARTBEAT_INTERVAL,
    },

    event: options.event ?? {},

    bucket: createLeakyBucket({
      max: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
      refillInterval: GATEWAY_RATE_LIMIT_RESET_INTERVAL,
      refillAmount: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
    }),

    handleClose: async function (close) {
      return await handleCloseOverwritten(this, close);
    },

    handleMessage: async function (message) {
      return await handleMessageOverwritten(this, message);
    },

    isOpen: function () {
      return isOpenOverwritten(this);
    },

    offlineSendQueue: [],

    resolves: new Map(),

    startHeartbeating: function (interval: number) {
      return startHeartbeatingOverwritten(this, interval);
    },

    stopHeartbeating: function () {
      return stopHeartbeatingOverwritten(this);
    },

    requestIdentify: async function () {
      return await options.requestIdentify(this.id);
    },
  };
}

// const shard = createShard({
//   id: 0,
//   gatewayConfig: {
//     compress: true,
//     url: "wss://gateway.discord.gg",
//     version: 10,
//     intents: 1 << 1,
//     properties: {
//       $os: "Discordeno",
//       $browser: "Discordeno",
//       $device: "Discordeno",
//     },
//     token: TOKEN,
//   },
//   totalShards: 1,
//   makePresence: (shardId) => ({
//     activities: [
//       {
//         name: `Cards Against Humanity #${shardId}`,
//         type: 0,
//         createdAt: Date.now(),
//       },
//     ],
//     status: "dnd",
//   }),
//   requestIdentify: async () => {},
// });

export interface CreateShard {
  /** Id of the shard which should be created. */
  id: number;

  /** Gateway configuration for the shard. */
  gatewayConfig: ShardGatewayConfig;

  /** The total amount of shards which are used to communicate with Discord. */
  totalShards: number;

  /** This function communicates with the management process, in order to know whether its free to identify.
   * When this function resolves, this means that the shard is allowed to send an identify payload to discord.
   */
  requestIdentify: (shardId: number) => Promise<void>;

  /** Calculate the amount of requests which can safely be made per rate limit interval,
   * before the gateway gets disconnected due to an exceeded rate limit.
   */
  calculateSafeRequests?: typeof calculateSafeRequests;

  /** Close the socket connection to discord if present. */
  close?: typeof close;

  /** Connect the shard with the gateway and start heartbeating.
   * This will not identify the shard to the gateway.
   */
  connect?: typeof connect;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Handle a gateway connection close.
   */
  handleClose?: typeof handleClose;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Handle an incoming gateway message.
   */
  handleMessage?: typeof handleMessage;

  /** Identify the shard to the gateway.
   * If not connected, this will also connect the shard to the gateway.
   */
  identify?: typeof identify;

  /** Check whether the connection to Discord is currently open. */
  isOpen?: typeof isOpen;

  /** Function which can be overwritten in order to get the shards presence. */
  makePresence?(shardId: number): Promise<StatusUpdate> | StatusUpdate;

  /** The maximum of requests which can be send to discord per rate limit tick.
   * Typically this value should not be changed.
   */
  maxRequestsPerRateLimitTick?: number;

  /** The previous payload sequence number. */
  previousSequenceNumber?: number;

  /** In which interval (in milliseconds) the gateway resets it's rate limit. */
  rateLimitResetInterval?: number;

  /** Attempt to resume the previous shards session with the gateway. */
  resume?: typeof resume;

  /** Send a message to Discord.
   * @param {boolean} [highPriority=false] - Whether this message should be send asap.
   */
  send?: typeof send;

  /** Shutdown the shard.
   * Forcefully disconnect the shard from Discord.
   * The shard may not attempt to reconnect with Discord.
   */
  shutdown?: typeof shutdown;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Start sending heartbeat payloads to Discord in the provided interval.
   */
  startHeartbeating?: typeof startHeartbeating;

  /** Current internal state of the shard. */
  state?: ShardState;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Stop the heartbeating process with discord.
   */
  stopHeartbeating?: typeof stopHeartbeating;

  /** The shard related event handlers. */
  event?: ShardEvents;
  /** This contains all the heartbeat information */
  heart?: ShardHeart;
  /** Bucket for handling shard request rate limits. */
  bucket?: LeakyBucket;
  /** Cache for pending gateway requests which should have been send while the gateway went offline. */
  offlineSendQueue?: ShardSocketRequest[];
  /** This is used to resolve internal waiting states.
   * Mapped by SelectedEvents => ResolveFunction
   */
  resolves?: Shard["resolves"];
}
