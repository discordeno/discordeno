import { AllowedMentionsTypes, BotWithCache } from "../../deps.ts";
import { validateComponents } from "../components.ts";

export default function sendWebhook(bot: BotWithCache) {
  const sendWebhookOld = bot.helpers.sendWebhook;

  bot.helpers.sendWebhook = function (webhookId, webhookToken, options) {
    if (
      options.content &&
      !bot.utils.validateLength(options.content, { max: 2000 })
    ) {
      throw new Error("The content should not exceed 2000 characters.");
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

    if (options.components) {
      validateComponents(bot, options.components);
    }

    if (!options.content && !options.file && !options.embeds) {
      throw new Error(
        "You must provide a value for at least one of content, embeds, or file.",
      );
    }

    return sendWebhookOld(webhookId, webhookToken, options);
  };
}
