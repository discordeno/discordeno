import { DiscordPayload, GuildMemberChunkPayload } from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleGuildMembersChunk(data: DiscordPayload) {
  const payload = data.d as GuildMemberChunkPayload;

  const members = await Promise.all(
    payload.members.map(async (member) => {
      const memberStruct = await structures.createMemberStruct(
        member,
        payload.guild_id,
      );
      await cacheHandlers.set("members", memberStruct.id, memberStruct);

      return memberStruct;
    }),
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
