import { API_VERSION, DiscordGatewayPayload, EventEmitter, GatewayEventNames, Intents } from "../deps.ts";
import { Collection } from "./Collection.ts";
import Guild from "./Structures/Guild.ts";
import { PrivateChannel } from "./Structures/PrivateChannel.ts";
import { UnavailableGuild } from "./Structures/UnavailableGuild.ts";
import { User } from "./Structures/User.ts";
import { VoiceConnectionManager } from "./VoiceConnectionManager.ts";

export type BigString = string | bigint;

export class Client extends EventEmitter {
  /** The token for this client */
  token: string;
  /** Stores channelId-guildId */
  channelGuildMap: Record<BigString, BigString> = {};
  /** Stores threadId-guildId */
  threadGuildMap: Record<BigString, BigString> = {};
  /** Stores guildId-shardId */
  guildShardMap: Record<BigString, number> = {};
  /** Stores userId-channelId */
  privateChannelMap: Record<BigString, BigString> = {};
  /** The modified version of options provided to configure the client. */
  options: ParsedClientOptions;

  /** All the cached guilds */
  guilds = new Collection<BigString, Guild>();
  /** All the cached unavailable guilds */
  unavailableGuilds = new Collection<BigString, UnavailableGuild>();
  /** All the cached private channels. */
  privateChannels = new Collection<BigString, PrivateChannel>();
  /** All the cached users */
  users = new Collection<BigString, User>();
  /** Manager for the voice connections this client is connected to. */
  voiceConnections = new VoiceConnectionManager();

  startTime = 0;

  constructor(token: string, options: ClientOptions) {
    super();
    this.token = token;

    this.options = {
      apiVersion: options.apiVersion ?? API_VERSION,
    };
  }

  /** The amount of milliseconds to the bot has been online for. */
  get uptime() {
    return this.startTime ? Date.now() - this.startTime : 0;
  }

  /** The token with the Bot prefix. */
  get botToken() {
    return `Bot ${this.token}`;
  }

  /**
   * Whether or not the client token starts with a bot prefix.
   * @deprecated Discordeno only supports bots, so this will always be true. Please note this is only supported to meet Eris api.
   */
  get bot(): boolean {
    return true;
  }

  /** Converts a snowflake(discord id) into a timestamp. */
  snowflakeToTimestamp(snowflake: BigString) {
    return Number(BigInt(snowflake) / 4194304n + 1420070400000n);
  }

  /** The handler you can override that will process all incoming gateway payloads. */
  async handleDiscordPayload(data: DiscordGatewayPayload, shardId: number) {

  }
}

export interface AllowedMentions {
  everyone?: boolean;
  repliedUser?: boolean;
  roles?: boolean | string[];
  users?: boolean | string[];
}

export interface ClientOptions {
  allowedMentions?: AllowedMentions;
  defaultImageFormat?: string;
  defaultImageSize?: number;
  messageLimit?: number;
  apiVersion: ApiVersions;
}

export interface ParsedClientOptions {
  /** The discord api version to use. */
  apiVersion: ApiVersions;
}

export type ApiVersions = 10;
