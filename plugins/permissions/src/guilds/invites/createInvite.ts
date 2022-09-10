import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function createInvite(bot: BotWithCache) {
  const createInvite = bot.helpers.createInvite;

  bot.helpers.createInvite = async function (channelId, options = {}) {
    if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
      throw new Error(
        "The max age for an invite must be between 0 and 604800.",
      );
    }
    if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
      throw new Error("The max uses for an invite must be between 0 and 100.");
    }

    requireBotChannelPermissions(bot, channelId, ["CREATE_INSTANT_INVITE"]);

    return await createInvite(channelId, options);
  };
}
