import { DiscordOverwrite } from "../../../../../../types/channels/overwrite.ts";
import { DiscordBitwisePermissionFlags } from "../../../../../../types/permissions/bitwise_permission_flags.ts";
import { PermissionStrings } from "../../../../../../types/permissions/permission_strings.ts";
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
