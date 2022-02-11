import { AllowedMentionsTypes, BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { validateComponents } from "../components.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function sendMessage(bot: BotWithCache) {
  const sendMessageOld = bot.helpers.sendMessage;

  bot.helpers.sendMessage = function (
    channelId,
    content,
  ) {
    const channel = bot.channels.get(channelId);
    if (
      channel &&
      [
        ChannelTypes.GuildCategory,
        ChannelTypes.GuildStore,
        ChannelTypes.GuildStageVoice,
      ].includes(channel.type)
    ) {
      throw new Error(
        `Can not send message to a channel of this type. Channel ID: ${channelId}`,
      );
    }

    if (channel) {
      const requiredPerms: PermissionStrings[] = [];
      if (channel.guildId) {
        requiredPerms.push("SEND_MESSAGES");
      }
      if (content.tts) requiredPerms.push("SEND_TTS_MESSAGES");
      if (content.messageReference) requiredPerms.push("READ_MESSAGE_HISTORY");
      if (requiredPerms.length) {
        requireBotChannelPermissions(bot, channel, requiredPerms);
      }
    }

    return sendMessageOld(channelId, content);
  };
}

export function editMessage(bot: BotWithCache) {
  const editMessageOld = bot.helpers.editMessage;

  bot.helpers.editMessage = function (
    channelId,
    messageId,
    content,
  ) {
    const message = bot.messages.get(messageId);
    if (message) {
      if (message.authorId !== bot.id) {
        content = { flags: content.flags };
        requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);
      }
    }

    return editMessageOld(channelId, messageId, content);
  };
}

export function publishMessage(bot: BotWithCache) {
  const publishMessageOld = bot.helpers.publishMessage;

  bot.helpers.publishMessage = function (
    channelId,
    messageId,
  ) {
    const message = bot.messages.get(messageId);

    requireBotChannelPermissions(
      bot,
      channelId,
      message?.authorId === bot.id ? ["SEND_MESSAGES"] : ["MANAGE_MESSAGES"],
    );

    return publishMessageOld(channelId, messageId);
  };
}

export default function setupCreateMessagePermChecks(bot: BotWithCache) {
  sendMessage(bot);
  editMessage(bot);
  publishMessage(bot);
}
