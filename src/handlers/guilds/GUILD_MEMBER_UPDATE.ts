import { eventHandlers } from "../../bot.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleGuildMemberUpdate(data: DiscordPayload) {
  const payload = data.d as GuildMemberUpdatePayload;
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

  if (guildMember?.nick !== payload.nick) {
    eventHandlers.nicknameUpdate?.(
      guild,
      memberStruct,
      payload.nick,
      guildMember?.nick,
    );
  }

  if (payload.pending === false && guildMember?.pending === true) {
    eventHandlers.membershipScreeningPassed?.(guild, memberStruct);
  }

  const roleIDs = guildMember?.roles || [];

  roleIDs.forEach((id) => {
    if (!payload.roles.includes(id)) {
      eventHandlers.roleLost?.(guild, memberStruct, id);
    }
  });

  payload.roles.forEach((id) => {
    if (!roleIDs.includes(id)) {
      eventHandlers.roleGained?.(guild, memberStruct, id);
    }
  });

  eventHandlers.guildMemberUpdate?.(guild, memberStruct, cachedMember);
}
