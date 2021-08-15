import { BotConfig } from "../../../bot.ts";
import { PresenceUpdate } from "../../../types/activity/presence_update.ts";
import { DiscordGatewayOpcodes } from "../../../types/codes/gateway_opcodes.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { DiscoveryCategory } from "../../../types/discovery/discovery_category.ts";
import { ValidateDiscoverySearchTerm } from "../../../types/discovery/validate_discovery_search_term.ts";
import { Intents } from "../../../types/gateway/gateway_intents.ts";
import { StatusUpdate } from "../../../types/gateway/status_update.ts";
import { CreateGuild } from "../../../types/guilds/create_guild.ts";
import { Guild as GuildPayload } from "../../../types/guilds/guild.ts";
import { User } from "../../../types/users/user.ts";
import { VoiceRegion } from "../../../types/voice/voice_region.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize, urlToBase64 } from "../../../util/utils.ts";
import { EventEmitter, decode } from "../deps.ts";
import Channel from "./Channel.ts";
import { GatewayManager } from "./Gateway/GatewayManager.ts";
import { Guild } from "./Guild.ts";
import Member from "./Member.ts";
import Message from "./Message.ts";
import RestManager from "./RestManager.ts";

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
  /** If you are using a proxy websocket connection, this is the url the payloads will be sent to. */
  proxyWebsocketURL?: string;

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
    this.gateway.botGatewayData = await this.getGatewayBot();
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

  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  async getGatewayBot() {
    return await this.rest.get(endpoints.GATEWAY_BOT);
  }

  /** Modifies the bot's username or avatar.
   * NOTE: username: if changed may cause the bot's discriminator to be randomized.
   */
  async editBotProfile(options: { username?: string; botAvatarURL?: string }) {
    // Nothing was edited
    if (!options.username && !options.botAvatarURL) return;
    // Check username requirements if username was provided
    if (options.username) {
      if (options.username.length > 32) {
        throw new Error(Errors.USERNAME_MAX_LENGTH);
      }
      if (options.username.length < 2) {
        throw new Error(Errors.USERNAME_MIN_LENGTH);
      }
      if (["@", "#", ":", "```"].some((char) => options.username!.includes(char))) {
        throw new Error(Errors.USERNAME_INVALID_CHARACTER);
      }
      if (["discordtag", "everyone", "here"].includes(options.username)) {
        throw new Error(Errors.USERNAME_INVALID_USERNAME);
      }
    }

    const avatar = options?.botAvatarURL ? await urlToBase64(options?.botAvatarURL) : undefined;

    return (await this.rest.patch(endpoints.USER_BOT, {
      username: options.username?.trim(),
      avatar,
    })) as User;
  }

  editBotStatus(data: Omit<StatusUpdate, "afk" | "since">) {
    this.gateway.forEach((shard) => {
      this.emit("DEBUG", "loop", `Running forEach loop in editBotStatus function.`);

      shard.sendShardMessage({
        op: DiscordGatewayOpcodes.StatusUpdate,
        d: {
          since: null,
          afk: false,
          ...snakelize<Omit<StatusUpdate, "afk" | "since">>(data),
        },
      });
    });
  }

  /** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
  async getUser(userId: bigint) {
    return (await this.rest.get(endpoints.USER(userId))) as User;
  }

  /** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
  async getDiscoveryCategories() {
    const result = (await this.rest.get(endpoints.DISCOVERY_CATEGORIES)) as DiscoveryCategory[];

    return new Collection<number, DiscoveryCategory>(result.map((category) => [category.id, category]));
  }

  async validDiscoveryTerm(term: string) {
    const result = (await this.rest.get(endpoints.DISCOVERY_VALID_TERM, {
      term,
    })) as ValidateDiscoverySearchTerm;

    return result.valid;
  }

  /** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
  async createGuild(options: CreateGuild) {
    const result = (await this.rest.post(
      endpoints.GUILDS,
      snakelize(options)
    )) as GuildPayload;

    const guild = new Guild(this, result, 0);
    this.guilds.set(guild.id, guild);
    // MANUALLY CACHE THE BOT
    await guild.fetchMember(this.id);

    return guild;
  }

   /** Returns an array of voice regions that can be used when creating servers. */
   async getAvailableVoiceRegions() {
    return (await this.rest.get(endpoints.VOICE_REGIONS)) as VoiceRegion;
  }

  /**
   * ⚠️ **If you need this, you are probably doing something wrong. Always use client.guilds.get()
   *
   * Advanced Devs:
   * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
   * So it does not cache the guild, you must do it manually.
   * */
   async fetchGuild(
    guildId: bigint,
    options: { counts?: boolean; } = {
      counts: true,
    }
  ) {
    const result = (await this.rest.get(endpoints.GUILDS_BASE(guildId), {
      with_counts: options.counts,
    })) as GuildPayload;

    const guild = new Guild(
      this,
      result,
      Number((BigInt(guildId) >> 22n) % BigInt(this.gateway.botGatewayData.shards))
    );

    this.guilds.set(guild.id, guild);

    return guild;
  }
}

export default Client;
