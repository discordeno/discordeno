import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { GuildMemberWithUser } from "../../types/guilds/guild_member.ts";
import { Message } from "../../types/messages/message.ts";

export async function handleMessageCreate(data: DiscordGatewayPayload) {
  const payload = data.d as Message;
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

  if (payload.mentions) {
    await Promise.all(payload.mentions.map(async (mention) => {
      // Cache the member if its a valid member
      if (mention.member && guild) {
        const discordenoMember = await structures.createDiscordenoMember(
          { ...mention.member, user: mention } as GuildMemberWithUser,
          guild.id,
        );

        return cacheHandlers.set(
          "members",
          mention.id,
          discordenoMember,
        );
      }
    }));
  }

  const message = await structures.createDiscordenoMessage(
    data.d as Message,
  );
  // Cache the message
  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageCreate?.(message);
}
