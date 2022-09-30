import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function createChannel(bot: BotWithCache) {
  const createChannel = bot.helpers.createChannel;

  bot.helpers.createChannel = async function (guildId, options) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId));

    if (guild) {
      if (options?.rateLimitPerUser && !(0 < options.rateLimitPerUser && options.rateLimitPerUser < 21600)) {
        throw new Error("Amount of seconds a user has to wait before sending another message must be between 0-21600");
      }

      if (options?.name && !bot.utils.validateLength(options.name, { min: 1, max: 100 })) {
        throw new Error("The channel name must be between 1-100 characters.");
      }

      const requiredPerms: PermissionStrings[] = [];

      requiredPerms.push("MANAGE_CHANNELS");

      if (options?.permissionOverwrites) requiredPerms.push("MANAGE_ROLES");

      if (options?.type === ChannelTypes.GuildAnnouncement && !guild.toggles.has("news")) {
        throw new Error("The NEWS feature is missing in this guild to be able to modify the channel type.");
      }

      if (
        options?.topic && !bot.utils.validateLength(options.topic, {
          min: 1,
          max: options.type === ChannelTypes.GuildForum ? 4096 : 1024,
        })
      ) {
        throw new Error("The topic length must be between 1 and 1024 (4096 if forum)");
      }

      if (options?.userLimit && options.userLimit > 99) throw new Error("The user limit must be less than 99.");

      if (options?.parentId) {
        const category = bot.channels.get(bot.transformers.snowflake(options.parentId));
        if (category && category.type !== ChannelTypes.GuildCategory) {
          throw new Error("The parent id must be for a category channel type.");
        }
      }

      requireBotGuildPermissions(bot, guild, requiredPerms);
    }

    return await createChannel(guildId, options);
  };
}
