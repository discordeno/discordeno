import { MessageCreateOptions } from "../types/message.ts";
import { cache } from "../utils/cache.ts";

export function createMessage(data: MessageCreateOptions) {
  const message = {
    ...data,
    channelID: data.channel_id,
    guildID: data.guild_id,
    mentionsEveryone: data.mentions_everyone,
    mentionRoles: data.mention_roles,
    mentionChannels: data.mention_channels,
    webhookID: data.webhook_id,
    messageReference: data.message_reference,
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: data.edited_timestamp
      ? Date.parse(data.edited_timestamp)
      : undefined,
    channel: cache.channels.get(data.channel_id)!,
    guild: () => data.guild_id ? cache.guilds.get(data.guild_id) : undefined,
    member: () => message.guild()?.members.get(data.author.id),
    mentions: () =>
      data.mentions.map((mention) => message.guild()?.members.get(mention.id)!),
  };

  // Remove excess properties to preserve cache.
  delete message.channel_id;
  delete message.guild_id;
  delete message.mentions_everyone;
  delete message.mention_channels;
  delete message.mention_roles;
  delete message.webhook_id;
  delete message.message_reference;
  delete message.edited_timestamp;

  return message;
}

export interface Message extends
  Omit<
    ReturnType<typeof createMessage>,
    | "channel_id"
    | "guild_id"
    | "mentions_everyone"
    | "mention_channels"
    | "mention_roles"
    | "webhook_id"
    | "message_reference"
    | "edited_timestamp"
  > {}
