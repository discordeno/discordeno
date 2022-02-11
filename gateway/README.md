# Standalone WS / Proxy WS

This WS service is meant for ADVANCED DEVELOPERS ONLY!

## Benefits

- **Zero Downtime Updates**:

  - Your bot can be updated in a matter of seconds. With normal sharding, you have to restart which also has to process
    identifying all your shards with a 1/~5s rate limit. With WS handling moved to a proxy process, this allows you to
    instantly get the bot code restarted without any concerns of delays. If you have a bot on 200,000 servers normally
    this would mean a 20 minute delay to restart your bot if you made a small change and restarted.

- **Zero Downtime Resharding**:

  - Discord stops letting your bot get added to new servers at certain points in time. For example, suppose you had
    150,000 servers running 150 shards. The maximum amount of servers your shards could hold is 150 \* 2500 = 375,000.
    If your bot reaches this, it can no longer join new servers until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also have both.
    - `Automated`: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
      reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
      would begin re-sharding behind the scenes with `ZERO DOWNTIME`.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - `Manual`: You can also trigger this manually should you choose.

- **Horizontal Scaling**:

  - The proxy system allows you to scale the bot horizontally. When you reach a huge size, you can either keep spending
    more money to keep beefing up your server or you can buy several cheaper servers and scale horizontally. The proxy
    means you can have WS handling on a completely separate system.

- **No Loss Restarts**:

  - When you restart a bot without the proxy system, normally you would lose many events. Users may be using commands or
    messages are sent that will not be filtered. As your bot's grow this number rises dramatically. Users may join who
    wont get the auto-roles or any other actions your bot should take. With the proxy system, you can keep restarting
    your bot and never lose any events. Events will be put into a queue while your bot is down(max size of queue is
    customizable), once the bot is available the queue will begin processing all events.

- **Controllers**:

  - The controller aspect gives you full control over everything inside the proxy. You can provide a function to simply
    override the handler. For example, if you would like a certain function to do something different, instead of having
    to fork and maintain your fork, you can just provide a function to override.

- **Clustering With Workers**:
  - Take full advantage of all your CPU cores by using workers to spread the load. Control how many shards per worker
    and how many workers to maximize efficiency!

## Usage

```ts
startGateway({
  /** The bot token. */
  token: "BOT_TOKEN_HERE",
  /** Whether or not to use compression for gateway payloads. */
  compress: true,
  /** The intents you would like to enable. */
  intents: ["GUILDS", "GUILD_MESSAGES"],
  /** The max amount of shards used for identifying. This can be useful for zero-downtime updates or resharding. */
  maxShards: 885,
  /** The first shard Id for this group of shards. */
  firstShardId: 100,
  /** The last shard Id for this group. If none is provided, it will default to loading all shards. */
  lastShardId: 124,
  /** The url to forward all payloads to. */
  url: "http://urlToYourServerHere",
  /** The amount of shards per cluster. By default this is 25. Use this to spread the load from shards to different CPU cores. */
  shardsPerCluster: 25,
  /** The maximum amount of clusters available. By default this is 4. Another way to think of cluster is how many CPU cores does your server/machine have. */
  maxClusters: 46,
  /** Whether or not you want to allow automated sharding. By default this is true. */
  reshard: true;
});
```

## API / Docs

```ts
// CONTROLLER LIKE INTERFACE FOR WS HANDLING
export const ws = {
  /** The url that all discord payloads for the dispatch type should be sent to. */
  url: "",
  /** Whether or not to automatically reshard. */
  reshard: true,
  /** The percentage at which resharding should occur. */
  reshardPercentage: 80,
  /** The maximum shard Id number. Useful for zero-downtime updates or resharding. */
  maxShards: 1,
  /** The amount of shards to load per cluster */
  shardsPerCluster: 25,
  /** The maximum amount of clusters to use for your bot. */
  maxClusters: 4,
  /** The first shard Id to start spawning. */
  firstShardId: 0,
  /** The last shard Id for this cluster. */
  lastShardId: 1,
  /** This prop decides whether Discord allows our next shard to be started. When 1 starts, this is set to false until it is ready for the next one. */
  createNextShard: true,
  /** The identify payload holds the necessary data to connect and stay connected with Discords WSS. */
  identifyPayload: {
    token: "",
    compress: false,
    properties: {
      $os: "linux",
      $browser: "Discordeno",
      $device: "Discordeno",
    },
    intents: 0,
    shard: [0, 0],
  },
  botGatewayData: {
    /** The WSS URL that can be used for connecting to the gateway. */
    url: "wss://gateway.discord.gg/?v=8&encoding=json",
    /** The recommended number of shards to use when connecting. */
    shards: 1,
    /** Info on the current start limit. */
    sessionStartLimit: {
      /** The total number of session starts the current user is allowed. */
      total: 1000,
      /** The remaining number of session starts the current user is allowed. */
      remaining: 1000,
      /** Milliseconds left until limit is reset. */
      resetAfter: 0,
      /** The number of identify requests allowed per 5 seconds.
       * So, if you had a max concurrency of 16, and 16 shards for example, you could start them all up at the same time.
       * Whereas if you had 32 shards, if you tried to start up shard 0 and 16 at the same time for example, it would not work. You can start shards 0-15 concurrently, then 16-31...
       */
      maxConcurrency: 1,
    },
  },
  shards: new Collection<number, DiscordenoShard>(),
  loadingShards: new Collection<
    number,
    {
      shardId: number;
      resolve: (value: unknown) => void;
      reject: (reason?: unknown) => void;
      startedAt: number;
    }
  >(),
  utf8decoder: new TextDecoder(),

  // METHODS

  /** The handler function that starts the gateway. */
  startGateway,
  /** The handler for spawning ALL the shards. */
  spawnShards,
  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard,
  /** Begins identification of the shard to discord */
  identify,
  /** Begins heartbeating of the shard to keep it alive */
  heartbeat,
  /** Sends the discord payload to another server. */
  handleDiscordPayload,
  /** Tell the cluster/worker to begin identifying this shard  */
  tellClusterToIdentify,
  /** Handle the different logs. Used for debugging. */
  log,
  /** Handles resharding the bot when necessary. */
  resharder,
};

export interface DiscordenoShard {
  /** The shard id number */
  id: number;
  /** The websocket for this shard */
  ws: WebSocket;
  /** The amount of milliseconds to wait between heartbeats */
  resumeInterval: number;
  /** The session id important for resuming connections. */
  sessionId: string;
  /** The previous sequence number, important for resuming connections. */
  previousSequenceNumber: number | null;
  /** Whether the shard is currently resuming. */
  resuming: boolean;
  heartbeat: {
    /** The exact timestamp the last heartbeat was sent */
    lastSentAt: number;
    /** The timestamp the last heartbeat ACK was received from discord. */
    lastReceivedAt: number;
    /** Whether or not the heartbeat was acknowledged  by discord in time. */
    acknowledged: boolean;
    /** Whether or not to keep heartbeating. Useful for when needing to stop heartbeating. */
    keepAlive: boolean;
    /** The interval between heartbeats requested by discord. */
    interval: number;
    /** The id of the interval, useful for stopping the interval if ws closed. */
    intervalId: number;
  };
}
```
