import { BotWithCache, PermissionStrings } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function createStageInstance(bot: BotWithCache) {
  const createStageInstance = bot.helpers.createStageInstance;

  bot.helpers.createStageInstance = async function (options) {
    const perms: PermissionStrings[] = ["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"];

    if (options.sendStartNotification) {
      perms.push("MENTION_EVERYONE");
    }

    requireBotChannelPermissions(bot, options.channelId, perms);

    return await createStageInstance(options);
  };
}
