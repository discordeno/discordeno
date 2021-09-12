import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { createDiscordenoMessage, DiscordenoMessage } from "../../structures/message.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { BigInteraction, Interaction } from "../../types/interactions/interaction.ts";
import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const basePayload = data.d as Interaction;

  const payload = {
    ...basePayload,
    id: snowflakeToBigint(basePayload.id),
    applicationId: snowflakeToBigint(basePayload.applicationId),
    guildId: basePayload.guildId ? snowflakeToBigint(basePayload.guildId) : undefined,
    channelId: basePayload.channelId ? snowflakeToBigint(basePayload.channelId) : undefined,
    member: basePayload.member
      ? {
          ...basePayload.member,
          roles: basePayload.member.roles.map((id) => snowflakeToBigint(id)),
          user: {
            ...basePayload.member.user,
            id: snowflakeToBigint(basePayload.member.user.id),
          },
        }
      : undefined,
    user: basePayload.user
      ? {
          ...basePayload.user,
          id: snowflakeToBigint(basePayload.user.id),
        }
      : undefined,
    message: basePayload.message ? createDiscordenoMessage(basePayload.message) : undefined,
  } as BigInteraction;

  if (payload.member) payload.user = payload.member.user;

  const discordenoMember = payload.guildId
    ? await structures.createDiscordenoMember(payload.member as GuildMemberWithUser, payload.guildId)
    : undefined;

  if (discordenoMember) {
    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
    eventHandlers.interactionGuildCreate?.(payload, discordenoMember);
  } else {
    eventHandlers.interactionDMCreate?.(payload);
  }

  eventHandlers.interactionCreate?.(payload, discordenoMember);
}
