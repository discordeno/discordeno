import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

export async function editWebhookMessage(
  webhookId: string,
  webhookToken: string,
  messageId: string,
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
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter(
          (p) => p !== "users",
        );
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
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter(
          (p) => p !== "roles",
        );
      }

      if (options.allowed_mentions.roles.length > 100) {
        options.allowed_mentions.roles = options.allowed_mentions.roles.slice(
          0,
          100,
        );
      }
    }
  }

  const result = await RequestManager.patch(
    endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId),
    { ...options, allowed_mentions: options.allowed_mentions },
  ) as MessageCreateOptions;

  const message = await structures.createMessageStruct(result);
  return message;
}
