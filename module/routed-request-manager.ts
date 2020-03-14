import Request_Manager from "./discord-request-manager.ts"
import Client from "./client.ts"
import { resolveURLs } from "./url.ts"
import { baseEndpoints } from "../constants/discord.ts"
import { Ratelimit, Ratelimiter } from "./ratelimiter.ts"
import { RequestMethod } from "../types/fetch.ts"

export class RouteAwareRequest_Manager extends Request_Manager {
  protected currentRatelimit?: Ratelimit
  ratelimiter = new Ratelimiter()

  constructor(public client: Client, public routeName: string) {
    super(client)
  }

  protected resolveURL(url: string) {
    return resolveURLs(baseEndpoints.BASE_URL, this.routeName, url)
  }

  async runMethod(method: RequestMethod, url: string, body?: unknown) {
    if (this.currentRatelimit) {
      await this.ratelimiter.awaitRatelimit(this.currentRatelimit)
    }

    const response = await this.baseCreateRequestForMethod(method, url, body)

    // Capture the ratelimit from this request in our cute little store.

    return response.json()
  }

  protected createRatelimitFromRequest(_request: Request) {}
}

export class RoutedRequest_Manager {
  protected routeMap = new Map<string, Request_Manager>()

  constructor(public client: Client) {}

  forRoute(routeName: string) {
    if (this.routeMap.has(routeName)) {
      return this.routeMap.get(routeName)
    }

    const routeRequestManager = new RouteAwareRequest_Manager(this.client, routeName)
    this.routeMap.set(routeName, routeRequestManager)
    return routeRequestManager
  }
}
