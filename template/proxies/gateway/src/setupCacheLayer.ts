import { Collection } from "../../../../util/collection.ts";
import type { ProxyGateway } from "./startProxy.ts";

export function setupCacheLayer(gateway: ProxyGateway) {
  gateway.guilds = new Collection();
}
