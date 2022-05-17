import { createGatewayManager, GatewayManager } from "../../../../gateway/gatewayManager.ts";
import { DiscordChannel, DiscordGuild, DiscordMember, DiscordRole, DiscordUser } from "../../../../types/discord.ts";
import { Collection } from "../../../../util/collection.ts";
import { setupCacheLayer } from "./setupCacheLayer.ts";
import { setupEventsCaching } from "./setupEventsCaching.ts";
import { proxyGuild } from "./structures/guild.ts";

/** Starts a gateway proxy using the options provided. */
export function startProxy(options: ProxyOptions) {
  const gateway = createGatewayManager(options) as ProxyGateway;
  // Add cache layer of collections to gateway
  setupCacheLayer(gateway);
  // Setup cache add/remove on events
  setupEventsCaching(gateway);

  return gateway;
}

export interface ProxyOptions extends GatewayManager {
  /** The bot token */
  token: string;
}

export interface ProxyGateway extends GatewayManager {
  guilds: Collection<bigint | string, ReturnType<typeof proxyGuild>>;
}
