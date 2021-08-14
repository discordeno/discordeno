import { BotConfig } from "../../../bot.ts";
import { PresenceUpdate } from "../../../types/activity/presence_update.ts";
import { Intents } from "../../../types/gateway/gateway_intents.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { EventEmitter, decode } from "../../deps.ts";
import Channel from "./Channel.ts";
import { GatewayManager } from "./Gateway/GatewayManager.ts";
import { Guild } from "./Guild.ts";
import Member from "./Member.ts";
import Message from "./Message.ts";
import HelperManager from "./utils/helpers/HelperManager.ts";
import RestManager from "./utils/RestManager.ts";

export interface ClientOptions {
  /** The bot token to use for this client. */
  token: string;
}

export class Client extends EventEmitter {
  /** The id of the bot. */
  id: bigint;
  /** Most likely the bot's id but for old bots this can be different. Necessary for slash bots and such.*/
  applicationId: bigint;
  /** The options that were used to create this client. */
  options: Omit<BotConfig, "eventHandlers">;
  /** The timestamp when the bot started. */
  startedAt: number;
  /** The manager for the gateway/sharding. */
  gateway: GatewayManager;
  /** The rest manager for the api. */
  rest: RestManager;
  /** All the helper methods */
  helpers: HelperManager;

  /** The guilds that are cached. */
  guilds: Collection<bigint, Guild>;

  /** The ids for the guilds that are active. */
  activeGuildIds = new Set<bigint>();

  /** The ids for the guilds that have been removed from cache and awaiting a dispatch event to recache. */
  dispatchedGuildIds = new Set<bigint>();

  /** The ids for the channels that have been removed from cache and awaiting a dispatch event to recache. */
  dispatchedChannelIds = new Set<bigint>();

  /** The ids of the guilds that are unavailable. When discord's servers crash they go into here until they are available again. */
  unavailableGuildIds = new Collection<bigint, number>();

  /** The dm channels that this bot has cached. */
  dmChannels = new Collection<bigint, Channel>();

  /** The nonce used for the fetch member requests on the websocketthat are currently pending. */
  fetchAllMembersProcessingRequests = new Collection<
    string,
    (value: Collection<bigint, Member> | PromiseLike<Collection<bigint, Member>>) => void
  >();

  /** All the presences that were cached for all the users */
  presences: Collection<bigint, PresenceUpdate>;

  constructor(options: Omit<BotConfig, "eventHandlers">) {
    super();

    // SET NECESSARY OPTIONS FOR THE BOT
    this.options = options;
    this.options.token = `Bot ${options.token}`;
    this.id = this.tokenToBotId;
    this.applicationId = this.id;
    this.startedAt = Date.now();

    // SETUP THE CACHE HOLDERS
    this.guilds = new Collection<bigint, Guild>([], { sweeper: { filter: this.guildsSweeper, interval: 3600000 } });

    this.presences = new Collection<bigint, PresenceUpdate>([], { sweeper: { filter: () => true, interval: 300000 } });

    // SETUP THE GATEWAY MANAGER
    this.gateway = new GatewayManager(this);
    this.gateway.intents = options.intents.reduce(
      (bits, next) => (bits |= typeof next === "string" ? Intents[next] : next),
      0
    );
    this.gateway.compress = options.compress || false;

    // SETUP THE REST MANAGER
    this.rest = new RestManager(this);

    // SETUP THE HELPER METHODS
    this.helpers = new HelperManager(this);
  }

  /** The token for the bot. */
  get token() {
    return this.options.token;
  }

  /** Set the bots token if necessary. THIS WILL NOT ADD A PREFIX TO THE TOKEN! */
  set token(value: string) {
    this.options.token = value;
  }

  /** Determine the bot id using the token provided. */
  get tokenToBotId() {
    return snowflakeToBigint(new TextDecoder().decode(decode(this.token.split(".")[0] || "")));
  }

  /** The time in milliseconds that the bot has been online. */
  get uptime() {
    return Date.now() - this.startedAt;
  }

  /** All the users that have been cached. */
  get users() {
    const users = new Collection<bigint, Member>();
    for (const guild of this.guilds.values()) {
      for (const member of guild.members.values()) {
        if (!users.has(member.id)) users.set(member.id, member);
      }
    }

    return users;
  }

  /** Begin the bot startup process. Connects to the discord gateway. */
  async connect() {
    // INITIAL API CONNECTION TO GET INFO ABOUT BOTS CONNECTION
    this.gateway.botGatewayData = await this.helpers.getGatewayBot();
    this.gateway.botGatewayData.url += `?v=${this.gateway.version}&encoding=json`;
    // IF DEFAULTS WERE NOT MODIFED, SET TO RECOMMENDED DISCORD DEFAULTS
    if (!this.gateway.maxShards) {
      this.gateway.maxShards = this.gateway.botGatewayData.shards;
    }
    if (!this.gateway.lastShardId) {
      this.gateway.lastShardId = this.gateway.botGatewayData.shards - 1;
    }

    this.gateway.spawnShards();

    return this;
  }

  // UTILS
  loopObject<T = Record<string, unknown>>(
    obj: Record<string, unknown>,
    handler: (value: unknown, key: string) => unknown,
    log: string
  ) {
    let res: Record<string, unknown> | unknown[] = {};

    if (Array.isArray(obj)) {
      res = [];

      for (const o of obj) {
        if (typeof o === "object" && !Array.isArray(o) && o !== null) {
          // A nested object
          res.push(this.loopObject(o as Record<string, unknown>, handler, log));
        } else {
          res.push(handler(o, "array"));
        }
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        this.emit("DEBUG", "LOOPING", log);

        if (typeof value === "object" && !Array.isArray(value) && value !== null && !(value instanceof Blob)) {
          // A nested object
          res[key] = this.loopObject(value as Record<string, unknown>, handler, log);
        } else {
          res[key] = handler(value, key);
        }
      }
    }

    return res as T;
  }

  guildsSweeper(guild: Guild) {
    // Reset activity for next interval
    if (this.activeGuildIds.delete(guild.id)) return false;

    // This is inactive guild. Not a single thing has happened for atleast 30 minutes.
    // Not a reaction, not a message, not any event!
    this.dispatchedGuildIds.add(guild.id);

    return true;
  }

  channelSweeper(channel: Channel, key: bigint) {
    // If this is in a guild and the guild was dispatched, then we can dispatch the channel
    if (channel.guildId && this.dispatchedGuildIds.has(channel.guildId)) {
      this.dispatchedChannelIds.add(channel.id);
      return true;
    }

    // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
    if (!channel.guildId && !this.users.has(key)) return true;

    return false;
  }

  memberSweeper(member: Member) {
    // Don't sweep the bot else strange things will happen
    if (member.id === this.id) return false;

    // Only sweep members who were not active the last 30 minutes
    return Date.now() - member.cachedAt > 1800000;
  }

  messageSweeper(message: Message) {
    // DM messages aren't needed
    if (!message.guildId) return true;

    // Only delete messages older than 10 minutes
    return Date.now() - message.timestamp > 600000;
  }
}

export default Client;
