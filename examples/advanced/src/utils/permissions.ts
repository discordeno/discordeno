import { BitwisePermissionFlags, type Guild, type Member } from '@discordeno/bot'
import assert from 'node:assert'

export async function calculateMemberPermissions(guild: Guild, member: Member): Promise<bigint> {
  if (member.id === guild.ownerId) return 8n

  let permissions = guild.roles.get(guild.id)?.permissions.bitfield
  const rolePerms = member.roles.map((x) => guild.roles.get(x)?.permissions.bitfield).filter((x): x is bigint => x !== undefined)

  // Small hack to avoid calling assert with 0n
  if (permissions === undefined) assert(permissions)

  for (const rolePerm of rolePerms) {
    permissions |= rolePerm
  }

  if ((permissions & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) === BigInt(BitwisePermissionFlags.ADMINISTRATOR)) return 8n

  return permissions
}
