import { BotWithCache } from "../deps.ts";
import { requireBotChannelPermissions } from "./permissions.ts";

export function createInvite(bot: BotWithCache) {
  const createInviteOld = bot.helpers.createInvite;

  bot.helpers.createInvite = function (channelId, options = {}) {
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
