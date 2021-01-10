import { snakeKeysToCamelCase } from "../../../mod.ts";
import { eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  MessageDeleteBulkEventPayload,
  MessageDeleteEventPayload,
  MessagePayload,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageCreate(data: GatewayPayload) {
  if (data.t !== "MESSAGE_CREATE") return;

  const payload = data.d as MessagePayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (channel) channel.lastMessageID = payload.id;

  const guild = payload.guild_id
    ? await cacheHandlers.get("guilds", payload.guild_id)
    : undefined;

  if (payload.member && guild) {
    // If in a guild cache the author as a member
    await structures.createMember(
      {
        ...payload.member,
        nick: payload.member.nick === undefined ? null : payload.member.nick,
        roles: payload.member.roles || [],
        joined_at: payload.member.joined_at || "",
        deaf: payload.member.deaf || false,
        mute: payload.member.mute || false,
        user: payload.author,
      },
      guild.id,
    );
  }

  payload.mentions.forEach((mention) => {
    // Cache the member if its a valid member
    if (mention && guild) {
      structures.createMember(
        {
          nick: mention.nick === undefined ? null : mention.nick,
          roles: mention.roles || [],
          joined_at: mention.joined_at || "",
          deaf: mention.deaf || false,
          mute: mention.mute || false,
          user: mention,
        },
        guild.id,
      );
    }
  });

  const message = await structures.createMessage(payload);
  // Cache the message
  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageCreate?.(message);
}

export async function handleInternalMessageDelete(data: GatewayPayload) {
  if (data.t !== "MESSAGE_DELETE") return;

  const payload = data.d as MessageDeleteEventPayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  eventHandlers.messageDelete?.(
    { id: payload.id, channel },
    await cacheHandlers.get("messages", payload.id),
  );

  await cacheHandlers.delete("messages", payload.id);
}

export async function handleInternalMessageDeleteBulk(data: GatewayPayload) {
  if (data.t !== "MESSAGE_DELETE_BULK") return;

  const payload = data.d as MessageDeleteBulkEventPayload;
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

export async function handleInternalMessageUpdate(data: GatewayPayload) {
  if (data.t !== "MESSAGE_UPDATE") return;

  const payload = data.d as MessagePayload;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  const cachedMessage = await cacheHandlers.get("messages", payload.id);
  if (!cachedMessage) return;

  const oldMessage = {
    attachments: snakeKeysToCamelCase(cachedMessage.attachments),
    content: cachedMessage.content,
    embeds: snakeKeysToCamelCase(cachedMessage.embeds),
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
