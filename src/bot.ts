import { getGatewayBot } from "./helpers/misc/get_gateway_bot.ts";
import { rest } from "./rest/rest.ts";
import type { EventHandlers } from "./types/discordeno/eventHandlers.ts";
import { DiscordGatewayIntents } from "./types/gateway/gateway_intents.ts";
import { snowflakeToBigint } from "./util/bigint.ts";
import { baseEndpoints, GATEWAY_VERSION } from "./util/constants.ts";
import { ws } from "./ws/ws.ts";

export let secretKey = "";
export let botId = 0n;
export let applicationId = 0n;

export let eventHandlers: EventHandlers = {};

export let proxyWSURL = `wss://gateway.discord.gg`;

export async function startBot(config: BotConfig) {
  if (config.eventHandlers) eventHandlers = config.eventHandlers;
  ws.identifyPayload.token = `Bot ${config.token}`;
  rest.token = `Bot ${config.token}`;
  ws.identifyPayload.intents = config.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );

  // Initial API connection to get info about bots connection
  ws.botGatewayData = await getGatewayBot();
  ws.maxShards = ws.maxShards || ws.botGatewayData.shards;

  // Explicitly append gateway version and encoding
  ws.botGatewayData.url += `?v=${GATEWAY_VERSION}&encoding=json`;

  proxyWSURL = ws.botGatewayData.url;

  ws.spawnShards();
}

/** Allows you to dynamically update the event handlers by passing in new eventHandlers */
export function updateEventHandlers(newEventHandlers: EventHandlers) {
  eventHandlers = {
    ...eventHandlers,
    ...newEventHandlers,
  };
}

/** INTERNAL LIB function used to set the bot Id once the READY event is sent by Discord. */
export function setBotId(id: string) {
  botId = snowflakeToBigint(id);
}

/** INTERNAL LIB function used to set the application Id once the READY event is sent by Discord. */
export function setApplicationId(id: string) {
  applicationId = snowflakeToBigint(id);
}

// BIG BRAIN BOT STUFF ONLY BELOW THIS

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
 */
export async function startBigBrainBot(options: BigBrainBotConfig) {
  rest.token = `Bot ${options.token}`;

  if (options.secretKey) secretKey = options.secretKey;
  if (options.restURL) baseEndpoints.BASE_URL = options.restURL;
  if (options.cdnURL) baseEndpoints.CDN_URL = options.cdnURL;
  if (options.eventHandlers) eventHandlers = options.eventHandlers;

  // PROXY DOESNT NEED US SPAWNING SHARDS
  if (!options.wsPort) {
    ws.identifyPayload.token = `Bot ${options.token}`;

    if (options.compress) {
      ws.identifyPayload.compress = options.compress;
    }

    ws.identifyPayload.intents = options.intents.reduce(
      (
        bits,
        next,
      ) => (bits |= typeof next === "string"
        ? DiscordGatewayIntents[next]
        : next),
      0,
    );

    // Initial API connection to get info about bots connection
    ws.botGatewayData = await getGatewayBot();
    ws.maxShards = options.lastShardId || ws.maxShards ||
      ws.botGatewayData.shards;
    ws.lastShardId = options.lastShardId || ws.botGatewayData.shards;
    // Explicitly append gateway version and encoding
    ws.botGatewayData.url += `?v=${GATEWAY_VERSION}&encoding=json`;
    proxyWSURL = ws.botGatewayData.url;

    ws.spawnShards(options.firstShardId);
  }
}

export interface BotConfig {
  token: string;
  compress?: boolean;
  intents: (DiscordGatewayIntents | keyof typeof DiscordGatewayIntents)[];
  eventHandlers?: EventHandlers;
}

export interface BigBrainBotConfig extends BotConfig {
  /** The first shard to start at for this worker. Use this to control which shards to run in each worker. */
  firstShardId: number;
  /** The last shard to start for this worker. By default it will be 25 + the firstShardId. */
  lastShardId?: number;
  /** The maximum shard Id number. Useful for zero-downtime updates or resharding. */
  maxShards?: number;
  /** This can be used to forward the ws handling to a proxy. It will disable the sharding done by the bot side. */
  wsPort?: number;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
  /** This can be used to forward the CDN handling to a proxy. */
  cdnURL?: string;
  /** This is the authorization header that your servers will send. Helpful to prevent DDOS attacks and such. */
  secretKey?: string;
}
