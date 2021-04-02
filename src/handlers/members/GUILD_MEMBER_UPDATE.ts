import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";

export async function handleGuildMemberUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildMemberUpdate;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedMember = await cacheHandlers.get("members", payload.user.id);
  const guildMember = cachedMember?.guilds.get(payload.guild_id);

  const newMemberData = {
    ...payload,
    // deno-lint-ignore camelcase
    premium_since: payload.premium_since || undefined,
    // deno-lint-ignore camelcase
    joined_at: new Date(guildMember?.joinedAt || Date.now())
      .toISOString(),
    deaf: guildMember?.deaf || false,
    mute: guildMember?.mute || false,
    roles: payload.roles,
  };
  const memberStruct = await structures.createMemberStruct(
    newMemberData,
    payload.guild_id,
  );
  await cacheHandlers.set("members", memberStruct.id, memberStruct);

  if (guildMember) {
    if (guildMember.nick !== payload.nick) {
      eventHandlers.nicknameUpdate?.(
        guild,
        memberStruct,
        payload.nick!,
        guildMember.nick,
      );
    }

    if (payload.pending === false && guildMember.pending === true) {
      eventHandlers.membershipScreeningPassed?.(guild, memberStruct);
    }

    const roleIds = guildMember?.roles || [];

    roleIds.forEach((id) => {
      if (!payload.roles.includes(id)) {
        eventHandlers.roleLost?.(guild, memberStruct, id);
      }
    });

    payload.roles.forEach((id) => {
      if (!roleIds.includes(id)) {
        eventHandlers.roleGained?.(guild, memberStruct, id);
      }
    });
  }

  eventHandlers.guildMemberUpdate?.(guild, memberStruct, cachedMember);
}
