import { cache, cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMembersChunk } from "../../types/members/guild_members_chunk.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildMembersChunk(data: DiscordGatewayPayload) {
  const payload = data.d as GuildMembersChunk;

  const guildId = snowflakeToBigint(payload.guildId);

  const members = await Promise.all(
    payload.members.map(async (member) => {
      const discordenoMember = await structures.createDiscordenoMember(member, guildId);
      await cacheHandlers.set("members", discordenoMember.id, discordenoMember);

      return discordenoMember;
    })
  );

  // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
  if (payload.nonce) {
    const resolve = cache.fetchAllMembersProcessingRequests.get(payload.nonce);
    if (!resolve) return;

    if (payload.chunkIndex + 1 === payload.chunkCount) {
      cache.fetchAllMembersProcessingRequests.delete(payload.nonce);
      // Only 1 chunk most likely is all members or users only request a small amount of users
      if (payload.chunkCount === 1) {
        return resolve(new Collection(members.map((m) => [m.id, m])));
      }

      return resolve(await cacheHandlers.filter("GET_MEMBERS_IN_GUILD", { guildId }));
    }
  }
}
