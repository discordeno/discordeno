import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMember } from "../../types/members/guild_member.ts";
import type { Message } from "../../types/messages/message.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleMessageCreate(data: DiscordGatewayPayload) {
  const payload = data.d as Message;
  const channel = await cacheHandlers.get("channels", snowflakeToBigint(payload.channelId));
  if (channel) channel.lastMessageId = snowflakeToBigint(payload.id);

  const guildId = payload.guildId ? snowflakeToBigint(payload.guildId) : undefined;

  const discordenoMember = await structures.createDiscordenoMember(
    payload.author,
    guildId ? { member: payload.member! as GuildMember, guildId } : undefined
  );
  await cacheHandlers.set("members", discordenoMember.id, discordenoMember);

  // TODO: maybe cache mentioned members too when in dm?
  if (payload.mentions && guildId) {
    await Promise.all(
      payload.mentions.map(async (mention) => {
        // Cache the member if its a valid member
        if (mention.member) {
          const discordenoMember = await structures.createDiscordenoMember(mention, {
            member: mention.member as GuildMember,
            guildId,
          });

          return cacheHandlers.set("members", snowflakeToBigint(mention.id), discordenoMember);
        }
      })
    );
  }

  const message = await structures.createDiscordenoMessage(data.d as Message);
  // Cache the message
  await cacheHandlers.set("messages", snowflakeToBigint(payload.id), message);

  eventHandlers.messageCreate?.(message);
}
