import { DiscordBotGatewayData, RequestManager, spawnBigBrainBotShards } from "../../mod.ts";
import { endpoints } from "../constants/discord.ts";
import { ClientOptions, EventHandlers } from "../types/options.ts";

const botOptions = {
  createNextShard: false,
  workers: new Map<number, Worker>(),
  eventHandlers: {} as EventHandlers,
  botGatewayData: {} as DiscordBotGatewayData,
  identifyPayload: {
    token: "",
    compress: true,
    properties: {
      $os: "linux",
      $browser: "Discordeno",
      $device: "Discordeno",
    },
    intents: 0,
    shard: [0, 0] as [number, number],
  },
};

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startBigBrainBot(data: BigBrainBotOptions) {
  botOptions.identifyPayload.token = `Bot ${data.token}`;
  if (data.eventHandlers) botOptions.eventHandlers = data.eventHandlers;
  if (data.compress) botOptions.identifyPayload.compress = data.compress;

  // Initial API connection to get info about bots connection
  botOptions.botGatewayData = await RequestManager.get(
    endpoints.GATEWAY_BOT,
  ) as DiscordBotGatewayData;

  botOptions.identifyPayload.intents = data.intents.reduce(
    (bits, next) => (bits |= next),
    0,
  );

  spawnBigBrainBotShards(botOptions.botGatewayData, botOptions.identifyPayload, data.firstShardID, data.lastShardID || (data.firstShardID + 25));
}



export interface BigBrainBotOptions extends ClientOptions {
  /** The first shard to start at for this worker. Use this to control which shards to run in each worker. */
  firstShardID: number;
  /** The last shard to start for this worker. By default it will be 25 + the firstShardID. */
  lastShardID?: number;
  /** This can be used to forward the ws handling to a proxy. */
  wsURL?: string;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
}
