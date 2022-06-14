import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function createStageInstance(bot: BotWithCache) {
  const createStageInstanceOld = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = async function (options) {
    if (!bot.utils.validateLength(options.topic, { max: 120, min: 1 })) {
      throw new Error(
        "The topic length for creating a stage instance must be between 1-120.",
      );
    }

    const perms = new Set<PermissionStrings>([
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    if (options.sendStartNotification) {
      perms.add("MENTION_EVERYONE");
    }

    requireBotChannelPermissions(bot, options.channelId, [...perms.values()]);

    const channel = bot.channels.get(options.channelId);
    if (channel && channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error("Channel must be a stage voice channel.");
    }

    return await createStageInstanceOld(options);
  };
}

export function deleteStageInstance(bot: BotWithCache) {
  const deleteStageInstanceOld = bot.helpers.deleteStageInstance;

  bot.helpers.deleteStageInstance = async function (channelId) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    const channel = bot.channels.get(channelId);
    if (channel && channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error("Channel must be a stage voice channel.");
    }

    return await deleteStageInstanceOld(channelId);
  };
}

export function updateStageInstance(bot: BotWithCache) {
  const updateStageInstanceOld = bot.helpers.updateStageInstance;

  bot.helpers.updateStageInstance = async function (channelId, data) {
    requireBotChannelPermissions(bot, channelId, [
      "MANAGE_CHANNELS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
    ]);

    const channel = bot.channels.get(channelId);
    if (channel && channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error("Channel must be a stage voice channel.");
    }

    return await updateStageInstanceOld(channelId, data);
  };
}

export default function setupStagePermChecks(bot: BotWithCache) {
  createStageInstance(bot);
  deleteStageInstance(bot);
  updateStageInstance(bot);
}
