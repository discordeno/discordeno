import { DiscordOverwrite } from "../../types/channels/overwrite.ts";
import { DiscordBitwisePermissionFlags } from "../../types/permissions/bitwise_permission_flags.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildId: bigint,
  id: bigint,
  overwrites: DiscordOverwrite[],
  permissions: PermissionStrings[],
) {
  const overwrite =
    overwrites.find((perm) => snowflakeToBigint(perm.id) === id) ||
    overwrites.find((perm) => snowflakeToBigint(perm.id) === guildId);

  return permissions.every((perm) => {
    if (overwrite) {
      const allowBits = overwrite.allow;
      const denyBits = overwrite.deny;
      if (
        BigInt(denyBits) & BigInt(DiscordBitwisePermissionFlags[perm])
      ) {
        return false;
      }
      if (
        BigInt(allowBits) & BigInt(DiscordBitwisePermissionFlags[perm])
      ) {
        return true;
      }
    }
    return false;
  });
}
