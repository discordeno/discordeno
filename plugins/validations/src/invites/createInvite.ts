import { Bot } from "../../deps.ts";

export function createInvite(bot: Bot) {
  const createInvite = bot.helpers.createInvite;

  bot.helpers.createInvite = function (channelId, options = {}) {
    if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
      throw new Error("The max age for an invite must be between 0 and 604800.");
    }
    if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
      throw new Error("The max uses for an invite must be between 0 and 100.");
    }

    return createInvite(channelId, options);
  };
}
