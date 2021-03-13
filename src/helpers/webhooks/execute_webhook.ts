import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Execute a webhook with webhook ID and webhook token */
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
        options.mentions.parse = options.mentions.parse.filter(
          (p) => p !== "users",
        );
      }

      if (options.mentions.users.length > 100) {
        options.mentions.users = options.mentions.users.slice(0, 100);
      }
    }

    if (options.mentions.roles?.length) {
      if (options.mentions.parse.includes("roles")) {
        options.mentions.parse = options.mentions.parse.filter(
          (p) => p !== "roles",
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

  return structures.createMessageStruct(result as MessageCreateOptions);
}
