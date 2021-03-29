import { applicationId } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
export async function editSlashResponse(
  token: string,
  options: EditSlashResponseOptions,
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
    options.messageId
      ? endpoints.WEBHOOK_MESSAGE(applicationId, token, options.messageId)
      : endpoints.INTERACTION_ORIGINAL_Id_TOKEN(applicationId, token),
    options,
  );

  // If the original message was edited, this will not return a message
  if (!options.messageId) return result;

  const message = await structures.createMessageStruct(
    result as MessageCreateOptions,
  );
  return message;
}
