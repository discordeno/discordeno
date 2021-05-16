import { EventEmitter } from "./deps.ts";

import { helpers } from "../helpers/mod.ts";
import { ClientOptions } from "./types/client_options.ts";
import {
  CreateGuildChannel,
  CreateMessage,
  DiscordOverwrite,
  ListPublicArchivedThreads,
  ModifyChannel,
  ModifyGuildChannelPositions,
  ModifyGuildDiscoveryMetadata,
  ModifyThread,
  Overwrite,
  PermissionStrings,
  StartThread,
  UpdateOthersVoiceState,
  UpdateSelfVoiceState,
} from "../types/mod.ts";

export class Client extends EventEmitter {
  /** The bot's token */
  token: string;
  /** The timestamp when the bot started. */
  startedAt = Date.now();

  constructor(options: ClientOptions) {
    super();

    this.token = options.token;
  }

  // GETTERS

  get uptime() {
    return Date.now() - this.startedAt;
  }

  /** Start connecting shards?? */
  async connect() {
    // TODO: we might wana do this slightly differently
  }

  // CHANNEL HELPER METHODS

  /** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  addToThread(channelId: bigint, userId?: bigint) {
    return helpers.addToThread(channelId, userId);
  }

  /** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
  getActiveThreads(channelId: bigint) {
    return helpers.getActiveThreads(channelId);
  }

  getArchivedThreads(
    channelId: bigint,
    options?:
      | (ListPublicArchivedThreads & {
        type?: "public" | "private" | "privateJoinedThreads" | undefined;
      })
      | undefined,
  ) {
    return helpers.getArchivedThreads(channelId, options);
  }

  /** Returns array of thread members objects that are members of the thread. */
  getThreadMembers(channelId: bigint) {
    return helpers.getThreadMembers(channelId);
  }

  /** Removes another user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  removeFromThread(channelId: bigint, userId?: bigint) {
    return helpers.removeFromThread(channelId, userId);
  }

  /** Creates a new public thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event. */
  startThread(
    channelId: bigint,
    options: StartThread & {
      messageId?: bigint | undefined;
    },
  ) {
    return helpers.startThread(channelId, options);
  }

  /** Gets all the channels ids that are the children of this category. */
  categoryChildren(id: bigint) {
    return helpers.categoryChildren(id);
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
    permissions: PermissionStrings[],
  ) {
    return helpers.channelOverwriteHasPermission(
      guildId,
      id,
      overwrites,
      permissions,
    );
  }

  /** Create a copy of a channel */
  cloneChannel(channelId: bigint, reason?: string) {
    return helpers.cloneChannel(channelId, reason);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  createChannel(
    guildId: bigint,
    options?: CreateGuildChannel,
    reason?: string,
  ) {
    return helpers.createChannel(guildId, options, reason);
  }

  /** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
  createStageInstance(channelId: bigint, topic: string) {
    return helpers.createStageInstance(channelId, topic);
  }

  /** Delete the channel permission overwrites for a user or role in this channel. Requires MANAGE_ROLES permission. */
  deleteChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
  ) {
    return helpers.deleteChannelOverwrite(guildId, channelId, overwriteId);
  }

  /** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  deleteChannel(channelId: bigint, reason?: string) {
    return helpers.deleteChannel(channelId, reason);
  }

  /** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
  deleteStageInstance(channelId: bigint) {
    return helpers.deleteStageInstance(channelId);
  }

  /** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
  editChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
    options: Omit<Overwrite, "id">,
  ) {
    return helpers.editChannelOverwrite(
      guildId,
      channelId,
      overwriteId,
      options,
    );
  }

  /** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
  editChannel(
    channelId: bigint,
    options: ModifyChannel | ModifyThread,
    reason?: string,
  ) {
    return helpers.editChannel(channelId, options, reason);
  }

  /** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
  followChannel(sourceChannelId: bigint, targetChannelId: bigint) {
    return helpers.followChannel(sourceChannelId, targetChannelId);
  }

  /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
  getChannelWebhooks(channelId: bigint) {
    return helpers.getChannelWebhooks(channelId);
  }

  /** Fetches a single channel object from the api. */
  getChannel(channelId: bigint, addToCache = true) {
    return helpers.getChannel(channelId, addToCache);
  }

  /** Returns a list of guild channel objects. */
  getChannels(guildId: bigint, addToCache = true) {
    return helpers.getChannels(guildId, addToCache);
  }

  /** Get pinned messages in this channel. */
  getPins(channelId: bigint) {
    return helpers.getPins(channelId);
  }

  /** Gets the stage instance associated with the Stage channel, if it exists. */
  getStageInstance(channelId: bigint) {
    return helpers.getStageInstance(channelId);
  }

  /** Checks whether a channel is synchronized with its parent/category channel or not. */
  isChannelSynced(channelId: bigint) {
    return helpers.isChannelSynced(channelId);
  }

  /**
   * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
 */
  startTyping(channelId: bigint) {
    return helpers.startTyping(channelId);
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  swapChannels(
    guildId: bigint,
    channelPositions: ModifyGuildChannelPositions[],
  ) {
    return helpers.swapChannels(guildId, channelPositions);
  }

  /** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
  updateStageInstance(channelId: bigint, topic: string) {
    return helpers.updateStageInstance(channelId, topic);
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
  updateVoiceState(
    guildId: bigint,
    options: UpdateSelfVoiceState | { userId: bigint } & UpdateOthersVoiceState,
  ) {
    return helpers.updateVoiceState(guildId, options);
  }

  // DISCOVERY METHODS

  /** Add a discovery subcategory to the guild. Requires the MANAGE_GUILD permission. */
  addDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.addDiscoverySubcategory(guildId, categoryId);
  }

  /** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
  editDiscovery(guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
    return helpers.editDiscovery(guildId, data);
  }

  /** Returns discovery category objects that can be used when editing guilds */
  getDiscoveryCategories() {
    return helpers.getDiscoveryCategories();
  }

  /** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
  removeDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.removeDiscoverySubcategory(guildId, categoryId);
  }

  validDiscoveryTerm(term: string) {
    return helpers.validDiscoveryTerm(term);
  }

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  sendMessage(channelId: bigint, content: string | CreateMessage) {
    return helpers.sendMessage(channelId, content);
  }
}

export default Client;
