import { CreateGuildChannel } from "../helpers/channels/createChannel.ts";
import { ModifyChannel } from "../helpers/channels/editChannel.ts";
import { EditChannelPermissionOverridesOptions } from "../helpers/channels/editChannelPermissionOverrides.ts";
import { ModifyGuildChannelPositions } from "../helpers/channels/editChannelPositions.ts";
import { CreateForumPostWithMessage } from "../helpers/channels/forums/createForumThread.ts";
import { CreateStageInstance } from "../helpers/channels/stages/createStageInstance.ts";
import { EditStageInstanceOptions } from "../helpers/channels/stages/editStageInstance.ts";
import { ListArchivedThreads } from "../helpers/channels/threads/getPublicArchivedThreads.ts";
import { StartThreadWithMessage } from "../helpers/channels/threads/startThreadWithMessage.ts";
import { StartThreadWithoutMessage } from "../helpers/channels/threads/startThreadWithoutMessage.ts";
import { EditMessage } from "../helpers/messages/editMessage.ts";
import { processReactionString } from "../helpers/messages/reactions/getReactions.ts";
import { transformAllowedMentionsToDiscordAllowedMentions } from "../transformers/reverse/allowedMentions.ts";
import { transformAttachmentToDiscordAttachment } from "../transformers/reverse/attachment.ts";
import { transformComponentToDiscordComponent } from "../transformers/reverse/component.ts";
import { transformEmbedToDiscordEmbed } from "../transformers/reverse/embed.ts";
import {
  DiscordChannel,
  DiscordFollowedChannel,
  DiscordInviteMetadata,
  DiscordListActiveThreads,
  DiscordListArchivedThreads,
  DiscordMessage,
  DiscordStageInstance,
  DiscordThreadMember,
} from "../types/discord.ts";
import { BigString, ChannelTypes } from "../types/shared.ts";
import { API_VERSION, baseEndpoints } from "../util/constants.ts";
import { calculateBits } from "../util/permissions.ts";
import { routes } from "../util/routes.ts";
import { removeTokenPrefix } from "../util/token.ts";
import { checkRateLimits } from "./checkRateLimits.ts";
import { cleanupQueues } from "./cleanupQueues.ts";
import { convertRestError } from "./convertRestError.ts";
import { createRequestBody } from "./createRequestBody.ts";
import { processGlobalQueue } from "./processGlobalQueue.ts";
import { processQueue } from "./processQueue.ts";
import { processRateLimitedPaths } from "./processRateLimitedPaths.ts";
import { processRequest } from "./processRequest.ts";
import { processRequestHeaders } from "./processRequestHeaders.ts";
import { RestPayload, RestRateLimitedPath, RestRequest } from "./rest.ts";
import { runMethod } from "./runMethod.ts";
import { RestSendRequestOptions, sendRequest } from "./sendRequest.ts";
import { simplifyUrl } from "./simplifyUrl.ts";

export function createRestManager(options: CreateRestManagerOptions) {
  const version = options.version || API_VERSION;

  if (options.customUrl) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`;
  }

  const manager = {
    // current invalid amount
    invalidRequests: 0,
    // max invalid requests allowed until ban
    maxInvalidRequests: 10000,
    // 10 minutes
    invalidRequestsInterval: 600000,
    // timer to reset to 0
    invalidRequestsTimeoutId: 0,
    // how safe to be from max
    invalidRequestsSafetyAmount: 1,
    // when first request in this period was made
    invalidRequestFrozenAt: 0,
    invalidRequestErrorStatuses: [401, 403, 429],
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount || 10,
    secretKey: options.secretKey || "discordeno_best_lib_ever",
    customUrl: options.customUrl || "",
    pathQueues: new Map<
      string,
      {
        isWaiting: boolean;
        requests: {
          request: RestRequest;
          payload: RestPayload;
        }[];
      }
    >(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as {
      request: RestRequest;
      payload: RestPayload;
      basicURL: string;
      urlToUse: string;
    }[],
    globalQueueProcessing: false,
    rateLimitedPaths: new Map<string, RestRateLimitedPath>(),
    debug: options.debug || function (_text: string) {},
    checkRateLimits: options.checkRateLimits || checkRateLimits,
    cleanupQueues: options.cleanupQueues || cleanupQueues,
    processQueue: options.processQueue || processQueue,
    processRateLimitedPaths: options.processRateLimitedPaths ||
      processRateLimitedPaths,
    processRequestHeaders: options.processRequestHeaders ||
      processRequestHeaders,
    processRequest: options.processRequest || processRequest,
    createRequestBody: options.createRequestBody || createRequestBody,
    runMethod: options.runMethod || runMethod,
    simplifyUrl: options.simplifyUrl || simplifyUrl,
    processGlobalQueue: options.processGlobalQueue || processGlobalQueue,
    convertRestError: options.convertRestError || convertRestError,
    sendRequest: options.sendRequest || sendRequest,

    fetching: options.fetching || function (opts: RestSendRequestOptions) {
      options.debug?.(
        `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`,
      );
    },
    fetched: options.fetched || function (
      opts: RestSendRequestOptions,
      response: Response,
    ) {
      options.debug?.(
        `[REST - fetched] URL: ${opts.url} | Status: ${response.status} ${JSON.stringify(opts)}`,
      );
    },

    /**
     * Adds a reaction to a message.
     *
     * @param channelId - The ID of the channel the message to add a reaction to is in.
     * @param messageId - The ID of the message to add a reaction to.
     * @param reaction - The reaction to add to the message.
     * @returns
     *
     * @remarks
     * Requires the `READ_MESSAGE_HISTORY` permission.
     *
     * If nobody else has reacted to the message:
     * - Requires the `ADD_REACTIONS` permission.
     *
     * Fires a _Message Reaction Add_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#create-reaction}
     */
    async addReaction(
      channelId: BigString,
      messageId: BigString,
      reaction: string,
    ): Promise<void> {
      reaction = processReactionString(reaction);

      return await manager.runMethod<void>(
        manager,
        "PUT",
        routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
      );
    },

    /**
     * Adds a member to a thread.
     *
     * @param channelId - The ID of the thread to add the member to.
     * @param userId - The user ID of the member to add to the thread.
     *
     * @remarks
     * Requires the ability to send messages in the thread.
     * Requires the thread not be archived.
     *
     * Fires a _Thread Members Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#add-thread-member}
     */
    async addThreadMember(channelId: BigString, userId: BigString): Promise<void> {
      return await manager.runMethod<void>(manager, "PUT", routes.THREAD_USER(channelId, userId));
    },

    /**
     * Creates a channel within a guild.
     *
     * @param guildId - The ID of the guild to create the channel within.
     * @param options - The parameters for the creation of the channel.
     * @returns An instance of the created {@link DiscordChannel}.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
     *
     * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
     *
     * Fires a _Channel Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
     */
    async createChannel(guildId: BigString, options: CreateGuildChannel): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "POST",
        routes.GUILD_CHANNELS(guildId),
        options
          ? {
            name: options.name,
            topic: options.topic,
            bitrate: options.bitrate,
            user_limit: options.userLimit,
            rate_limit_per_user: options.rateLimitPerUser,
            position: options.position,
            parent_id: options.parentId?.toString(),
            nsfw: options.nsfw,
            permission_overwrites: options?.permissionOverwrites?.map((overwrite) => ({
              id: overwrite.id.toString(),
              type: overwrite.type,
              allow: overwrite.allow ? calculateBits(overwrite.allow) : null,
              deny: overwrite.deny ? calculateBits(overwrite.deny) : null,
            })),
            type: options?.type || ChannelTypes.GuildText,
            reason: options.reason,
            default_auto_archive_duration: options?.defaultAutoArchiveDuration,
          }
          : {},
      );
    },

    /**
     * Creates a new thread in a forum channel, and sends a message within the created thread.
     *
     * @param channelId - The ID of the forum channel to create the thread within.
     * @param options - The parameters for the creation of the thread.
     * @returns An instance of {@link DiscordChannel} with a nested {@link DiscordMessage} object.
     *
     * @remarks
     * Requires the `CREATE_MESSAGES` permission.
     *
     * Fires a _Thread Create_ gateway event.
     * Fires a _Message Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
     *
     * @experimental
     */
    async createForumThread(
      channelId: BigString,
      options: CreateForumPostWithMessage,
    ): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "POST",
        routes.FORUM_START(channelId),
        {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          reason: options.reason,

          content: options.content,
          embeds: options.embeds?.map((embed) => transformEmbedToDiscordEmbed(embed)),
          allowed_mentions: options.allowedMentions
            ? transformAllowedMentionsToDiscordAllowedMentions(options.allowedMentions)
            : undefined,
          file: options.file,
          components: options.components?.map((component) => transformComponentToDiscordComponent(component)),
        },
      );
    },

    /**
     * Creates a stage instance associated with a stage channel.
     *
     * @param options - The parameters for the creation of the stage instance.
     * @returns An instance of the created {@link DiscordStageInstance}.
     *
     * @remarks
     * Requires the user to be a moderator of the stage channel.
     *
     * Fires a _Stage Instance Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
     */
    async createStageInstance(options: CreateStageInstance): Promise<DiscordStageInstance> {
      return await manager.runMethod<DiscordStageInstance>(
        manager,
        "POST",
        routes.STAGE_INSTANCES(),
        {
          channel_id: options.channelId.toString(),
          topic: options.topic,
          send_start_notification: options.sendStartNotification,
          reason: options.reason,
        },
      );
    },

    /**
     * Deletes a channel from within a guild.
     *
     * @param channelId - The ID of the channel to delete.
     * @returns
     *
     * @remarks
     * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
     *
     * If the channel is a thread:
     * - Requires the `MANAGE_THREADS` permission.
     *
     * - Fires a _Thread Delete_ gateway event.
     *
     * Otherwise:
     * - Requires the `MANAGE_CHANNELS` permission.
     *
     * - ⚠️ Deleting a category channel does not delete its child channels.
     *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
     *
     * - Fires a _Channel Delete_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
     */
    async deleteChannel(channelId: BigString, reason?: string): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "DELETE",
        routes.CHANNEL(channelId),
        {
          reason,
        },
      );
    },

    /**
     * Deletes a permission override for a user or role in a channel.
     *
     * @param channelId - The ID of the channel to delete the permission override of.
     * @param overwriteId - The ID of the permission override to delete.
     *
     * @remarks
     * Requires the `MANAGE_ROLES` permission.
     *
     * Fires a _Channel Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
     */
    async deleteChannelPermissionOverride(
      channelId: BigString,
      overwriteId: BigString,
      reason?: string,
    ): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "DELETE",
        routes.CHANNEL_OVERWRITE(channelId, overwriteId),
        reason ? { reason } : undefined,
      );
    },

    /**
     * Deletes a message from a channel.
     *
     * @param channelId - The ID of the channel to delete the message from.
     * @param messageId - The ID of the message to delete from the channel.
     *
     * @remarks
     * If not deleting own message:
     * - Requires the `MANAGE_MESSAGES` permission.
     *
     * Fires a _Message Delete_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#delete-message}
     */
    async deleteMessage(
      channelId: BigString,
      messageId: BigString,
      reason?: string,
    ): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "DELETE",
        routes.CHANNEL_MESSAGE(channelId, messageId),
        { reason },
      );
    },

    /**
     * Deletes the stage instance associated with a stage channel, if one exists.
     *
     * @param channelId - The ID of the stage channel the stage instance is associated with.
     *
     * @remarks
     * Requires the user to be a moderator of the stage channel.
     *
     * Fires a _Stage Instance Delete_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
     */
    async deleteStageInstance(channelId: BigString, reason?: string): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "DELETE",
        routes.STAGE_INSTANCE(channelId),
        reason ? { reason } : undefined,
      );
    },

    /**
     * Edits a channel's settings.
     *
     * @param channelId - The ID of the channel to edit.
     * @param options - The parameters for the edit of the channel.
     * @returns An instance of the edited {@link DiscordChannel}.
     *
     * @remarks
     * If editing a channel of type {@link ChannelTypes.GroupDm}:
     * - Fires a _Channel Update_ gateway event.
     *
     * If editing a thread channel:
     * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
     *
     * - Fires a _Thread Update_ gateway event.
     *
     * If editing a guild channel:
     * - Requires the `MANAGE_CHANNELS` permission.
     *
     * - If modifying permission overrides:
     *   - Requires the `MANAGE_ROLES` permission.
     *
     *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
     *
     * - If modifying a channel of type {@link ChannelTypes.GuildCategory}:
     *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
     * - Otherwise:
     *     - Fires a _Channel Update_ gateway event.
     */
    async editChannel(channelId: BigString, options: ModifyChannel): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "PATCH",
        routes.CHANNEL(channelId),
        {
          name: options.name,
          topic: options.topic,
          bitrate: options.bitrate,
          user_limit: options.userLimit,
          rate_limit_per_user: options.rateLimitPerUser,
          position: options.position,
          parent_id: options.parentId === null ? null : options.parentId?.toString(),
          nsfw: options.nsfw,
          type: options.type,
          archived: options.archived,
          auto_archive_duration: options.autoArchiveDuration,
          locked: options.locked,
          invitable: options.invitable,
          permission_overwrites: options.permissionOverwrites
            ? options.permissionOverwrites?.map((overwrite) => ({
              id: overwrite.id.toString(),
              type: overwrite.type,
              allow: overwrite.allow ? calculateBits(overwrite.allow) : null,
              deny: overwrite.deny ? calculateBits(overwrite.deny) : null,
            }))
            : undefined,
          available_tags: options.availableTags
            ? options.availableTags.map((availableTag) => ({
              id: availableTag.id,
              name: availableTag.name,
              moderated: availableTag.moderated,
              emoji_id: availableTag.emojiId,
              emoji_name: availableTag.emojiName,
            }))
            : undefined,
          default_reaction_emoji: options.defaultReactionEmoji
            ? {
              emoji_id: options.defaultReactionEmoji.emojiId,
              emoji_name: options.defaultReactionEmoji.emojiName,
            }
            : undefined,
          reason: options.reason,
        },
      );
    },

    /**
     * Edits the permission overrides for a user or role in a channel.
     *
     * @param channelId - The ID of the channel to edit the permission overrides of.
     * @param options - The permission override.
     *
     * @remarks
     * Requires the `MANAGE_ROLES` permission.
     *
     * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
     *
     * Fires a _Channel Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
     */
    async editChannelPermissionOverrides(
      channelId: BigString,
      options: EditChannelPermissionOverridesOptions,
    ): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "PUT",
        routes.CHANNEL_OVERWRITE(channelId, options.id),
        {
          allow: options.allow ? calculateBits(options.allow) : "0",
          deny: options.deny ? calculateBits(options.deny) : "0",
          type: options.type,
          reason: options.reason,
        },
      );
    },

    /**
     * Edits the positions of a set of channels in a guild.
     *
     * @param guildId - The ID of the guild in which to edit the positions of the channels.
     * @param channelPositions - A set of objects defining the updated positions of the channels.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * Fires a _Channel Update_ gateway event for every channel impacted in this change.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
     */
    async editChannelPositions(
      guildId: BigString,
      channelPositions: ModifyGuildChannelPositions[],
    ): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "PATCH",
        routes.GUILD_CHANNELS(guildId),
        channelPositions.map((channelPosition) => ({
          id: channelPosition.id,
          position: channelPosition.position,
          lock_positions: channelPosition.lockPositions,
          parent_id: channelPosition.parentId,
        })),
      );
    },

    /**
     * Edits a message.
     *
     * @param channelId - The ID of the channel to edit the message in.
     * @param messageId - The IDs of the message to edit.
     * @param options - The parameters for the edit of the message.
     * @returns An instance of the edited {@link DiscordMessage}.
     *
     * @remarks
     * If editing another user's message:
     * - Requires the `MANAGE_MESSAGES` permission.
     * - Only the {@link EditMessage.flags | flags} property of the {@link options} object parameter can be edited.
     *
     * Fires a _Message Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
     */
    async editMessage(
      channelId: BigString,
      messageId: BigString,
      options: EditMessage,
    ): Promise<DiscordMessage> {
      return await manager.runMethod<DiscordMessage>(
        manager,
        "PATCH",
        routes.CHANNEL_MESSAGE(channelId, messageId),
        {
          content: options.content,
          embeds: options.embeds?.map((embed) => transformEmbedToDiscordEmbed(embed)),
          allowed_mentions: options.allowedMentions
            ? transformAllowedMentionsToDiscordAllowedMentions(options.allowedMentions)
            : undefined,
          attachments: options.attachments?.map((attachment) => transformAttachmentToDiscordAttachment(attachment)),
          file: options.file,
          components: options.components?.map((component) => transformComponentToDiscordComponent(component)),
        },
      );
    },

    /**
     * Edits a stage instance.
     *
     * @param channelId - The ID of the stage channel the stage instance is associated with.
     * @returns An instance of the updated {@link DiscordStageInstance}.
     *
     * @remarks
     * Requires the user to be a moderator of the stage channel.
     *
     * Fires a _Stage Instance Update_ event.
     *
     * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
     */
    async editStageInstance(
      channelId: BigString,
      data: EditStageInstanceOptions,
    ): Promise<DiscordStageInstance> {
      return await manager.runMethod<DiscordStageInstance>(
        manager,
        "PATCH",
        routes.STAGE_INSTANCE(channelId),
        {
          topic: data.topic,
        },
      );
    },

    /**
     * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
     *
     * @param sourceChannelId - The ID of the announcement channel to follow.
     * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
     * @returns An instance of {@link DiscordFollowedChannel}.
     *
     * @remarks
     * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
     *
     * Fires a _Webhooks Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
     */
    async followAnnouncementChannel(
      sourceChannelId: BigString,
      targetChannelId: BigString,
    ): Promise<DiscordFollowedChannel> {
      return await manager.runMethod<DiscordFollowedChannel>(
        manager,
        "POST",
        routes.CHANNEL_FOLLOW(sourceChannelId),
        {
          webhook_channel_id: targetChannelId,
        },
      );
    },

    /**
     * Gets the list of all active threads for a guild.
     *
     * @param guildId - The ID of the guild to get the threads of.
     * @returns An instance of {@link DiscordListActiveThreads}.
     *
     * @remarks
     * Returns both public and private threads.
     *
     * Threads are ordered by the `id` property in descending order.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
     */
    async getActiveThreads(guildId: BigString): Promise<DiscordListActiveThreads> {
      return await manager.runMethod<DiscordListActiveThreads>(
        manager,
        "GET",
        routes.THREAD_ACTIVE(guildId),
      );
    },

    /**
     * Gets a channel by its ID.
     *
     * @param channelId - The ID of the channel to get.
     * @returns An instance of {@link DiscordChannel}.
     *
     * @remarks
     * If the channel is a thread, a {@link ThreadMember} object is included in the result.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
     */
    async getChannel(channelId: BigString): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "GET",
        routes.CHANNEL(channelId),
      );
    },

    /**
     * Gets the list of invites for a channel.
     *
     * @param channelId - The ID of the channel to get the invites of.
     * @returns An array of {@link DiscordInviteMetadata[]} objects.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * Only usable for guild channels.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
     */
    async getChannelInvites(channelId: BigString): Promise<DiscordInviteMetadata[]> {
      return await manager.runMethod<DiscordInviteMetadata[]>(
        manager,
        "GET",
        routes.CHANNEL_INVITES(channelId),
      );
    },

    /**
     * Gets the list of channels for a guild.
     *
     * @param guildId - The ID of the guild to get the channels of.
     * @returns An array of {@link DiscordChannel[]} objects.
     *
     * @remarks
     * Excludes threads.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
     */
    async getChannels(guildId: BigString): Promise<DiscordChannel[]> {
      return await manager.runMethod<DiscordChannel[]>(
        manager,
        "GET",
        routes.GUILD_CHANNELS(guildId),
      );
    },

    /**
     * Gets the list of private archived threads for a channel.
     *
     * @param channelId - The ID of the channel to get the archived threads for.
     * @param options - The parameters for the fetching of threads.
     * @returns An instance of {@link DiscordListArchivedThreads}.
     *
     * @remarks
     * Requires the `READ_MESSAGE_HISTORY` permission.
     * Requires the `MANAGE_THREADS` permission.
     *
     * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
     *
     * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
     */
    async getPrivateArchivedThreads(
      channelId: BigString,
      options?: ListArchivedThreads,
    ): Promise<DiscordListArchivedThreads> {
      return await manager.runMethod<DiscordListArchivedThreads>(
        manager,
        "GET",
        routes.THREAD_ARCHIVED_PRIVATE(channelId, options),
      );
    },

    /**
     * Gets the list of private archived threads the bot is a member of for a channel.
     *
     * @param channelId - The ID of the channel to get the archived threads for.
     * @param options - The parameters for the fetching of threads.
     * @returns An instance of {@link DiscordListArchivedThreads}.
     *
     * @remarks
     * Requires the `READ_MESSAGE_HISTORY` permission.
     *
     * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
     *
     * Threads are ordered by the `id` property in descending order.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
     */
    async getPrivateJoinedArchivedThreads(
      channelId: BigString,
      options?: ListArchivedThreads,
    ): Promise<DiscordListArchivedThreads> {
      return await manager.runMethod<DiscordListArchivedThreads>(
        manager,
        "GET",
        routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options),
      );
    },

    /**
     * Gets the list of public archived threads for a channel.
     *
     * @param channelId - The ID of the channel to get the archived threads for.
     * @param options - The parameters for the fetching of threads.
     * @returns An instance of {@link DiscordListArchivedThreads}.
     *
     * @remarks
     * Requires the `READ_MESSAGE_HISTORY` permission.
     *
     * If called on a channel of type {@link ChannelTypes.GuildText}, returns threads of type {@link ChannelTypes.GuildPublicThread}.
     * If called on a channel of type {@link ChannelTypes.GuildNews}, returns threads of type {@link ChannelTypes.GuildNewsThread}.
     *
     * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
     */
    async getPublicArchivedThreads(
      channelId: BigString,
      options?: ListArchivedThreads,
    ): Promise<DiscordListArchivedThreads> {
      return await manager.runMethod<DiscordListArchivedThreads>(
        manager,
        "GET",
        routes.THREAD_ARCHIVED_PUBLIC(channelId, options),
      );
    },

    /**
     * Gets the stage instance associated with a stage channel, if one exists.
     *
     * @param channelId - The ID of the stage channel the stage instance is associated with.
     * @returns An instance of {@link DiscordStageInstance}.
     *
     * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
     */
    async getStageInstance(channelId: BigString): Promise<DiscordStageInstance> {
      return await manager.runMethod<DiscordStageInstance>(
        manager,
        "GET",
        routes.STAGE_INSTANCE(channelId),
      );
    },

    /**
     * Gets a thread member by their user ID.
     *
     * @param channelId - The ID of the thread to get the thread member of.
     * @param userId - The user ID of the thread member to get.
     * @returns An instance of {@link DiscordThreadMember}.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
     */
    async getThreadMember(channelId: BigString, userId: BigString): Promise<DiscordThreadMember> {
      return await manager.runMethod<DiscordThreadMember>(
        manager,
        "GET",
        routes.THREAD_USER(channelId, userId),
      );
    },

    /**
     * Gets the list of thread members for a thread.
     *
     * @param channelId - The ID of the thread to get the thread members of.
     * @returns A collection of {@link DiscordThreadMember} assorted by user ID.
     *
     * @remarks
     * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
     */
    async getThreadMembers(channelId: BigString): Promise<DiscordThreadMember[]> {
      return await manager.runMethod<DiscordThreadMember[]>(
        manager,
        "GET",
        routes.THREAD_MEMBERS(channelId),
      );
    },

    /**
     * Adds the bot user to a thread.
     *
     * @param channelId - The ID of the thread to add the bot user to.
     *
     * @remarks
     * Requires the thread not be archived.
     *
     * Fires a _Thread Members Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#join-thread}
     */
    async joinThread(channelId: BigString): Promise<void> {
      return await manager.runMethod<void>(manager, "PUT", routes.THREAD_ME(channelId));
    },

    /**
     * Removes the bot user from a thread.
     *
     * @param channelId - The ID of the thread to remove the bot user from.
     *
     * @remarks
     * Requires the thread not be archived.
     *
     * Fires a _Thread Members Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
     */
    async leaveThread(channelId: BigString): Promise<void> {
      return await manager.runMethod<void>(manager, "DELETE", routes.THREAD_ME(channelId));
    },

    /**
     * Removes a member from a thread.
     *
     * @param channelId - The ID of the thread to remove the thread member of.
     * @param userId - The user ID of the thread member to remove.
     *
     * @remarks
     * If the thread is of type {@link ChannelTypes.GuildPrivateThread}, requires to be the creator of the thread.
     * Otherwise, requires the `MANAGE_THREADS` permission.
     *
     * Requires the thread not be archived.
     *
     * Fires a _Thread Members Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
     */
    async removeThreadMember(channelId: BigString, userId: BigString): Promise<void> {
      return await manager.runMethod<void>(
        manager,
        "DELETE",
        routes.THREAD_USER(channelId, userId),
      );
    },

    /**
     * Creates a thread, using an existing message as its point of origin.
     *
     * @param channelId - The ID of the channel in which to create the thread.
     * @param messageId - The ID of the message to use as the thread's point of origin.
     * @param options - The parameters to use for the creation of the thread.
     * @returns An instance of the created {@link DiscordChannel}.
     *
     * @remarks
     * If called on a channel of type {@link ChannelTypes.GuildText}, creates a {@link ChannelTypes.GuildPublicThread}.
     * If called on a channel of type {@link ChannelTypes.GuildNews}, creates a {@link ChannelTypes.GuildNewsThread}.
     * Does not work on channels of type {@link ChannelTypes.GuildForum}.
     *
     * The ID of the created thread will be the same as the ID of the source message.
     *
     * Fires a _Thread Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
     */
    async startThreadWithMessage(
      channelId: BigString,
      messageId: BigString,
      options: StartThreadWithMessage,
    ): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "POST",
        routes.THREAD_START_PUBLIC(channelId, messageId),
        {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          reason: options.reason,
        },
      );
    },

    /**
     * Creates a thread without using a message as the thread's point of origin.
     *
     * @param channelId - The ID of the channel in which to create the thread.
     * @param options - The parameters to use for the creation of the thread.
     * @returns An instance of the created {@link DiscordChannel}.
     *
     * @remarks
     * Creating a private thread requires the server to be boosted.
     *
     * Fires a _Thread Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
     */
    async startThreadWithoutMessage(
      channelId: BigString,
      options: StartThreadWithoutMessage,
    ): Promise<DiscordChannel> {
      return await manager.runMethod<DiscordChannel>(
        manager,
        "POST",
        routes.THREAD_START_PRIVATE(channelId),
        {
          name: options.name,
          auto_archive_duration: options.autoArchiveDuration,
          rate_limit_per_user: options.rateLimitPerUser,
          type: options.type,
          invitable: options.invitable,
          reason: options.reason,
        },
      );
    },

    /**
     * Triggers a typing indicator for the bot user.
     *
     * @param channelId - The ID of the channel in which to trigger the typing indicator.
     *
     * @remarks
     * Generally, bots should _not_ use this route.
     *
     * Fires a _Typing Start_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
     */
    async triggerTypingIndicator(channelId: BigString): Promise<void> {
      return await manager.runMethod<void>(manager, "POST", routes.CHANNEL_TYPING(channelId));
    },
  };

  return manager;
}

export interface CreateRestManagerOptions {
  token: string;
  customUrl?: string;
  maxRetryCount?: number;
  version?: number;
  secretKey?: string;
  debug?: (text: string) => unknown;
  checkRateLimits?: typeof checkRateLimits;
  cleanupQueues?: typeof cleanupQueues;
  processQueue?: typeof processQueue;
  processRateLimitedPaths?: typeof processRateLimitedPaths;
  processRequestHeaders?: typeof processRequestHeaders;
  processRequest?: typeof processRequest;
  createRequestBody?: typeof createRequestBody;
  runMethod?: typeof runMethod;
  simplifyUrl?: typeof simplifyUrl;
  processGlobalQueue?: typeof processGlobalQueue;
  convertRestError?: typeof convertRestError;
  sendRequest?: typeof sendRequest;
  fetching?: (options: RestSendRequestOptions) => void;
  fetched?: (options: RestSendRequestOptions, response: Response) => void;
}

export type RestManager = ReturnType<typeof createRestManager>;
