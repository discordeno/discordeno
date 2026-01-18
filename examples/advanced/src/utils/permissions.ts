import assert from 'node:assert';
import { BitwisePermissionFlags } from '@discordeno/bot';
import type { bot } from '../bot.js';

export async function calculateMemberPermissions(
  guild: typeof bot.transformers.$inferredTypes.guild | typeof bot.cache.$inferredTypes.guild,
  member: typeof bot.transformers.$inferredTypes.member,
) {
  if (member.id === guild.ownerId) return 8n;

  let permissions = guild.roles?.get(guild.id)?.permissions.bitfield;
  const rolePerms = member.roles.map((x) => guild.roles?.get(x)?.permissions.bitfield).filter((x): x is bigint => x !== undefined);

  // Small hack to avoid calling assert with 0n
  if (permissions === undefined) assert(permissions);

  for (const rolePerm of rolePerms) {
    permissions |= rolePerm;
  }

  if ((permissions & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) === BigInt(BitwisePermissionFlags.ADMINISTRATOR)) return 8n;

  return permissions;
}
