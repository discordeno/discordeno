import { MessageCreateOptions } from "../types/message.ts";
import { Unpromise } from "../types/misc.ts";

export async function createMessage(data: MessageCreateOptions) {
  const {
    guild_id: guildID,
    channel_id: channelID,
    mentions_everyone: mentionsEveryone,
    mention_channels: mentionChannels,
    mention_roles: mentionRoles,
    webhook_id: webhookID,
    message_reference: messageReference,
    edited_timestamp: editedTimestamp,
    referenced_message: referencedMessageID,
    ...rest
  } = data;

  const message = {
    ...rest,
    /** The message id of the original message if this message was sent as a reply. If null, the original message was deleted. */
    referencedMessageID,
    channelID,
    guildID: guildID || "",
    mentions: data.mentions.map((m) => m.id),
    mentionsEveryone,
    mentionRoles,
    mentionChannels: mentionChannels || [],
    webhookID,
    messageReference,
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: editedTimestamp ? Date.parse(editedTimestamp) : undefined,
  };

  return message;
}

export interface Message extends Unpromise<ReturnType<typeof createMessage>> {}
