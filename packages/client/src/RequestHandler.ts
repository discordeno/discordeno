import type { RequestMethods, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import Base from './Base.js'
import type Client from './Client.js'
import type { FileContent, RequestHandlerOptions } from './typings.js'

// TODO: make dynamic based on package.json file
const version = '19.0.0-alpha.1'

export class RequestHandler {
  /** The client manager. */
  client: Client
  /** The options this manager was configured with. */
  options: RequestHandlerOptions
  /** The user agent used to make requests. */
  userAgent: string
  /** The rate limits currently in cache. */
  ratelimits: Record<string, unknown>
  /** The latency information for this manager. */
  latencyRef: {
    latency: number
    raw: number[]
    timeOffset: number
    timeOffsets: number[]
    lastTimeOffsetCheck: number
  }

  /** Whether or not the manager is globally blocked. */
  globalBlock: boolean
  /** The ready queue */
  readyQueue: unknown[]
  /** The internal rest manager from dd. */
  discordeno: RestManager

  constructor(client: Client, options: RequestHandlerOptions) {
    this.options = options = Object.assign(
      {
        // agent: client.options.agent || null,
        agent: null,
        baseURL: 'https://discord.com/api',
        decodeReasons: true,
        disableLatencyCompensation: false,
        domain: 'discord.com',
        // latencyThreshold: client.options.latencyThreshold || 30000,
        latencyThreshold: 30000,
        // ratelimiterOffset: client.options.ratelimiterOffset || 0,
        ratelimiterOffset: 0,
        // requestTimeout: client.options.requestTimeout || 15000,
        requestTimeout: 15000,
      },
      options,
    )

    this.client = client
    this.discordeno = createRestManager({
      token: this.client.token,
      baseUrl: options.baseURL ?? this.client.options.proxyURL,
    })

    this.userAgent = `DiscordBot (https://github.com/discordeno/discordeno, ${version})`
    this.ratelimits = {}
    this.latencyRef = {
      latency: this.options.ratelimiterOffset ?? 0,
      raw: new Array(10).fill(this.options.ratelimiterOffset),
      timeOffset: 0,
      timeOffsets: new Array(10).fill(0),
      lastTimeOffsetCheck: 0,
    }
    this.globalBlock = false
    this.readyQueue = []
  }

  /**
   * @deprecated Use `.client` instead
   */
  get _client(): Client {
    return this.client
  }

  /**
   * @deprecated Useless, handled by discordeno itself. Kept for Eris api compatibility.
   */
  globalUnblock(): void {}

  warnUser(): void {}

  /**
   * Make an API request
   * @deprecated Use a proxy rest instead.
   */
  async request(method: RequestMethods, url: string, auth?: boolean, body?: any, file?: FileContent): Promise<unknown> {
    if (file) body.file = file

    return await this.discordeno.makeRequest(method, url, body)
  }

  routefy(url: string, method: RequestMethods): string {
    return this.discordeno.simplifyUrl(url, method)
  }

  toString(): string {
    return '[RequestHandler]'
  }

  toJSON(props: string[] = []): Record<string, any> {
    return Base.prototype.toJSON.call(this, ['globalBlock', 'latencyRef', 'options', 'ratelimits', 'readyQueue', 'userAgent', ...props])
  }
}

export default RequestHandler
