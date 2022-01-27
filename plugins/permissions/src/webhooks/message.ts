import { AllowedMentionsTypes, BotWithCache } from "../../deps.ts";
import { validateComponents } from "../components.ts";

export function editWebhookMessage(bot: BotWithCache) {
  const editWebhookMessageOld = bot.helpers.editWebhookMessage;

  bot.helpers.editWebhookMessage = function (
    webhookId,
    webhookToken,
    options,
  ) {
    if (
      options.content &&
      !bot.utils.validateLength(options.content, { max: 2000 })
    ) {
      throw Error("The content can not exceed 2000 characters.");
    }

    if (options.embeds && options.embeds.length > 10) {
      options.embeds.splice(10);
    }

    if (options.allowedMentions) {
      if (options.allowedMentions.users?.length) {
        if (
          options.allowedMentions.parse?.includes(
            AllowedMentionsTypes.UserMentions,
          )
        ) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((
            p,
          ) => p !== "users");
        }

        if (options.allowedMentions.users.length > 100) {
          options.allowedMentions.users = options.allowedMentions.users.slice(
            0,
            100,
          );
        }
      }

      if (options.allowedMentions.roles?.length) {
        if (
          options.allowedMentions.parse?.includes(
            AllowedMentionsTypes.RoleMentions,
          )
        ) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((
            p,
          ) => p !== "roles");
        }

        if (options.allowedMentions.roles.length > 100) {
          options.allowedMentions.roles = options.allowedMentions.roles.slice(
            0,
            100,
          );
        }
      }
    }

    if (options.components) validateComponents(bot, options.components);

    return editWebhookMessageOld(webhookId, webhookToken, options);
  };
}

export default function setupMessageWebhookPermChecks(bot: BotWithCache) {
  editWebhookMessage(bot);
}
