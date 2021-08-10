import { ChannelTypes } from "../../../../../../types/channels/channel_types.ts";
import { ListPublicArchivedThreads } from "../../../../../../types/channels/threads/list_public_archived_threads.ts";
import { StartThread } from "../../../../../../types/channels/threads/start_thread.ts";
import { Errors } from "../../../../../../types/discordeno/errors.ts";
import { endpoints } from "../../../../../../util/constants.ts";
import { snakelize } from "../../../../../../util/utils.ts";
import Client from "../../../Client.ts";

export class ThreadHelpers {
  /** The client itself. */
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  //TODO(threads): this does not work rn
  /** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event.
   * @param userId the user to add to the thread defaults to bot
   */
  async addToThread(channelId: bigint, userId?: bigint) {
    // TODO(threads): perm check
    const channel = this.client.channels.get(channelId);
    if (channel) {
      if (
        ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPrivateThread, ChannelTypes.GuildPublicThread].includes(
          channel.type
        )
      ) {
        throw new Error(Errors.NOT_A_THREAD_CHANNEL);
      }
    }

    return await this.client.rest.put(
      userId ? endpoints.THREAD_USER(channelId, userId) : endpoints.THREAD_ME(channelId)
    );
  }

  /** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
  async getActiveThreads(channelId: bigint) {
    // TODO(threads): perm check
    // TODO(threads): test if it works
    return await this.client.rest.get(endpoints.THREAD_ACTIVE(channelId));
  }

  async getArchivedThreads(
    channelId: bigint,
    options?: ListPublicArchivedThreads & {
      type?: "public" | "private" | "privateJoinedThreads";
    }
  ) {
    // TODO(threads): perm check
    // TODO(threads): check if this works

    return await this.client.rest.get(
      options?.type === "privateJoinedThreads"
        ? endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
        : options?.type === "private"
        ? endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
        : endpoints.THREAD_ARCHIVED_PUBLIC(channelId),
      snakelize(options ?? {})
    );
  }

  // TODO(threads): it seems like the documented return type is wrong
  /** Returns array of thread members objects that are members of the thread. */
  async getThreadMembers(channelId: bigint) {
    // TODO(threads): perm check
    // TODO(threads): intents check
    const channel = await this.client.cache.get("channels", channelId);
    if (channel) {
      if (
        ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPrivateThread, ChannelTypes.GuildPublicThread].includes(
          channel.type
        )
      ) {
        throw new Error(Errors.NOT_A_THREAD_CHANNEL);
      }
    }

    return await this.client.rest.get(endpoints.THREAD_MEMBERS(channelId));
  }

  /** Removes another user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event. */
  async removeFromThread(channelId: bigint, userId?: bigint) {
    // TODO(threads): perm check
    const channel = await this.client.cache.get("channels", channelId);
    if (channel) {
      if (
        ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPrivateThread, ChannelTypes.GuildPublicThread].includes(
          channel.type
        )
      ) {
        throw new Error(Errors.NOT_A_THREAD_CHANNEL);
      }
    }

    return await this.client.rest.delete(
      userId ? endpoints.THREAD_USER(channelId, userId) : endpoints.THREAD_ME(channelId)
    );
  }

  /**
   * Creates a new public thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event.
   * @param messageId when provided the thread will be public
   */
  async startThread(channelId: bigint, options: StartThread & { messageId?: bigint }) {
    const channel = await this.client.cache.get("channels", channelId);
    if (channel) {
      // TODO(threads): perm check
      if (![ChannelTypes.GuildText, ChannelTypes.GuildNews].includes(channel.type)) {
        throw new Error(Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);
      }

      if (!options.messageId && channel.type === ChannelTypes.GuildNews) {
        throw new Error(Errors.GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS);
      }
    }

    return await this.client.rest.post(
      options?.messageId
        ? endpoints.THREAD_START_PUBLIC(channelId, options.messageId)
        : endpoints.THREAD_START_PRIVATE(channelId),
      snakelize(options)
    );
  }
}

export default ThreadHelpers;
