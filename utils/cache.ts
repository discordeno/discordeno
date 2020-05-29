import Collection from "./collection.ts";
import { Message } from "../structures/message.ts";
import { Guild } from "../structures/guild.ts";
import { Channel } from "../structures/channel.ts";
import { delay } from "https://deno.land/std@0.50.0/async/delay.ts";

export interface CacheData {
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  unavailableGuilds: Collection<string, number>;
}

export const cache: CacheData = {
  guilds: new Collection(),
  channels: new Collection(),
  messages: new Collection(),
  unavailableGuilds: new Collection(),
};

async function cleanMessageCache() {
  // Find all messages for each channel and if more than 100 we need to remove the oldest messages.
  const messagesPerChannel = new Map<string, Message[]>();

  for (const message of cache.messages.values()) {
    if (
      // If the guild isn't in cache the message is useless to cache
      (message.guildID && !cache.guilds.has(message.guildID)) ||
      // If the channel isn't in cache the message is useless in cache
      !cache.channels.has(message.channelID)
    ) {
      cache.messages.delete(message.id);
    }

    const channel = messagesPerChannel.get(message.channelID);
    if (!channel) {
      messagesPerChannel.set(message.channelID, [message]);
    } else {
      channel.push(message);
    }
  }

  messagesPerChannel.forEach((messages) => {
    if (messages.length < 100) return;

    // This channel has more than 100 messages in cache. Delete the oldest
    const sortedMessages = messages.sort((a, b) => b.timestamp - a.timestamp);

    sortedMessages.slice(100).forEach((message) =>
      cache.messages.delete(message.id)
    );
  });

  // Check once per minute
  await delay(60000);
  cleanMessageCache();
}

cleanMessageCache();
