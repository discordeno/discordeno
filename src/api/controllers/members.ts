import { eventHandlers } from "../../bot.ts";
import {
  DiscordPayload,
  GuildBanPayload,
  GuildMemberAddPayload,
  GuildMemberChunkPayload,
  GuildMemberUpdatePayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildMemberAdd(data: DiscordPayload) {
  if (data.t !== "GUILD_MEMBER_ADD") return;

  const payload = data.d as GuildMemberAddPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  guild.memberCount++;
  const member = await structures.createMember(
    payload,
    payload.guild_id,
  );

  eventHandlers.guildMemberAdd?.(guild, member);
}

export async function handleInternalGuildMemberRemove(data: DiscordPayload) {
  if (data.t !== "GUILD_MEMBER_REMOVE") return;

  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  guild.memberCount--;
  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildMemberRemove?.(guild, payload.user, member);

  member?.guilds.delete(guild.id);
  if (member && !member.guilds.size) {
    await cacheHandlers.delete("members", member.id);
  }
}

export async function handleInternalGuildMemberUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_MEMBER_UPDATE") return;

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
  const member = await structures.createMember(
    newMemberData,
    payload.guild_id,
  );

  await cacheHandlers.set("members", member.id, member);

  if (guildMember?.nick !== payload.nick) {
    eventHandlers.nicknameUpdate?.(
      guild,
      member,
      payload.nick,
      guildMember?.nick,
    );
  }

  if (guildMember?.pending === false && cachedMember?.pending) {
    eventHandlers.membershipScreeningPassed?.(guild, member);
  }

  const roleIDs = guildMember?.roles || [];

  roleIDs.forEach((id) => {
    if (!payload.roles.includes(id)) {
      eventHandlers.roleLost?.(guild, member, id);
    }
  });

  payload.roles.forEach((id) => {
    if (!roleIDs.includes(id)) {
      eventHandlers.roleGained?.(guild, member, id);
    }
  });

  eventHandlers.guildMemberUpdate?.(guild, member, cachedMember);
}

export async function handleInternalGuildMembersChunk(data: DiscordPayload) {
  if (data.t !== "GUILD_MEMBERS_CHUNK") return;

  const payload = data.d as GuildMemberChunkPayload;

  const members = await Promise.all(
    payload.members.map((member) =>
      structures.createMember(member, payload.guild_id)
    ),
  );

  // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
  if (
    payload.nonce
  ) {
    const resolve = cache.fetchAllMembersProcessingRequests.get(payload.nonce);
    if (!resolve) return;

    if (payload.chunk_index + 1 === payload.chunk_count) {
      cache.fetchAllMembersProcessingRequests.delete(payload.nonce);
      // Only 1 chunk most likely is all members or users only request a small amount of users
      if (payload.chunk_count === 1) {
        return resolve(new Collection(members.map((m) => [m.id, m])));
      }

      return resolve(
        await cacheHandlers.filter(
          "members",
          (m) => m.guilds.has(payload.guild_id),
        ),
      );
    }
  }
}
