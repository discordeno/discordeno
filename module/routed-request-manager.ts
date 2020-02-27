import DiscordRequestManager from "./discord-request-manager.ts"
import Client from "./client.ts"
import { resolveURLs } from "./url.ts"
import { baseEndpoints } from "../constants/discord.ts"

export class RouteAwareDiscordRequestManager extends DiscordRequestManager {
  constructor(public client: Client, public routeName: string) {
    super(client)
  }

  protected resolveURL(url: string) {
    return resolveURLs(baseEndpoints.BASE_URL, this.routeName, url)
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
