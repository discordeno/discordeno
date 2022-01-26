import { AllowedMentionsTypes, BotWithCache } from "../../deps.ts";

export default function editFollowupMessage(bot: BotWithCache) {
  const editFollowupMessageOld = bot.helpers.editFollowupMessage;

  bot.helpers.editFollowupMessage = function (
    token,
    messageId,
    options,
  ) {
    if (options.content && options.content.length > 2000) {
      throw Error("MESSAGE_MAX_LENGTH");
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

    return editFollowupMessageOld(token, messageId, options);
  };
}
