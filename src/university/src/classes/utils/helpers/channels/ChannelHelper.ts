import { DiscordOverwrite } from "../../../../../../types/channels/overwrite.ts";
import { endpoints } from "../../../../../../util/constants.ts";
import { snakelize } from "../../../../../../util/utils.ts";
import Client from "../../../Client.ts";
import ThreadHelpers from "./ThreadHelpers.ts";

export class ChannelHelpers {
  /** The client itself. */
  client: Client;
  /** The channel helpers */
  threads: ThreadHelpers;

  constructor(client: Client) {
    this.client = client;
    this.threads = new ThreadHelpers(client);
  }

  /** Gets an array of all the channels ids that are the children of this category. */
  async categoryChildren(id: bigint) {
    return await this.client.channels.filter((channel) => channel.parentId === id);
  }

  /** Checks if a channel overwrite for a user id or a role id has permission in this channel */
  channelOverwriteHasPermission(
    guildId: bigint,
    id: bigint,
    overwrites: (Omit<DiscordOverwrite, "id" | "allow" | "deny"> & {
      id: bigint;
      allow: bigint;
      deny: bigint;
    })[],
    permissions: PermissionStrings[]
  ) {
    const overwrite = overwrites.find((perm) => perm.id === id) || overwrites.find((perm) => perm.id === guildId);

    if (!overwrite) return false;

    return permissions.every((perm) => {
      const allowBits = overwrite.allow;
      const denyBits = overwrite.deny;
      if (BigInt(denyBits) & BigInt(DiscordBitwisePermissionFlags[perm])) {
        return false;
      }
      if (BigInt(allowBits) & BigInt(DiscordBitwisePermissionFlags[perm])) {
        return true;
      }
    });
  }

  /** Create a copy of a channel */
  async cloneChannel(channelId: bigint, reason?: string) {
    const channelToClone = await this.client.cache.get("channels", channelId);
    if (!channelToClone) throw new Error(Errors.CHANNEL_NOT_FOUND);

    const createChannelOptions: CreateGuildChannel = {
      ...channelToClone,
      name: channelToClone.name!,
      topic: channelToClone.topic || undefined,
      permissionOverwrites: channelToClone.permissionOverwrites.map((overwrite) => ({
        id: overwrite.id.toString(),
        type: overwrite.type,
        allow: calculatePermissions(overwrite.allow),
        deny: calculatePermissions(overwrite.deny),
      })),
    };

    //Create the channel (also handles permissions)
    return await this.createChannel(channelToClone.guildId!, createChannelOptions, reason);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  async createChannel(guildId: bigint, options?: CreateGuildChannel, reason?: string) {
    if (options?.permissionOverwrites) {
      await this.client.requireOverwritePermissions(guildId, options.permissionOverwrites);
    }

    // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
    if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

    const result = await this.client.rest.post(
      endpoints.GUILD_CHANNELS(guildId),
      snakelize<DiscordCreateGuildChannel>({
        ...options,
        permissionOverwrites: options?.permissionOverwrites?.map((perm) => ({
          ...perm,
          allow: calculateBits(perm.allow),
          deny: calculateBits(perm.deny),
        })),
        type: options?.type || DiscordChannelTypes.GuildText,
        reason,
      })
    );

    const discordenoChannel = new UniversityChannel(this.client, result);
    await this.client.cache.set("channels", discordenoChannel.id, discordenoChannel);

    return discordenoChannel;
  }

  /** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
  async createStageInstance(channelId: bigint, topic: string, privacyLevel?: PrivacyLevel) {
    const channel = await this.client.cache.get("channels", channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildStageVoice) {
        throw new Error(Errors.CHANNEL_NOT_STAGE_VOICE);
      }

      await this.client.requireBotChannelPermissions(channel, ["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"]);
    }

    if (!validateLength(topic, { max: 120, min: 1 })) {
      throw new Error(Errors.INVALID_TOPIC_LENGTH);
    }

    return await this.client.rest.post(
      endpoints.STAGE_INSTANCES,
      snakelize({
        channelId,
        topic,
        privacyLevel,
      })
    );
  }

  /** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  async deleteChannel(channelId: bigint, reason?: string) {
    return await this.client.rest.delete(endpoints.CHANNEL_BASE(channelId), {
      reason,
    });
  }

  /** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
  async deleteChannelOverwrite(guildId: bigint, channelId: bigint, overwriteId: bigint): Promise<undefined> {
    await this.client.requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

    return await this.client.rest.delete(endpoints.CHANNEL_OVERWRITE(channelId, overwriteId));
  }

  /** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
  async deleteStageInstance(channelId: bigint) {
    const channel = await this.client.cache.get("channels", channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildStageVoice) {
        throw new Error(Errors.CHANNEL_NOT_STAGE_VOICE);
      }

      await this.client.requireBotChannelPermissions(channel, ["MUTE_MEMBERS", "MANAGE_CHANNELS", "MOVE_MEMBERS"]);
    }

    return await this.client.rest.delete(endpoints.STAGE_INSTANCE(channelId));
  }

  //TODO: implement DM group channel edit
  //TODO(threads): check thread perms
  /** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
  async editChannel(channelId: bigint, options: ModifyChannel | ModifyThread, reason?: string) {
    const channel = await this.client.cache.get("channels", channelId);

    if (channel) {
      if (
        [
          DiscordChannelTypes.GuildNewsThread,
          DiscordChannelTypes.GuildPivateThread,
          DiscordChannelTypes.GuildPublicThread,
        ].includes(channel.type)
      ) {
        const permissions = new Set<PermissionStrings>();

        if (hasOwnProperty(options, "archive") && options.archive === false) {
          permissions.add("SEND_MESSAGES");
        }

        // TODO(threads): change this to a better check
        // hacky way of checking if more is being modified
        if (Object.keys(options).length > 1) {
          permissions.add("MANAGE_THREADS");
        }

        await this.client.requireBotChannelPermissions(channel.parentId ?? 0n, [...permissions]);
      }

      if (
        hasOwnProperty<ModifyChannel>(options, "permissionOverwrites") &&
        Array.isArray(options.permissionOverwrites)
      ) {
        await this.client.requireOverwritePermissions(channel.guildId, options.permissionOverwrites);
      }
    }

    if (options.name || (options as ModifyChannel).topic) {
      const request = editChannelNameTopicQueue.get(channelId);
      if (!request) {
        // If this hasnt been done before simply add 1 for it
        editChannelNameTopicQueue.set(channelId, {
          channelId: channelId,
          amount: 1,
          // 10 minutes from now
          timestamp: Date.now() + 600000,
          items: [],
        });
      } else if (request.amount === 1) {
        // Start queuing future requests to this channel
        request.amount = 2;
        request.timestamp = Date.now() + 600000;
      } else {
        return new Promise((resolve, reject) => {
          // 2 have already been used add to queue
          request.items.push({ channelId, options, resolve, reject });
          if (editChannelProcessing) return;
          editChannelProcessing = true;
          this.processEditChannelQueue();
        });
      }
    }

    const result = await this.client.rest.patch(
      endpoints.CHANNEL_BASE(channelId),
      snakelize({
        ...options,
        permissionOverwrites: hasOwnProperty<ModifyChannel>(options, "permissionOverwrites")
          ? options.permissionOverwrites?.map((overwrite) => {
              return {
                ...overwrite,
                allow: calculateBits(overwrite.allow),
                deny: calculateBits(overwrite.deny),
              };
            })
          : undefined,
        reason,
      })
    );

    return new UniversityChannel(this.client, result);
  }

  processEditChannelQueue() {
    if (!editChannelProcessing) return;

    const now = Date.now();
    editChannelNameTopicQueue.forEach(async (request) => {
      eventHandlers.debug?.("loop", `Running forEach loop in edit_channel file.`);
      if (now < request.timestamp) return;
      // 10 minutes have passed so we can reset this channel again
      if (!request.items.length) {
        return editChannelNameTopicQueue.delete(request.channelId);
      }
      request.amount = 0;
      // There are items to process for this request
      const details = request.items.shift();

      if (!details) return;

      await editChannel(details.channelId, details.options)
        .then((result) => details.resolve(result))
        .catch(details.reject);
      const secondDetails = request.items.shift();
      if (!secondDetails) return;

      await editChannel(secondDetails.channelId, secondDetails.options)
        .then((result) => secondDetails.resolve(result))
        .catch(secondDetails.reject);
      return;
    });

    if (editChannelNameTopicQueue.size) {
      setTimeout(() => {
        eventHandlers.debug?.("loop", `Running setTimeout in EDIT_CHANNEL file.`);
        this.processEditChannelQueue();
      }, 60000);
    } else {
      editChannelProcessing = false;
    }
  }

  /** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
  async editChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
    options: Omit<Overwrite, "id">
  ): Promise<undefined> {
    await this.client.requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

    return await this.client.rest.put(endpoints.CHANNEL_OVERWRITE(channelId, overwriteId), {
      allow: calculateBits(options.allow),
      deny: calculateBits(options.deny),
      type: options.type,
    });
  }

  /** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
  async followChannel(sourceChannelId: bigint, targetChannelId: bigint) {
    await this.client.requireBotChannelPermissions(targetChannelId, ["MANAGE_WEBHOOKS"]);

    const data = await this.client.rest.post(endpoints.CHANNEL_FOLLOW(sourceChannelId), {
      webhook_channel_id: targetChannelId,
    });

    return data.webhookId;
  }

  /** Fetches a single channel object from the api.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async getChannel(channelId: bigint, addToCache = true) {
    const result = await this.client.rest.get(endpoints.CHANNEL_BASE(channelId));

    const discordenoChannel = new UniversityChannel(this.client, result, result.guildId);
    if (addToCache) {
      await this.client.cache.set("channels", discordenoChannel.id, discordenoChannel);
    }

    return UniversityChannel;
  }

  /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
  async getChannelWebhooks(channelId: bigint) {
    await this.client.requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

    const result = (await this.client.rest.get(endpoints.CHANNEL_WEBHOOKS(channelId))) as Webhook[];

    return new Collection(result.map((webhook) => [webhook.id, webhook]));
  }

  /** Returns a list of guild channel objects.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async getChannels(guildId: bigint, addToCache = true) {
    const result = (await this.client.rest.get(endpoints.GUILD_CHANNELS(guildId))) as Channel[];

    return new Collection(
      (
        await Promise.all(
          result.map(async (res) => {
            const discordenoChannel = new UniversityChannel(this.client, res, guildId.toString());
            if (addToCache) {
              await this.client.cache.set("channels", discordenoChannel.id, discordenoChannel);
            }

            return discordenoChannel;
          })
        )
      ).map((c) => [c.id, c])
    );
  }

  /** Get pinned messages in this channel. */
  async getPins(channelId: bigint) {
    const result = (await this.client.rest.get(endpoints.CHANNEL_PINS(channelId))) as Message[];

    return Promise.all(result.map((res) => new UniversityMessage(this.client, res)));
  }

  /** Gets the stage instance associated with the Stage channel, if it exists. */
  async getStageInstance(channelId: bigint) {
    const channel = await this.client.cache.get("channels", channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildStageVoice) {
        throw new Error(Errors.CHANNEL_NOT_STAGE_VOICE);
      }
    }

    return await this.client.rest.get(endpoints.STAGE_INSTANCE(channelId));
  }

  /** Checks whether a channel is synchronized with its parent/category channel or not. */
  async isChannelSynced(channelId: bigint) {
    const channel = await this.client.cache.get("channels", channelId);
    if (!channel?.parentId) return false;

    const parentChannel = await this.client.cache.get("channels", channel.parentId);
    if (!parentChannel) return false;

    return channel.permissionOverwrites?.every((overwrite) => {
      const permission = parentChannel.permissionOverwrites?.find((ow) => ow.id === overwrite.id);
      if (!permission) return false;
      return !(overwrite.allow !== permission.allow || overwrite.deny !== permission.deny);
    });
  }

  /**
   * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
   */
  async startTyping(channelId: bigint) {
    const channel = await this.client.cache.get("channels", channelId);
    // If the channel is cached, we can do extra checks/safety
    if (channel) {
      if (
        ![
          DiscordChannelTypes.DM,
          DiscordChannelTypes.GuildNews,
          DiscordChannelTypes.GuildText,
          DiscordChannelTypes.GuildNewsThread,
          DiscordChannelTypes.GuildPivateThread,
          DiscordChannelTypes.GuildPublicThread,
        ].includes(channel.type)
      ) {
        throw new Error(Errors.CHANNEL_NOT_TEXT_BASED);
      }

      const hasSendMessagesPerm = await this.client.botHasChannelPermissions(channelId, ["SEND_MESSAGES"]);
      if (!hasSendMessagesPerm) {
        throw new Error(Errors.MISSING_SEND_MESSAGES);
      }
    }

    return await this.client.rest.post(endpoints.CHANNEL_TYPING(channelId));
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  async swapChannels(guildId: bigint, channelPositions: ModifyGuildChannelPositions[]) {
    if (channelPositions.length < 2) {
      throw "You must provide at least two channels to be swapped.";
    }

    return await this.client.rest.patch(endpoints.GUILD_CHANNELS(guildId), snakelize(channelPositions));
  }

  /** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
  async updateStageInstance(channelId: bigint, data: Partial<Pick<StageInstance, "topic" | "privacyLevel">> = {}) {
    const channel = await this.client.cache.get("channels", channelId);

    if (channel) {
      if (channel.type !== ChannelTypes.GuildStageVoice) {
        throw new Error(Errors.CHANNEL_NOT_STAGE_VOICE);
      }

      await this.client.requireBotChannelPermissions(channel, ["MOVE_MEMBERS", "MUTE_MEMBERS", "MANAGE_CHANNELS"]);
    }

    if (
      data?.topic &&
      !validateLength(data.topic, {
        min: 1,
        max: 120,
      })
    ) {
      throw new Error(Errors.INVALID_TOPIC_LENGTH);
    }

    return await this.client.rest.patch(endpoints.STAGE_INSTANCE(channelId), snakelize(data));
  }

  /**
   * Updates the a user's voice state, defaults to the current user
   * Caveats:
   *  - `channel_id` must currently point to a stage channel.
   *  - User must already have joined `channel_id`.
   *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
   *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
   *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
   *  - You are able to set `request_to_speak_timestamp` to any present or future time.
   *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
   */
  async updateBotVoiceState(
    guildId: bigint,
    options: UpdateSelfVoiceState | ({ userId: bigint } & UpdateOthersVoiceState)
  ) {
    return await this.client.rest.patch(
      endpoints.UPDATE_VOICE_STATE(guildId, hasOwnProperty(options, "userId") ? options.userId : undefined),
      snakelize(options)
    );
  }
}

export default ChannelHelpers;

interface EditChannelRequest {
  amount: number;
  timestamp: number;
  channelId: bigint;
  items: {
    channelId: bigint;
    options: ModifyChannel;
    resolve: (channel: unknown) => void;
    // deno-lint-ignore no-explicit-any
    reject: (error: any) => void;
  }[];
}

const editChannelNameTopicQueue = new Map<bigint, EditChannelRequest>();
let editChannelProcessing = false;
