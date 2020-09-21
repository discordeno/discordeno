import type { ClientOptions, EventHandlers } from "../types/options.ts";
import type { DiscordBotGatewayData } from "../types/discord.ts";

import { spawnShards } from "./shardingManager.ts";
import { endpoints } from "../constants/discord.ts";
import { RequestManager } from "./requestManager.ts";

export let authorization = "";
export let botID = "";

export let eventHandlers: EventHandlers = {};

export let botGatewayData: DiscordBotGatewayData;

export const identifyPayload: IdentifyPayload = {
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

export interface IdentifyPayload {
  token: string;
  compress: boolean;
  properties: {
    $os: string;
    $browser: string;
    $device: string;
  };
  intents: number;
  shard: [number, number];
}

export const createClient = async (data: ClientOptions) => {
  if (data.eventHandlers) eventHandlers = data.eventHandlers;
  authorization = `Bot ${data.token}`;

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
};

export default createClient;

export function updateEventHandlers(newEventHandlers: EventHandlers) {
  eventHandlers = newEventHandlers;
}

export function setBotID(id: string) {
  if (botID !== id) botID = id;
}
