import { BotWithCache } from "../../deps.ts";
import setupInteractionCommandPermChecks from "./commands.ts";
import editFollowupMessage from "./editFollowupMessage.ts";

export function sendInteractionResponse(bot: BotWithCache) {
  const sendInteractionResponseOld = bot.helpers.sendInteractionResponse;

  bot.helpers.sendInteractionResponse = function (id, token, options) {
    if (options.data?.title !== undefined) {
      if (!bot.utils.validateLength(options.data.title, { min: 1, max: 45 })) {
        throw new Error(
          "Invalid modal title. Must be between 1-45 characters long.",
        );
      }
    }

    options.data?.choices?.every((choice) => {
      if (!bot.utils.validateLength(choice.name, { min: 1, max: 100 })) {
        throw new Error(
          "Invalid application command option choice name. Must be between 1-100 characters long.",
        );
      }

      if (
        typeof choice.value === "string" && (choice.value.length < 1 ||
          choice.value.length > 100)
      ) {
        throw new Error("Invalid slash options choice value type.");
      }
    });

    return sendInteractionResponseOld(id, token, options);
  };
}

export default function setupInteractionPermChecks(bot: BotWithCache) {
  setupInteractionCommandPermChecks(bot);
  editFollowupMessage(bot);
}
