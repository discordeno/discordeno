import { BotWithCache, PermissionStrings } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function createStageInstance(bot: BotWithCache) {
  const createStageInstance = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = async function (options) {
    if (!bot.utils.validateLength(options.topic, { max: 120, min: 1 })) {
      throw new Error("The topic length for creating a stage instance must be between 1-120.");
    }

    const perms = new Set<PermissionStrings>(["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"]);

    if (options.sendStartNotification) {
      perms.add("MENTION_EVERYONE");
    }

    requireBotChannelPermissions(bot, options.channelId, [...perms.values()]);

    return await createStageInstance(options);
  };
}
