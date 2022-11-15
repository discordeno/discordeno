import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editChannel(bot: BotWithCache) {
  const editChannel = bot.helpers.editChannel;

  bot.helpers.editChannel = async function (channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);

      if (options.rateLimitPerUser && options.rateLimitPerUser > 21600) {
        throw new Error("Amount of seconds a user has to wait before sending another message must be between 0-21600");
      }

      if (options.name) {
        if (!bot.utils.validateLength(options.name, { min: 1, max: 100 })) {
          throw new Error("The channel name must be between 1-100 characters.");
        }
      }

      const perms: PermissionStrings[] = ["VIEW_CHANNEL"];
      const isThread = [ChannelTypes.AnnouncementThread, ChannelTypes.PublicThread, ChannelTypes.PrivateThread]
        .includes(channel.type);
      const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type);

      if (isVoice) perms.push("CONNECT");

      if (isThread) {
        if (options.invitable !== undefined && channel.type !== ChannelTypes.PrivateThread) {
          throw new Error("Invitable option is only allowed on private threads.");
        }

        // UNARCHIVING AN UNLOCKED CHANNEL SIMPLY REQUIRES SEND
        if (!channel.locked && options.archived === false) {
          perms.push("SEND_MESSAGES");
          // MORE THAN ARCHIVE WAS MODIFIED
          if (Object.keys(options).length > 1) perms.push("MANAGE_THREADS");
        } else {
          perms.push("MANAGE_THREADS");
        }

        if (options.appliedTags && options.appliedTags.length > 5) throw new Error("thread applied tags is limit to 5");
      } else {
        perms.push("MANAGE_CHANNELS");

        if (options.permissionOverwrites) perms.push("MANAGE_ROLES");

        if (options.type) {
          if ([ChannelTypes.GuildAnnouncement, ChannelTypes.GuildText].includes(options.type)) {
            throw new Error("Only news and text types can be modified.");
          }

          if (guild && !guild.toggles.has("news")) {
            throw new Error("The NEWS feature is missing in this guild to be able to modify the channel type.");
          }
        }

        if (options.topic) {
          if (!bot.utils.validateLength(options.topic, { min: 1, max: 1024 })) {
            throw new Error("The topic must be a number between 1 and 1024");
          }
        }

        if (options.userLimit && options.userLimit > 99) throw new Error("The user limit must be less than 99.");

        if (options.parentId) {
          const category = bot.channels.get(bot.transformers.snowflake(options.parentId));
          if (category && category.type !== ChannelTypes.GuildCategory) {
            throw new Error("The parent id must be for a category channel type.");
          }
        }

        if (options.availableTags && options.availableTags.length > 20) {
          throw new Error("channel available tags is limited to 20");
        }
      }

      requireBotChannelPermissions(bot, channel, perms);
    }

    return await editChannel(channelId, options);
  };
}
