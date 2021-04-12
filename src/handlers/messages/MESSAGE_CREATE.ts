import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { GuildMemberWithUser } from "../../types/guilds/guild_member.ts";
import { DiscordMessage, Message } from "../../types/messages/message.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export async function handleMessageCreate(data: DiscordGatewayPayload) {
  const payload: Message = snakeKeysToCamelCase(data.d as DiscordMessage);
  const channel = await cacheHandlers.get("channels", payload.channelId);
  if (channel) channel.lastMessageId = payload.id;

  const guild = payload.guildId
    ? await cacheHandlers.get("guilds", payload.guildId)
    : undefined;

  if (payload.member && guild) {
    // If in a guild cache the author as a member
    const discordenoMember = await structures.createDiscordenoMember(
      { ...payload.member, user: payload.author } as GuildMemberWithUser,
      guild.id,
    );
    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
  }

  await Promise.all(payload.mentions.map(async (mention) => {
    // Cache the member if its a valid member
    if (mention.member && guild) {
      const discordenoMember = await structures.createDiscordenoMember(
        { ...mention.member, user: mention },
        guild.id,
      );

      return cacheHandlers.set(
        "members",
        discordenoMember.id,
        discordenoMember,
      );
    }
  }));

  const message = await structures.createDiscordenoMessage(payload);
  // Cache the message
  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageCreate?.(message);
}
