import { RequestManager, DiscordBotGatewayData, spawnShards } from "../../mod.ts";
import { endpoints } from "../constants/discord.ts";
import { ClientOptions } from "../types/options.ts";
import { botGatewayData, identifyPayload } from "./client.ts";

const botOptions = {
	token: "",
	eventHandlers: {}
}

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startHugeBot(data: HugeBotOptions) {
  botOptions.token = `Bot ${data.token}`;
	if (data.eventHandlers) botOptions.eventHandlers = data.eventHandlers;

  // Initial API connection to get info about bots connection
  botGatewayData = await RequestManager.get(
    endpoints.GATEWAY_BOT,
  ) as DiscordBotGatewayData;

  identifyPayload.token = data.token;
  identifyPayload.intents = data.intents.reduce(
    (bits, next) => (bits |= next),
    0,
  );
  identifyPayload.shard = [0, botGatewayData.shards];

  spawnShards(botGatewayData, identifyPayload);
}

export interface HugeBotOptions extends ClientOptions {
	/** This can be used to distribute your bot across different servers. For example, if you wanted 1 million shards per server you could control it using this. */
	shards: [number, number];
	/** This can be used to forward the ws handling to a proxy. */
	wsURL?: string;
	/** This can be used to forward the REST handling to a proxy. */
	restURL?: string;
}
