import { Bot } from "./bot.ts";
import type { DiscordenoChannel } from "./transformers/channel.ts";
import type { DiscordenoGuild } from "./transformers/guild.ts";
import type { DiscordenoMember } from "./transformers/member.ts";
import type { DiscordenoMessage } from "./transformers/message.ts";

function messageSweeper(bot: Bot, message: DiscordenoMessage) {
  // DM messages aren't needed
  if (!message.guildId) return true;

  // Only delete messages older than 10 minutes
  return Date.now() - message.timestamp > 600000;
}

function memberSweeper(bot: Bot, member: DiscordenoMember) {
  // Don't sweep the bot else strange things will happen
  if (member.id === bot.id) return false;

  // Only sweep members who were not active the last 30 minutes
  return Date.now() - member.cachedAt > 1800000;
}

async function guildSweeper(bot: Bot, guild: DiscordenoGuild) {
  // Reset activity for next interval
  if (await bot.cache.activeGuildIds.delete(guild.id)) return false;

  // This is inactive guild. Not a single thing has happened for atleast 30 minutes.
  // Not a reaction, not a message, not any event!
  await bot.cache.dispatchedGuildIds.set(guild.id);

  return true;
}

async function channelSweeper(bot: Bot, channel: DiscordenoChannel, key: bigint) {
  // If this is in a guild and the guild was dispatched, then we can dispatch the channel
  if (channel.guildId && (await bot.cache.dispatchedGuildIds.has(channel.guildId))) {
    await bot.cache.dispatchedChannelIds.set(channel.id);
    return true;
  }

  // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
  if (!channel.guildId && !(await bot.cache.members.has(key))) return true;

  return false;
}
