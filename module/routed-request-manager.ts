import DiscordRequestManager from "./discord-request-manager.ts"
import Client from "./client.ts"
import { resolveURLs } from "./url.ts"
import { baseEndpoints } from "../constants/discord.ts"
import { Ratelimit, Ratelimiter } from './ratelimiter.ts';
import { RequestMethod } from '../types/fetch.ts';

export class RouteAwareDiscordRequestManager extends DiscordRequestManager {
  protected currentRatelimit?: Ratelimit;
  ratelimiter = new Ratelimiter();

  constructor(public client: Client, public routeName: string) {
    super(client)
  }

  protected resolveURL(url: string) {
    return resolveURLs(baseEndpoints.BASE_URL, this.routeName, url)
  }

  async runMethod (method: RequestMethod, url: string, body?: unknown) {
    if (this.currentRatelimit) {
      await this.ratelimiter.awaitRatelimit(this.currentRatelimit);
    }

    const response = await this.baseCreateRequestForMethod(method, url, body);

    // Capture the ratelimit from this request in our cute little store.

    return response.json();
  }

  protected createRatelimitFromRequest (_request: Request) {

  }
}

export class RoutedDiscordRequestManager {
  protected routeMap = new Map<string, DiscordRequestManager>()

  constructor(public client: Client) {}

  forRoute(routeName: string) {
    if (this.routeMap.has(routeName)) {
      return this.routeMap.get(routeName)
    }

    const routeRequestManager = new RouteAwareDiscordRequestManager(this.client, routeName)
    this.routeMap.set(routeName, routeRequestManager)
    return routeRequestManager
  }
}
