import { Properties } from "./discord.ts"

export interface FulfilledClientOptions {
  token: string
  properties: Properties
  compress: boolean
}

export interface ClientOptions {
  token: string
  properties?: Properties
  compress?: boolean
  bot_id: string
}
