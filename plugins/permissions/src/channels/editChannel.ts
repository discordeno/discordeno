import { PermissionStrings } from "../../deps.ts";
import { BotWithCache, ChannelTypes, GuildFeatures } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function editChannel(bot: BotWithCache) {
  const editChannelOld = bot.helpers.editChannel;

  bot.helpers.editChannel = async function (channelId, options, reason) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);

      if (options.rateLimitPerUser && options.rateLimitPerUser > 21600) {
        throw new Error(
          "Amount of seconds a user has to wait before sending another message must be between 0-21600",
        );
      }

      if (options.name) {
        if (!bot.utils.validateLength(options.name, { min: 1, max: 100 })) {
          throw new Error(
            "The channel name must be between 1-100 characters.",
          );
        }
      }

      const isThread = [
        ChannelTypes.GuildNewsThread,
        ChannelTypes.GuildPublicThread,
        ChannelTypes.GuildPrivateThread,
      ].includes(channel.type);

      const requiredPerms: PermissionStrings[] = [];
      if (isThread) {
        if (
          options.invitable !== undefined &&
          channel.type !== ChannelTypes.GuildPrivateThread
        ) {
          throw new Error(
            "Invitable option is only allowed on private threads.",
          );
        }

        // UNARCHIVING AN UNLOCKED CHANNEL SIMPLY REQUIRES SEND
        if (!channel.locked && options.archived === false) {
          requiredPerms.push("SEND_MESSAGES");
          // MORE THAN ARCHIVE WAS MODIFIED
          if (Object.keys(options).length > 1) {
            requiredPerms.push("MANAGE_THREADS");
          }
        } else {
          requiredPerms.push("MANAGE_THREADS");
        }
      } else {
        requiredPerms.push("MANAGE_CHANNELS");

        if (options.permissionOverwrites) {
          requiredPerms.push("MANAGE_ROLES");
        }

        if (options.type) {
          if (
            [ChannelTypes.GuildNews, ChannelTypes.GuildText].includes(
              options.type,
            )
          ) {
            throw new Error("Only news and text types can be modified.");
          }

          if (guild && !guild.toggles.has("news")) {
            throw new Error(
              "The NEWS feature is missing in this guild to be able to modify the channel type.",
            );
          }
        }

        if (options.topic) {
          if (!bot.utils.validateLength(options.topic, { min: 1, max: 1024 })) {
            throw new Error("The topic must be a number between 1 and 1024");
          }
        }

        if (options.userLimit && options.userLimit > 99) {
          throw new Error("The user limit must be less than 99.");
        }

        if (options.parentId) {
          const category = bot.channels.get(options.parentId);
          if (category && category.type !== ChannelTypes.GuildCategory) {
            throw new Error(
              "The parent id must be for a category channel type.",
            );
          }
        }
      }

      requireBotChannelPermissions(
        bot,
        channel,
        requiredPerms,
      );

      if (options.autoArchiveDuration) {
        if (guild) {
          if (
            !guild.toggles.has(
              options.autoArchiveDuration === 4320 ? "threeDayThreadArchive" : "sevenDayThreadArchive",
            )
          ) {
            throw new Error(
              "The 3 day and 7 day archive durations require the server to be boosted",
            );
          }
        }
      }
    }

    return await editChannelOld(channelId, options, reason);
  };
}
