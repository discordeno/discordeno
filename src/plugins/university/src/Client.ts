import { BotConfig } from "../../../bot.ts";
import { verify } from "../../../interactions/deps.ts";
import { PresenceUpdate } from "../../../types/activity/presence_update.ts";
import { DiscordGatewayOpcodes } from "../../../types/codes/gateway_opcodes.ts";
import { DiscordenoEditWebhookMessage } from "../../../types/discordeno/edit_webhook_message.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { DiscordenoInteractionResponse } from "../../../types/discordeno/interaction_response.ts";
import { DiscoveryCategory } from "../../../types/discovery/discovery_category.ts";
import { ValidateDiscoverySearchTerm } from "../../../types/discovery/validate_discovery_search_term.ts";
import { Intents } from "../../../types/gateway/gateway_intents.ts";
import { StatusUpdate } from "../../../types/gateway/status_update.ts";
import { CreateGuild } from "../../../types/guilds/create_guild.ts";
import { Guild as GuildPayload } from "../../../types/guilds/guild.ts";
import { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import { CreateGlobalApplicationCommand } from "../../../types/interactions/commands/create_global_application_command.ts";
import { EditGlobalApplicationCommand } from "../../../types/interactions/commands/edit_global_application_command.ts";
import { ComponentInteraction, Interaction, SlashCommandInteraction } from "../../../types/interactions/interaction.ts";
import { DiscordInteractionTypes } from "../../../types/interactions/interaction_types.ts";
import { ButtonData } from "../../../types/messages/components/button_data.ts";
import { MessageComponentTypes } from "../../../types/messages/components/message_component_types.ts";
import { SelectMenuData } from "../../../types/messages/components/select_data.ts";
import { Message as MessagePayload } from "../../../types/messages/message.ts";
import { CreateGuildFromTemplate } from "../../../types/templates/create_guild_from_template.ts";
import { User } from "../../../types/users/user.ts";
import { VoiceRegion } from "../../../types/voice/voice_region.ts";
import { EditWebhookMessage } from "../../../types/webhooks/edit_webhook_message.ts";
import { ExecuteWebhook } from "../../../types/webhooks/execute_webhook.ts";
import { ModifyWebhook } from "../../../types/webhooks/modify_webhook.ts";
import { Webhook } from "../../../types/webhooks/webhook.ts";
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
  /** The tokens for the interactions that have been responded to. This helps determine whether or not to send a followup. */
  executedSlashCommands = new Set<string>();

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
    return snowflakeToBigint(new TextDecoder().decode(decode(this.token.split(".")[0].substring(4) || "")));
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
    const result = (await this.rest.post(endpoints.GUILDS, snakelize(options))) as GuildPayload;

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
    options: { counts?: boolean } = {
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

  /** Create a global slash command*/
  async createSlashCommand(options: CreateGlobalApplicationCommand) {
    return (await this.rest.post(endpoints.COMMANDS(this.applicationId), snakelize(options))) as ApplicationCommand;
  }

  /** Deletes a global slash command. */
  async deleteSlashCommand(id: bigint) {
    return await this.rest.delete(endpoints.COMMANDS_ID(this.applicationId, id));
  }

  /** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
  async deleteSlashResponse(token: string, messageId?: bigint) {
    return await this.rest.delete(
      messageId
        ? endpoints.INTERACTION_ID_TOKEN_MESSAGE_ID(this.applicationId, token, messageId)
        : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(this.applicationId, token)
    );
  }

  /** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
  async editSlashResponse(token: string, options: DiscordenoEditWebhookMessage) {
    const result = await this.rest.patch(
      options.messageId
        ? endpoints.WEBHOOK_MESSAGE(this.applicationId, token, options.messageId)
        : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(this.applicationId, token),
      snakelize(options)
    );

    // If the original message was edited, this will not return a message
    if (!options.messageId) return result as undefined;

    const message = new Message(this, result);
    message.channel?.messages.set(message.id, message);

    return message;
  }

  /** Fetchs the global command for the given Id.  */
  async getSlashCommand(commandId: bigint) {
    const result = (await this.rest.get(endpoints.COMMANDS_ID(this.applicationId, commandId))) as ApplicationCommand;

    return {
      ...result,
      id: snowflakeToBigint(result.id),
      applicationId: snowflakeToBigint(result.applicationId),
    };
  }

  /** Fetch all of the global commands for your application. */
  async getSlashCommands() {
    const result = (await this.rest.get(endpoints.COMMANDS(this.applicationId))) as ApplicationCommand[];

    return new Collection(
      result.map((command) => [
        command.name,
        {
          ...command,
          id: snowflakeToBigint(command.id),
          applicationId: snowflakeToBigint(command.applicationId),
        },
      ])
    );
  }

  /**
   * Edit an existing slash command. If this command did not exist, it will create it.
   */
  async upsertSlashCommand(commandId: bigint, options: EditGlobalApplicationCommand) {
    return (await this.rest.patch(endpoints.COMMANDS_ID(this.applicationId, commandId), options)) as ApplicationCommand;
  }

  /**
   * Bulk edit existing slash commands. If a command does not exist, it will create it.
   *
   * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
   */
  async upsertSlashCommands(options: EditGlobalApplicationCommand[]) {
    return (await this.rest.put(endpoints.COMMANDS(this.applicationId), options)) as ApplicationCommand[];
  }

  /** Returns the initial Interactio response. Functions the same as Get Webhook Message */
  async fetchOriginalInteractionResponse(token: string) {
    const result = (await this.rest.get(
      endpoints.INTERACTION_ORIGINAL_ID_TOKEN(this.applicationId, token)
    )) as MessagePayload;

    return new Message(this, result);
  }

  /**
   * Send a response to a users slash command. The command data will have the id and token necessary to respond.
   * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
   *
   * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
   */
  async sendInteractionResponse(id: bigint, token: string, options: DiscordenoInteractionResponse) {
    // If its already been executed, we need to send a followup response
    if (this.executedSlashCommands.has(token)) {
      return await this.rest.post(endpoints.WEBHOOK(this.applicationId, token), snakelize(options));
    }

    // Expire in 15 minutes
    this.executedSlashCommands.add(token);
    setTimeout(() => {
      this.emit("DEBUG", "loop", `Running setTimeout in send_interaction_response file.`);
      this.executedSlashCommands.delete(token);
    }, 900000);

    // If the user wants this as a private message mark it ephemeral
    if (options.private) {
      options.data = { ...options.data, flags: 64 };
    }

    // If no mentions are provided, force disable mentions
    if (!options.data?.allowedMentions) {
      options.data = { ...options.data, allowedMentions: { parse: [] } };
    }

    return await this.rest.post(endpoints.INTERACTION_ID_TOKEN(id, token), snakelize(options));
  }

  verifySignature({ publicKey, signature, timestamp, body }: VerifySignatureOptions): {
    isValid: boolean;
    body: string;
  } {
    const isValid = verify(
      this.hexToUint8Array(publicKey),
      this.hexToUint8Array(signature),
      new TextEncoder().encode(timestamp + body)
    );

    return { isValid, body };
  }

  /** Converts a hexadecimal string to Uint8Array. */
  hexToUint8Array(hex: string) {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
  }

  /**
   * Create a new guild based on a template
   * NOTE: This endpoint can be used only by bots in less than 10 guilds.
   */
  async createGuildFromTemplate(templateCode: string, data: CreateGuildFromTemplate) {
    if (data.icon) {
      data.icon = await urlToBase64(data.icon);
    }

    const createdGuild = (await this.rest.post(endpoints.GUILD_TEMPLATE(templateCode), data)) as GuildPayload;

    const guild = new Guild(this, createdGuild, 0);
    this.guilds.set(guild.id, guild);

    return guild;
  }

  /** Returns the guild template if it exists */
  async getTemplate(templateCode: string) {
    return await this.rest.get(endpoints.GUILD_TEMPLATE(templateCode));
  }

  /** A type guard function to tell if it is a message component interaction or not. */
  isComponent(interaction: Interaction): interaction is ComponentInteraction {
    return interaction.type === DiscordInteractionTypes.MessageComponent;
  }

  /** A type guard function to tell if the interaction is a slash command or not. */
  isSlashCommand(interaction: Interaction): interaction is SlashCommandInteraction {
    return interaction.type === DiscordInteractionTypes.ApplicationCommand;
  }

  /** A type guard function to tell if it is a button component */
  isButton(data: ButtonData | SelectMenuData): data is ButtonData {
    return data.componentType === MessageComponentTypes.Button;
  }

  /** A type guard function to tell if it is a button component */
  isSelectMenu(data: ButtonData | SelectMenuData): data is SelectMenuData {
    return data.componentType === MessageComponentTypes.SelectMenu;
  }

  /** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
  async deleteWebhook(webhookId: bigint) {
    return await this.rest.delete(endpoints.WEBHOOK_ID(webhookId));
  }

  async deleteWebhookMessage(webhookId: bigint, webhookToken: string, messageId: bigint) {
    return await this.rest.delete(endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId));
  }

  /** Delete a webhook permanently. Returns a undefined on success */
  async deleteWebhookWithToken(webhookId: bigint, webhookToken: string) {
    return await this.rest.delete(endpoints.WEBHOOK(webhookId, webhookToken));
  }

  /** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
  async editWebhook(webhookId: bigint, options: ModifyWebhook) {
    return (await this.rest.patch(endpoints.WEBHOOK_ID(webhookId), {
      ...options,
      channel_id: options.channelId,
    })) as Webhook;
  }

  async editWebhookMessage(
    webhookId: bigint,
    webhookToken: string,
    options: EditWebhookMessage & { messageId?: bigint }
  ) {
    const result = (await this.rest.patch(
      options.messageId
        ? endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, options.messageId)
        : endpoints.WEBHOOK_MESSAGE_ORIGINAL(webhookId, webhookToken),
      snakelize(options)
    )) as MessagePayload;

    const message = new Message(this, result);
    this.guilds.get(message.guildId!)?.channels.get(message.channelId)?.messages.set(message.id, message);

    return message;
  }

  /** Edit a webhook. Returns the updated webhook object on success. */
  async editWebhookWithToken(webhookId: bigint, webhookToken: string, options: Omit<ModifyWebhook, "channelId">) {
    return (await this.rest.patch(endpoints.WEBHOOK(webhookId, webhookToken), snakelize(options))) as Webhook;
  }

  /** Returns the new webhook object for the given id. */
  async fetchWebhook(webhookId: bigint) {
    return (await this.rest.get(endpoints.WEBHOOK_ID(webhookId))) as Webhook;
  }

  /** Returns a previousy-sent webhook message from the same token. Returns a message object on success. */
  async fetchWebhookMessage(webhookId: bigint, webhookToken: string, messageId: bigint) {
    const result = (await this.rest.get(
      endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId)
    )) as MessagePayload;

    const message = new Message(this, result);
    this.guilds.get(message.guildId!)?.channels.get(message.channelId)?.messages.set(message.id, message);

    return message;
  }

  /** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
  async fetchWebhookWithToken(webhookId: bigint, token: string) {
    return (await this.rest.get(endpoints.WEBHOOK(webhookId, token))) as Webhook;
  }

  /** Send a webhook with webhook Id and webhook token */
  async sendWebhook(webhookId: bigint, webhookToken: string, options: ExecuteWebhook) {
    const result = (await this.rest.post(
      `${endpoints.WEBHOOK(webhookId, webhookToken)}?wait=${options.wait ?? false}${
        options.threadId ? `&thread_id=${options.threadId}` : ""
      }`,
      snakelize(options)
    )) as MessagePayload;
    if (!options.wait) return;

    const message = new Message(this, result);
    this.guilds.get(message.guildId!)?.channels.get(message.channelId)?.messages.set(message.id, message);

    return message;
  }
}

export default Client;

export interface VerifySignatureOptions {
  publicKey: string;
  signature: string;
  timestamp: string;
  body: string;
}
