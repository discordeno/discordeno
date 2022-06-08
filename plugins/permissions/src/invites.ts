import { BotWithCache, ChannelTypes, PermissionStrings } from "../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "./permissions.ts";

export function createInvite(bot: BotWithCache) {
  const createInviteOld = bot.helpers.createInvite;

  bot.helpers.createInvite = async function (channelId, options = {}) {
    if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
      throw new Error(
        "The max age for an invite must be between 0 and 604800.",
      );
    }
    if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
      throw new Error("The max uses for an invite must be between 0 and 100.");
    }

    const perms: PermissionStrings[] = ["CREATE_INSTANT_INVITE"];
    const channel = bot.channels.get(channelId);
    if (channel) {
      perms.push(
        channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice
          ? "CONNECT"
          : "VIEW_CHANNEL",
      );
    }

    requireBotChannelPermissions(bot, channelId, perms);

    return await createInviteOld(channelId, options);
  };
}

export function getChannelInvites(bot: BotWithCache) {
  const getChannelInvitesOld = bot.helpers.getChannelInvites;

  bot.helpers.getChannelInvites = async function (channelId) {
    const perms: PermissionStrings[] = ["MANAGE_CHANNELS"];
    const channel = bot.channels.get(channelId);
    if (channel) {
      perms.push(
        channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice
          ? "CONNECT"
          : "VIEW_CHANNEL",
      );
    }

    requireBotChannelPermissions(bot, channelId, perms);

    return await getChannelInvitesOld(channelId);
  };
}

export function getInvites(bot: BotWithCache) {
  const getInvitesOld = bot.helpers.getInvites;

  bot.helpers.getInvites = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getInvitesOld(guildId);
  };
}

export default function setupInvitesPermChecks(bot: BotWithCache) {
  createInvite(bot);
  getChannelInvites(bot);
  getInvites(bot);
}
