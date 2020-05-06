import { endpoints } from "../constants/discord.ts"
import { DiscordBotGatewayData } from "../types/discord.ts"
import { ClientOptions, EventHandlers } from "../types/options.ts"
import { RequestManager } from "./requestManager.ts"
import { Channel } from "../structures/channel.ts"
import { spawnShards } from "./shardingManager.ts"
import { cache } from "../utils/cache.ts"

export let authorization = ""
export let botID = ""
/** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
export let token = ""

export let eventHandlers: EventHandlers = {}

export let botGatewayData: DiscordBotGatewayData


export const identifyPayload = {
  token: "",
  compress: false,
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno",
  },
  intents: 0,
  shards: [0, 0],
}

export const createClient = async (data: ClientOptions) => {
  // Assign some defaults to the options to make them fulfilled / not annoying to use.
  botID = data.botID
  token = data.token
  if (data.eventHandlers) eventHandlers = data.eventHandlers
  authorization = `Bot ${data.token}`

  // Initial API connection to get info about bots connection
  botGatewayData = await RequestManager.get(endpoints.GATEWAY_BOT)

  identifyPayload.token = data.token
  identifyPayload.intents = data.intents.reduce((bits, next) => (bits |= next), 0)

  spawnShards(botGatewayData, identifyPayload)
}



export default createClient

export const updateChannelCache = (key: string, value: Channel) => {
  cache.channels.set(key, value)
}
