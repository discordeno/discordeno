import { AllowedMentionsTypes, BotWithCache } from "../../deps.ts";
import { validateAttachments } from "../attachments.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editMessage(bot: BotWithCache) {
  const editMessage = bot.helpers.editMessage;

  bot.helpers.editMessage = function (channelId, messageId, content) {
    if (typeof content === "string") {
      throw new Error("TODO");
    }

    const message = bot.messages.get(messageId);
    if (message) {
      if (message.authorId !== bot.id) {
        content = { flags: content.flags };
        requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);
      }
    }

    if (content.allowedMentions) {
      if (content.allowedMentions.users?.length) {
        if (content.allowedMentions.parse?.includes(AllowedMentionsTypes.UserMentions)) {
          content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "users");
        }

        if (content.allowedMentions.users.length > 100) {
          content.allowedMentions.users = content.allowedMentions.users.slice(0, 100);
        }
      }

      if (content.allowedMentions.roles?.length) {
        if (content.allowedMentions.parse?.includes(AllowedMentionsTypes.RoleMentions)) {
          content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "roles");
        }

        if (content.allowedMentions.roles.length > 100) {
          content.allowedMentions.roles = content.allowedMentions.roles.slice(0, 100);
        }
      }
    }

    content.embeds?.splice(10);

    if (content.content && !bot.utils.validateLength(content.content, { max: 2000 })) {
      throw new Error("A message content can not contain more than 2000 characters.");
    }

    if (content.attachments) validateAttachments(bot, content.attachments);

    return editMessage(channelId, messageId, content);
  };
}
