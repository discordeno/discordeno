const Discordeno = require("discordeno");
module.exports = {
  /// Managers:
  ...Discordeno,
  MessageManager: require("./Managers/MessageManager"),
  ChannelManager: require("./Managers/ChannelManager"),
  GuildManager: require("./Managers/GuildManager"),
  MemberManager: require("./Managers/MemberManager"),
  RoleManager: require("./Managers/RoleManager"),
  UserManager: require("./Managers/UserManager"),
  EmojiManager: require("./Managers/EmojiManager"),

  CacheManager: require("./Managers/CacheManager"),
  enableCachePlugin: require("./Managers/CacheManager").enableCachePlugin,

  Actions: require("./Managers/Actions"),

  /// Structures:
  Message: require("./Structures/Message"),
  Channel: require("./Structures/Channel"),
  Guild: require("./Structures/Guild"),
  Member: require("./Structures/Member"),
  Role: require("./Structures/Role"),
  User: require("./Structures/User"),
  Emoji: require("./Structures/Emoji"),
  Collection: require("./Structures/Collection"),
  Component: require("./Structures/Component"),
  Embed: require("./Structures/Embed"),
  Emoji: require("./Structures/Emoji"),
  Interaction: require("./Structures/Interaction"),
  DestructObject: require("./Structures/DestructObject"),

  ///Util:
  Collector: require("./Util/Collectors"),
  ComponentOptions: require("./Util/ComponentOptions"),
};
