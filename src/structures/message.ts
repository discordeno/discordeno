import { MessageCreateOptions } from "../types/message.ts";
import { cache } from "../utils/cache.ts";

export function createMessage(data: MessageCreateOptions) {
  const {
    guild_id: guildID,
    channel_id: channelID,
    mentions_everyone: mentionsEveryone,
    mention_channels: mentionChannels,
    mention_roles: mentionRoles,
    webhook_id: webhookID,
    message_reference: messageReference,
    edited_timestamp: editedTimestamp,
    ...rest
  } = data;

  const message = {
    ...rest,
    channelID,
    guildID: guildID || "",
    mentionsEveryone,
    mentionRoles,
    mentionChannels: mentionChannels || [],
    webhookID,
    messageReference,
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    channel: cache.channels.get(data.channel_id)!,
    guild: () => data.guild_id ? cache.guilds.get(data.guild_id) : undefined,
    member: () => message.guild()?.members.get(data.author.id),
    mentions: () =>
      data.mentions.map((mention) =>
        message.guild()?.members.get(mention.id)! ||
        cache.guilds.find((g) => g.members.has(mention.id))?.members.get(
          mention.id,
        )
      ),
  };

  // Add guildID when not sent by Discord.
  if (!message.guildID) {
    if (message.channel.guildID) message.guildID = message.channel.guildID;
  }

  return message;
}

export interface Message extends ReturnType<typeof createMessage> {}
