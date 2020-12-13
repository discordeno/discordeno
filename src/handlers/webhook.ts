import { RequestManager } from "../module/requestManager.ts";
import { structures } from "../structures/structures.ts";
import {
  EditWebhookMessageOptions,
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  WebhookCreateOptions,
  WebhookPayload,
} from "../types/types.ts";
import { endpoints } from "../utils/constants.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";
import { urlToBase64 } from "../utils/utils.ts";

/** Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
*
* Webhook names cannot be: 'clyde'
*/
export async function createWebhook(
  channelID: string,
  options: WebhookCreateOptions,
) {
  const hasManageWebhooksPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_WEBHOOKS"],
  );
  if (
    !hasManageWebhooksPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  if (
    // Specific usernames that discord does not allow
    options.name === "clyde" ||
    // Character limit checks. [...] checks are because of js unicode length handling
    [...options.name].length < 2 || [...options.name].length > 32
  ) {
    throw new Error(Errors.INVALID_WEBHOOK_NAME);
  }

  return RequestManager.post(
    endpoints.CHANNEL_WEBHOOKS(channelID),
    {
      ...options,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
    },
  ) as Promise<WebhookPayload>;
}

export async function executeWebhook(
  webhookID: string,
  webhookToken: string,
  options: ExecuteWebhookOptions,
) {
  if (!options.content && !options.file && !options.embeds) {
    throw new Error(Errors.INVALID_WEBHOOK_OPTIONS);
  }

  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.mentions) {
    if (options.mentions.users?.length) {
      if (options.mentions.parse.includes("users")) {
        options.mentions.parse = options.mentions.parse.filter((p) =>
          p !== "users"
        );
      }

      if (options.mentions.users.length > 100) {
        options.mentions.users = options.mentions.users.slice(0, 100);
      }
    }

    if (options.mentions.roles?.length) {
      if (options.mentions.parse.includes("roles")) {
        options.mentions.parse = options.mentions.parse.filter((p) =>
          p !== "roles"
        );
      }

      if (options.mentions.roles.length > 100) {
        options.mentions.roles = options.mentions.roles.slice(0, 100);
      }
    }
  }

  const result = await RequestManager.post(
    `${endpoints.WEBHOOK(webhookID, webhookToken)}${
      options.wait ? "?wait=true" : ""
    }`,
    {
      ...options,
      allowed_mentions: options.mentions,
      avatar_url: options.avatar_url,
    },
  );
  if (!options.wait) return;

  return structures.createMessage(result as MessageCreateOptions);
}

export function getWebhook(webhookID: string) {
  return RequestManager.get(endpoints.WEBHOOK_ID(webhookID));
}

export function editWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
  options: EditWebhookMessageOptions,
) {
  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowed_mentions) {
    if (options.allowed_mentions.users?.length) {
      if (options.allowed_mentions.parse.includes("users")) {
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter((
          p,
        ) => p !== "users");
      }

      if (options.allowed_mentions.users.length > 100) {
        options.allowed_mentions.users = options.allowed_mentions.users.slice(
          0,
          100,
        );
      }
    }

    if (options.allowed_mentions.roles?.length) {
      if (options.allowed_mentions.parse.includes("roles")) {
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter((
          p,
        ) => p !== "roles");
      }

      if (options.allowed_mentions.roles.length > 100) {
        options.allowed_mentions.roles = options.allowed_mentions.roles.slice(
          0,
          100,
        );
      }
    }
  }

  return RequestManager.patch(
    endpoints.WEBHOOK_EDIT(webhookID, webhookToken, messageID),
    { ...options, allowed_mentions: options.allowed_mentions },
  );
}

export function deleteWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
) {
  return RequestManager.delete(
    endpoints.WEBHOOK_DELETE(webhookID, webhookToken, messageID),
  );
}
