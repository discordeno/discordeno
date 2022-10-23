import { EditMessage } from "../helpers/messages/editMessage.ts";
import { processReactionString } from "../helpers/messages/reactions/getReactions.ts";
import { transformAllowedMentionsToDiscordAllowedMentions } from "../transformers/reverse/allowedMentions.ts";
import { transformAttachmentToDiscordAttachment } from "../transformers/reverse/attachment.ts";
import { transformComponentToDiscordComponent } from "../transformers/reverse/component.ts";
import { transformEmbedToDiscordEmbed } from "../transformers/reverse/embed.ts";
import { DiscordFollowedChannel, DiscordMessage } from "../types/discord.ts";
import { BigString } from "../types/shared.ts";
import { API_VERSION, baseEndpoints } from "../util/constants.ts";
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
     * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
     *
     * @param sourceChannelId - The ID of the announcement channel to follow.
     * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
     * @returns An instance of {@link FollowedChannel}.
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
    ): Promise<string> {
      const result = await manager.runMethod<DiscordFollowedChannel>(
        manager,
        "POST",
        routes.CHANNEL_FOLLOW(sourceChannelId),
        {
          webhook_channel_id: targetChannelId,
        },
      );

      return result.webhook_id;
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
