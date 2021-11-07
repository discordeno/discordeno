import { separate } from "../../transformers/channel.ts";
import type { DiscordOverwrite } from "../../types/channels/overwrite.ts";
import { DiscordBitwisePermissionFlags } from "../../types/permissions/bitwise_permission_flags.ts";
import type { PermissionStrings } from "../../types/permissions/permission_strings.ts";

/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildId: bigint,
  id: bigint,
  overwrites: bigint[],
  permissions: PermissionStrings[]
) {
  const overwrite =
    overwrites.find((perm) => {
      const [_, bitID] = separate(perm);
      return id === bitID;
    }) ||
    overwrites.find((perm) => {
      const [_, bitID] = separate(perm);
      return bitID === guildId;
    });

  if (!overwrite) return false;

  return permissions.every((perm) => {
    const [type, id, allowBits, denyBits] = separate(overwrite);
    if (BigInt(denyBits) & BigInt(DiscordBitwisePermissionFlags[perm])) {
      return false;
    }
    if (BigInt(allowBits) & BigInt(DiscordBitwisePermissionFlags[perm])) {
      return true;
    }
  });
}
