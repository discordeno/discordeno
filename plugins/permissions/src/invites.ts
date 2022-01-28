import { BotWithCache } from "../deps.ts";
import { requireBotChannelPermissions } from "./permissions.ts";

export function createInvite(bot: BotWithCache) {
  const createInviteOld = bot.helpers.createInvite;

  bot.helpers.createInvite = function (channelId, options = {}) {
    if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
      throw new Error(
        "The max age for an invite must be between 0 and 604800.",
      );
    }
    if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
      throw new Error("The max uses for an invite must be between 0 and 100.");
    }

    requireBotChannelPermissions(bot, channelId, ["CREATE_INSTANT_INVITE"]);

    return createInviteOld(channelId, options);
  };
}

export function getChannelInvites(bot: BotWithCache) {
  const getChannelInvitesOld = bot.helpers.getChannelInvites;

  bot.helpers.getChannelInvites = function (channelId) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_CHANNELS"]);

    return getChannelInvitesOld(channelId);
  };
}

export function getInvites(bot: BotWithCache) {
  const getInvitesOld = bot.helpers.getInvites;

  bot.helpers.getInvites = function (guildId) {
    requireBotChannelPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return getInvitesOld(guildId);
  };
}

export default function setupInvitesPermChecks(bot: BotWithCache) {
  createInvite(bot);
  getChannelInvites(bot);
  getInvites(bot);
}
