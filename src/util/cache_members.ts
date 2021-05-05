import { cacheHandlers } from "../cache.ts";
import { structures } from "../structures/mod.ts";
import { GuildMemberWithUser } from "../types/guilds/guild_member.ts";

const memberQueue = new Map<string, GuildMemberWithUser[]>();

export async function cacheMembers(
  guildId: bigint,
  members: GuildMemberWithUser[],
) {
  return Promise.allSettled(
    members.map((member) => {
      const queue = memberQueue.get(member.user.id);

      if (queue) return queue.push(member);

      memberQueue.set(member.user.id, [member]);
      return startQueue(guildId, member.user.id);
    }),
  );
}

async function startQueue(guildId: bigint, memberId: string) {
  const queue = memberQueue.get(memberId);
  if (!queue) return;

  while (queue.length) {
    const discordenoMember = await structures.createDiscordenoMember(
      queue.shift()!,
      guildId,
    );

    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
  }
}
