import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  EditSlashResponseOptions,
  Errors,
  MessageCreateOptions,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** To edit your response to a slash command. If a messageID is not provided it will default to editing the original response. */
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
    options.messageID
      ? endpoints.WEBHOOK_MESSAGE(applicationID, token, options.messageID)
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationID, token),
    options,
  );

  // If the original message was edited, this will not return a message
  if (!options.messageID) return result;

  const message = await structures.createMessageStruct(
    result as MessageCreateOptions,
  );
  return message;
}
