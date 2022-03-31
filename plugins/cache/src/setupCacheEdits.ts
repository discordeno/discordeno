import type {
  Bot,
  DiscordGuildMemberAdd,
  DiscordGuildMemberRemove,
  DiscordMessageReactionAdd,
  DiscordMessageReactionRemove,
  DiscordMessageReactionRemoveAll,
} from "../deps.ts";
import type { BotWithCache } from "./addCacheCollections.ts";

export function setupCacheEdits<B extends Bot>(bot: BotWithCache<B>) {
  const {
    GUILD_MEMBER_ADD,
    GUILD_MEMBER_REMOVE,
    MESSAGE_REACTION_ADD,
    MESSAGE_REACTION_REMOVE,
    MESSAGE_REACTION_REMOVE_ALL,
  } = bot.handlers;

  bot.handlers.GUILD_MEMBER_ADD = function (_, data, shardId) {
    const payload = data.d as DiscordGuildMemberAdd;

    const guild = bot.guilds.get(bot.transformers.snowflake(payload.guild_id));

    if (guild) guild.memberCount++;

    GUILD_MEMBER_ADD(bot, data, shardId);
  };

  bot.handlers.GUILD_MEMBER_REMOVE = function (_, data, shardId) {
    const payload = data.d as DiscordGuildMemberRemove;

    const guild = bot.guilds.get(bot.transformers.snowflake(payload.guild_id));

    if (guild) guild.memberCount--;

    GUILD_MEMBER_REMOVE(bot, data, shardId);
  };

  bot.handlers.MESSAGE_REACTION_ADD = function (_, data, shardId) {
    const payload = data.d as DiscordMessageReactionAdd;

    const messageId = bot.transformers.snowflake(payload.message_id);
    const message = bot.messages.get(messageId);

    const emoji = bot.transformers.emoji(bot, payload.emoji);

    // if the message is cached
    if (message) {
      const reactions = message.reactions?.map((r) => r.emoji.name);
      const toSet = {
        count: 1,
        me: bot.transformers.snowflake(payload.user_id) === bot.id,
        emoji: emoji,
      };

      // if theres no reaction add it
      if (!message.reactions || !reactions) {
        message.reactions = [toSet];
      } else if (!reactions.includes(emoji.name)) {
        message.reactions?.push(toSet);
      } else { // otherwise the reaction has already been added so +1 to the reaction count
        const current = message.reactions?.[reactions.indexOf(emoji.name)];

        // rewrite
        if (current) {
          current.count++;
        }
      }
    }

    MESSAGE_REACTION_ADD(bot, data, shardId);
  };

  bot.handlers.MESSAGE_REACTION_REMOVE = function (_, data, shardId) {
    const payload = data.d as DiscordMessageReactionRemove;

    const messageId = bot.transformers.snowflake(payload.message_id);
    const message = bot.messages.get(messageId);

    const emoji = bot.transformers.emoji(bot, payload.emoji);

    // if the message is cached
    if (message) {
      const reactions = message.reactions?.map((r) => r.emoji.name);

      if (reactions?.indexOf(emoji.name) !== undefined) {
        const current = message.reactions?.[reactions.indexOf(emoji.name)];

        if (current) {
          if (current.count > 0) {
            current.count--;
          }
          // delete when count is 0
          if (current.count === 0) {
            message.reactions?.splice(reactions?.indexOf(emoji.name), 1);
          }
          // when someone deleted a reaction that doesn't exist in the cache just pass
        }
      }
    }

    MESSAGE_REACTION_REMOVE(bot, data, shardId);
  };

  bot.handlers.MESSAGE_REACTION_REMOVE_ALL = function (_, data, shardId) {
    const payload = data.d as DiscordMessageReactionRemoveAll;

    const messageId = bot.transformers.snowflake(payload.message_id);
    const message = bot.messages.get(messageId);

    if (message) {
      // when an admin deleted all the reactions of a message
      message.reactions = undefined;
    }

    MESSAGE_REACTION_REMOVE_ALL(bot, data, shardId);
  };
}
