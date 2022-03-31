import { Bot, Member } from "../deps.ts";
import { BotWithCache } from "./addCacheCollections.ts";
import { dispatchRequirements } from "./dispatchRequirements.ts";

/** Enables sweepers for your bot but will require, enabling cache first. */
export function enableCacheSweepers<B extends Bot>(bot: BotWithCache<B>) {
  bot.guilds.startSweeper({
    filter: function (guild, _, bot: BotWithCache<B>) {
      // Reset activity for next interval
      if (bot.activeGuildIds.delete(guild.id)) return false;

      // This is inactive guild. Not a single thing has happened for atleast 30 minutes.
      // Not a reaction, not a message, not any event!
      bot.dispatchedGuildIds.add(guild.id);

      return true;
    },
    interval: 3660000,
    bot,
  });
  bot.channels.startSweeper({
    filter: function channelSweeper(
      channel,
      key,
      bot: BotWithCache<B>,
    ) {
      // If this is in a guild and the guild was dispatched, then we can dispatch the channel
      if (channel.guildId && bot.dispatchedGuildIds.has(channel.guildId)) {
        bot.dispatchedChannelIds.add(channel.id);
        return true;
      }

      // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
      if (!channel.guildId && !bot.members.has(key)) return true;

      return false;
    },
    interval: 3660000,
    bot,
  });

  const setMember = bot.members.set.bind(bot.members);
  bot.members.set = function (id, member) {
    return setMember(id, {
      ...member,
      cachedAt: Date.now(),
    } as Member);
  };

  bot.members.startSweeper({
    filter: function memberSweeper(member, _, bot: BotWithCache<B>) {
      // Don't sweep the bot else strange things will happen
      if (member.id === bot.id) return false;

      // Only sweep members who were not active the last 30 minutes
      return Date.now() - (member as Member & { cachedAt: number }).cachedAt > 1800000;
    },
    interval: 300000,
    bot,
  });

  bot.messages.startSweeper({
    filter: function messageSweeper(message) {
      // DM messages aren't needed
      if (!message.guildId) return true;

      // Only delete messages older than 10 minutes
      return Date.now() - message.timestamp > 600000;
    },
    interval: 300000,
    bot,
  });

  bot.presences.startSweeper({ filter: () => true, interval: 300000, bot });

  // DISPATCH REQUIREMENTS
  const handleDiscordPayloadOld = bot.gateway.handleDiscordPayload;
  bot.gateway.handleDiscordPayload = async function (_, data, shardId) {
    // RUN DISPATCH CHECK
    await dispatchRequirements(bot, data);
    // RUN OLD HANDLER
    handleDiscordPayloadOld(_, data, shardId);
  };
}
