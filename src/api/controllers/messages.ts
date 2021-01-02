import { eventHandlers } from "../../bot.ts";
import {
  DiscordPayload,
  MessageCreateOptions,
  MessageDeleteBulkPayload,
  MessageDeletePayload,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageCreate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_CREATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (channel) channel.lastMessageID = payload.id;

  const guild = payload.guild_id
    ? await cacheHandlers.get("guilds", payload.guild_id)
    : undefined;

  if (payload.member && guild) {
    // If in a guild cache the author as a member
    await structures.createMember(
      { ...payload.member, user: payload.author },
      guild.id,
    );
  }

  payload.mentions.forEach((mention) => {
    // Cache the member if its a valid member
    if (mention.member && guild) {
      structures.createMember(
        { ...mention.member, user: mention },
        guild.id,
      );
    }
  });

  const message = await structures.createMessage(payload);
  // Cache the message
  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageCreate?.(message);
}

export async function handleInternalMessageDelete(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE") return;

  const payload = data.d as MessageDeletePayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  eventHandlers.messageDelete?.(
    { id: payload.id, channel },
    await cacheHandlers.get("messages", payload.id),
  );

  await cacheHandlers.delete("messages", payload.id);
}

export async function handleInternalMessageDeleteBulk(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE_BULK") return;

  const payload = data.d as MessageDeleteBulkPayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  return Promise.all(payload.ids.map(async (id) => {
    eventHandlers.messageDelete?.(
      { id, channel },
      await cacheHandlers.get("messages", id),
    );
    await cacheHandlers.delete("messages", id);
  }));
}

export async function handleInternalMessageUpdate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_UPDATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  const cachedMessage = await cacheHandlers.get("messages", payload.id);
  if (!cachedMessage) return;

  cachedMessage.content = payload.content;

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
