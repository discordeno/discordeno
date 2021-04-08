import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface Hello {
  /** The interval (in milliseconds) the client should heartbeat with */
  heartbeatInterval: number;
}

/** https://discord.com/developers/docs/topics/gateway#hello */
export type DiscordHello = SnakeCasedPropertiesDeep<Hello>;
