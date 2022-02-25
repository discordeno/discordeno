// Managers
const ChannelManager = require("./ChannelManager");
const RoleManager = require("./RoleManager");
const GuildManager = require("./GuildManager");
const UserManager = require("./UserManager");
const EmojiManager = require("./EmojiManager");
const MessageManager = require("./MessageManager");
const MemberManager = require("./MemberManager");

///Structures
const Collection = require("../Structures/CacheCollection");
const Guild = require("../Structures/Guild");
const User = require("../Structures/User");
const Emoji = require("../Structures/Emoji");
const Message = require("../Structures/Message");
const Channel = require("../Structures/Channel");
const Role = require("../Structures/Role");
const Member = require("../Structures/Member");

/// Packet Handlers
const Actions = require("./Actions");

class CacheManager {
  // : import('discordeno').Bot
  static overwriteHandlers(bot) {
    const { guild, user, member, channel, message, role, emoji } = bot.transformers;
    const { handleDiscordPayload } = bot.gateway;

    bot.gateway.handleDiscordPayload = function (_bot, packet, shardId) {
      //console.log(packet.t);
      if (Actions[packet.t]) Actions[packet.t](bot, packet, shardId);
      handleDiscordPayload(bot, packet, shardId);
    };

    bot.transformers.guild = function (_, payload) {
      // Run the unmodified transformer
      const roles = payload.guild.roles;
      payload.guild.roles = [];

      const emojis = payload.guild.emojis;
      payload.guild.emojis = [];

      const result = guild(bot, payload);
      if (payload.guild) {
        result.channels = payload.guild.channels?.map((x) => channel(bot, { channel: x, guildId: result.id }));
        result.members = payload.guild.members?.map((x) => member(bot, x, result.id, BigInt(x.user.id)));

        result.roles = roles?.map((x) => role(bot, { role: x, guildId: result.id }));
        result.emojis = emojis?.map((x) => emoji(bot, x));
      }
      // Cache the result
      if (result) {
        bot.guilds.cache.patch(result.id, result);
      }

      // Return the result
      return result;
    };

    bot.transformers.channel = function (_, payload) {
      const guild = bot.guilds.cache.base({ id: payload.guild_id });
      const result = channel(bot, payload);
      guild.channels = [result];
      bot.guilds.cache.patch(guild.id, guild);
      return result;
    };

    bot.transformers.message = function (_, payload) {
      const channel = bot.channels.cache.base({ id: payload.channel_id });
      const result = message(bot, payload);
      channel.messages = [result];
      ///console.log(channel.messages)
      bot.channels.cache.patch(channel.id, channel);
      return result;
    };

    bot.transformers.role = function (_, payload) {
      const guild = bot.guilds.cache.base({ id: payload.guild_id });
      const result = role(bot, payload);
      guild.roles = [result];
      bot.guilds.cache.patch(guild.id, guild);
      return result;
    };

    bot.transformers.emoji = function (_, payload) {
      // @ no op
      return emoji(bot, payload);
    };

    bot.transformers.user = function (_, payload) {
      const result = user(bot, payload);
      bot.users.cache.patch(result.id, result);
      return result;
    };

    return bot;
  }

  static enableCachePlugin(client, options = {}) {
    const channelOptions = createOptions(client, options.channels, Channel, "channel");
    client.channels = new ChannelManager(client);
    client.channels.cache = new Collection(channelOptions);

    const guildOptions = createOptions(client, options.guilds, Guild, "guild");
    client.guilds = new GuildManager(client);
    client.guilds.cache = new Collection(guildOptions);

    const roleOptions = createOptions(client, options.roles, Role);
    client.roles = new RoleManager(client);
    client.roles.cache = new Collection(roleOptions);

    const userOptions = createOptions(client, options.users, User);
    client.users = new UserManager(client);
    client.users.cache = new Collection(userOptions);

    const emojiOptions = createOptions(client, options.emojis, Emoji);
    client.emojis = new EmojiManager(client);
    client.emojis.cache = new Collection(emojiOptions);

    const messageOptions = createOptions(client, options.messages, Message);
    client.messages = new MessageManager(client);
    client.messages.cache = new Collection(messageOptions);

    const memberOptions = createOptions(client, options.members, Member);
    client.members = new MemberManager(client);
    client.members.cache = new Collection(memberOptions);
    return CacheManager.overwriteHandlers(client);
  }
}
module.exports = CacheManager;

function createOptions(client, options = {}, transformerClass, context) {
  return {
    client,
    context,
    properties: options.properties ?? createFakePropertyOptions(),
    transformerClass: transformerClass ?? options.transformerClass,
  };
}

function createFakePropertyOptions() {
  return {
    includes: (str) => true,
    _cacheAll: true,
  };
}
