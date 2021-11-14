import { separateOverwrites } from "../../transformers/channel.ts";
import type { DiscordOverwrite } from "../../types/channels/overwrite.ts";
import { BitwisePermissionFlags } from "../../types/permissions/bitwisePermissionFlags.ts";
import type { PermissionStrings } from "../../types/permissions/permissionStrings.ts";

/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildId: bigint,
  id: bigint,
  overwrites: bigint[],
  permissions: PermissionStrings[]
) {
  const overwrite =
    overwrites.find((perm) => {
      const [_, bitID] = separateOverwrites(perm);
      return id === bitID;
    }) ||
    overwrites.find((perm) => {
      const [_, bitID] = separateOverwrites(perm);
      return bitID === guildId;
    });

  if (!overwrite) return false;

  return permissions.every((perm) => {
    const [type, id, allowBits, denyBits] = separateOverwrites(overwrite);
    if (BigInt(denyBits) & BigInt(BitwisePermissionFlags[perm])) {
      return false;
    }
    if (BigInt(allowBits) & BigInt(BitwisePermissionFlags[perm])) {
      return true;
    }
  });
}
