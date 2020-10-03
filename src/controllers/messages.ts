import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import type { DiscordPayload } from "../types/discord.ts";
import type {
  MessageCreateOptions,
  MessageDeleteBulkPayload,
  MessageDeletePayload,
} from "../types/message.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageCreate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_CREATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (channel) channel.lastMessageID = payload.id;

  const message = await structures.createMessage(payload);
  // Cache the message
  cacheHandlers.set("messages", payload.id, message);
  const guild = payload.guild_id
    ? await cacheHandlers.get("guilds", payload.guild_id)
    : undefined;

  if (payload.member) {
    // If in a guild cache the author as a member
    guild?.members.set(
      payload.author.id,
      await structures.createMember(
        { ...payload.member, user: payload.author },
        guild.id,
      ),
    );
  }

  payload.mentions.forEach(async (mention) => {
    // Cache the member if its a valid member
    if (mention.member) {
      guild?.members.set(
        mention.id,
        await structures.createMember(
          { ...mention.member, user: mention },
          guild.id,
        ),
      );
    }
  });

  eventHandlers.messageCreate?.(message);
}

export async function handleInternalMessageDelete(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE") return;

  const payload = data.d as MessageDeletePayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  eventHandlers.messageDelete?.(
    await cacheHandlers.get("messages", payload.id) ||
      { id: payload.id, channel },
  );

  cacheHandlers.delete("messages", payload.id);
}

export async function handleInternalMessageDeleteBulk(data: DiscordPayload) {
  if (data.t !== "MESSAGE_DELETE_BULK") return;

  const payload = data.d as MessageDeleteBulkPayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  payload.ids.forEach(async (id) => {
    eventHandlers.messageDelete?.(
      await cacheHandlers.get("messages", id) || { id, channel },
    );
    cacheHandlers.delete("messages", id);
  });
}

export async function handleInternalMessageUpdate(data: DiscordPayload) {
  if (data.t !== "MESSAGE_UPDATE") return;

  const payload = data.d as MessageCreateOptions;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  const cachedMessage = await cacheHandlers.get("messages", payload.id);
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
