import { getGatewayBot } from "./helpers/misc/get_gateway_bot.ts";
import { baseEndpoints, GATEWAY_VERSION } from "./util/constants.ts";
import { spawnShards } from "./ws/shard_manager.ts";

export let authorization = "";
export let restAuthorization = "";
export let botId = "";
export let applicationId = "";

export let eventHandlers: EventHandlers = {};

export let botGatewayData: DiscordGetGatewayBot;
export let proxyWSURL = `wss://gateway.discord.gg`;
export let lastShardId = 0;

export const identifyPayload: DiscordIdentify = {
  token: "",
  compress: true,
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno",
  },
  intents: 0,
  shard: [0, 0],
};

export async function startBot(config: BotConfig) {
  if (config.eventHandlers) eventHandlers = config.eventHandlers;
  authorization = `Bot ${config.token}`;

  // Initial API connection to get info about bots connection
  botGatewayData = await getGatewayBot();

  // Explicitly append gateway version and encoding
  botGatewayData.url += `?v=${GATEWAY_VERSION}&encoding=json`;

  proxyWSURL = botGatewayData.url;
  identifyPayload.token = config.token;
  identifyPayload.intents = config.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );
  lastShardId = botGatewayData.shards;
  identifyPayload.shard = [0, lastShardId];

  await spawnShards(botGatewayData, identifyPayload, 0, lastShardId);
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
  if (botId !== id) botId = id;
}

/** INTERNAL LIB function used to set the application Id once the READY event is sent by Discord. */
export function setApplicationId(id: string) {
  if (applicationId !== id) applicationId = id;
}

// BIG BRAIN BOT STUFF ONLY BELOW THIS

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startBigBrainBot(data: BigBrainBotConfig) {
  authorization = `Bot ${data.token}`;
  identifyPayload.token = `Bot ${data.token}`;

  if (data.restAuthorization) restAuthorization = data.restAuthorization;
  if (data.restURL) baseEndpoints.BASE_URL = data.restURL;
  if (data.cdnURL) baseEndpoints.CDN_URL = data.cdnURL;
  if (data.wsURL) proxyWSURL = data.wsURL;
  if (data.eventHandlers) eventHandlers = data.eventHandlers;
  if (data.compress) {
    identifyPayload.compress = data.compress;
  }

  identifyPayload.intents = data.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );

  // Initial API connection to get info about bots connection
  botGatewayData = await getGatewayBot();

  if (!data.wsURL) proxyWSURL = botGatewayData.url;
  await spawnShards(
    botGatewayData,
    identifyPayload,
    data.firstShardId,
    data.lastShardId ||
      (botGatewayData.shards >= 25
        ? (data.firstShardId + 25)
        : botGatewayData.shards),
  );
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
  /** This can be used to forward the ws handling to a proxy. */
  wsURL?: string;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
  /** This can be used to forward the CDN handling to a proxy. */
  cdnURL?: string;
  /** This is the authorization header that your rest proxy will validate */
  restAuthorization?: string;
}
