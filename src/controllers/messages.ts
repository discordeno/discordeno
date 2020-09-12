import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import { DiscordPayload } from "../types/discord.ts";
import {
  MessageCreateOptions,
  MessageDeletePayload,
  MessageDeleteBulkPayload,
} from "../types/message.ts";
import { cache } from "../utils/cache.ts";

export function handleInternalMessageCreate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_CREATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = cache.channels.get(payload.channel_id);
  if (channel) channel.lastMessageID = payload.id;

  const message = structures.createMessage(payload);
  // Cache the message
  cache.messages.set(payload.id, message);
  const guild = payload.guild_id
    ? cache.guilds.get(payload.guild_id)
    : undefined;

  if (payload.member) {
    // If in a guild cache the author as a member
    guild?.members.set(
      payload.author.id,
      structures.createMember(
        { ...payload.member, user: payload.author },
        guild,
      ),
    );
  }

  payload.mentions.forEach((mention) => {
    // Cache the member if its a valid member
    if (mention.member) {
      guild?.members.set(
        mention.id,
        structures.createMember(
          { ...mention.member, user: mention },
          guild,
        ),
      );
    }
  });

  eventHandlers.messageCreate?.(message);
}

export function handleInternalMessageDelete(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE") return;

  const payload = data.d as MessageDeletePayload;
  const channel = cache.channels.get(payload.channel_id);
  if (!channel) return;

  eventHandlers.messageDelete?.(
    cache.messages.get(payload.id) || { id: payload.id, channel },
  );

  cache.messages.delete(payload.id);
}

export function handleInternalMessageDeleteBulk(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE_BULK") return;

  const payload = data.d as MessageDeleteBulkPayload;
  const channel = cache.channels.get(payload.channel_id);
  if (!channel) return;

  payload.ids.forEach((id) => {
    eventHandlers.messageDelete?.(cache.messages.get(id) || { id, channel });
    cache.messages.delete(id);
  });
}

export function handleInternalMessageUpdate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_UPDATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = cache.channels.get(payload.channel_id);
  if (!channel) return;

  const cachedMessage = cache.messages.get(payload.id);
  if (!cachedMessage) return;

  const oldMessage = {
    attachments: cachedMessage.attachments,
    content: cachedMessage.content,
    embeds: cachedMessage.embeds,
    editedTimestamp: cachedMessage.editedTimestamp,
    tts: cachedMessage.tts,
    pinned: cachedMessage.pinned,
  };

  // Messages with embeds can trigger update but they wont have edited_timestamp
  if (
    !payload.edited_timestamp ||
    (cachedMessage.content !== payload.content)
  ) {
    return;
  }

  eventHandlers.messageUpdate?.(cachedMessage, oldMessage);
}
