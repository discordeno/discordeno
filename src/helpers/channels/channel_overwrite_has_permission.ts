/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export function channelOverwriteHasPermission(
  guildID: string,
  id: string,
  overwrites: RawOverwrite[],
  permissions: Permission[],
) {
  const overwrite = overwrites.find((perm) => perm.id === id) ||
    overwrites.find((perm) => perm.id === guildID);

  return permissions.every((perm) => {
    if (overwrite) {
      const allowBits = overwrite.allow;
      const denyBits = overwrite.deny;
      if (BigInt(denyBits) & BigInt(Permissions[perm])) return false;
      if (BigInt(allowBits) & BigInt(Permissions[perm])) return true;
    }
    return false;
  });
}
