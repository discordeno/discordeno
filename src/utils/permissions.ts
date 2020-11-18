import { cacheHandlers } from "../controllers/cache.ts";
import { botID } from "../module/client.ts";
import { Guild } from "../structures/guild.ts";
import { Role } from "../structures/role.ts";
import { RawOverwrite } from "../types/guild.ts";
import { Permission, Permissions } from "../types/permission.ts";

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export async function memberIDHasPermission(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return false;

  if (memberID === guild.ownerID) return true;

  const member = guild.members.get(memberID);
  if (!member) return false;

  return memberHasPermission(member.guildID, guild, member.roles, permissions);
}

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export function memberHasPermission(
  memberID: string,
  guild: Guild,
  memberRoleIDs: string[],
  permissions: Permission[],
) {
  if (memberID === guild.ownerID) return true;

  const permissionBits = memberRoleIDs.map((id) =>
    guild.roles.get(id)?.permissions
  )
    // Removes any edge case undefined
    .filter((id) => id)
    .reduce((bits, permissions) => {
      bits |= BigInt(permissions);
      return bits;
    }, BigInt(0));

  if (permissionBits & BigInt(Permissions.ADMINISTRATOR)) return true;

  return permissions.every((permission) =>
    permissionBits & BigInt(Permissions[permission])
  );
}

export async function botHasPermission(
  guildID: string,
  permissions: Permissions[],
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return false;

  // Check if the bot is the owner of the guild, if it is, returns true
  if (guild.ownerID === botID) return true;

  const member = guild.members.get(botID);
  if (!member) return false;

  // The everyone role is not in member.roles
  const permissionBits = [...member.roles, guild.id]
    .map((id) => guild.roles.get(id)!)
    // Remove any edge case undefined
    .filter((r) => r)
    .reduce((bits, data) => {
      bits |= BigInt(data.permissions);

      return bits;
    }, BigInt(0));

  if (permissionBits & BigInt(Permissions.ADMINISTRATOR)) return true;

  return permissions.every((permission) => permissionBits & BigInt(permission));
}

/** Checks if the bot has the permissions in a channel */
export function botHasChannelPermissions(
  channelID: string,
  permissions: Permissions[],
) {
  return hasChannelPermissions(channelID, botID, permissions);
}

/** Checks if a user has permissions in a channel. */
export async function hasChannelPermissions(
  channelID: string,
  memberID: string,
  permissions: Permissions[],
) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel) return false;
  if (!channel.guildID) return true;

  const guild = await cacheHandlers.get("guilds", channel.guildID);
  if (!guild) return false;

  if (guild.ownerID === memberID) return true;
  if (
    await memberIDHasPermission(memberID, guild.id, ["ADMINISTRATOR"])
  ) {
    return true;
  }

  const member = guild.members.get(memberID);
  if (!member) return false;

  let memberOverwrite: RawOverwrite | undefined;
  let everyoneOverwrite: RawOverwrite | undefined;
  let rolesOverwrites: RawOverwrite[] = [];

  for (const overwrite of channel.permission_overwrites || []) {
    // If the overwrite on this channel is specific to this member
    if (overwrite.id === memberID) memberOverwrite = overwrite;
    // If it is the everyone role overwrite
    if (overwrite.id === guild.id) everyoneOverwrite = overwrite;
    // If it is one of the roles the member has
    if (member.roles.includes(overwrite.id)) rolesOverwrites.push(overwrite);
  }

  const allowedPermissions = new Set<Permissions>();

  // Member perms override everything so we must check them first
  if (memberOverwrite) {
    for (const perm of permissions) {
      // One of the necessary permissions is denied. Since this is main permission we can cancel if its denied.
      if (BigInt(memberOverwrite.deny) & BigInt(perm)) return false;
      // Already allowed perm
      if (allowedPermissions.has(perm)) continue;
      // This perm is allowed so we save it
      if (BigInt(memberOverwrite.allow) & BigInt(perm)) {
        allowedPermissions.add(perm);
      }
    }
  }

  // Check the necessary permissions for roles
  for (const perm of permissions) {
    // If this is already allowed, skip
    if (allowedPermissions.has(perm)) continue;

    for (const overwrite of rolesOverwrites) {
      // This perm is allowed so we save it
      if (BigInt(overwrite.allow) & BigInt(perm)) {
        allowedPermissions.add(perm);
        break;
      }

      // If this role denies it we need to save and check if another role allows it, allows > deny
      if (BigInt(overwrite.deny) & BigInt(perm)) {
        // This role denies his perm, but before denying we need to check all other roles if any allow as allow > deny
        const isAllowed = rolesOverwrites.some((o) =>
          BigInt(o.allow) & BigInt(perm)
        );
        if (isAllowed) continue;
        // This permission is in fact denied. Since Roles overrule everything below here we can cancel ou here
        return false;
      }
    }
  }

  if (everyoneOverwrite) {
    for (const perm of permissions) {
      // Already allowed perm
      if (allowedPermissions.has(perm)) continue;
      // One of the necessary permissions is denied. Since everyone overwrite overrides role perms we can cancel here
      if (BigInt(everyoneOverwrite.deny) & BigInt(perm)) return false;
      // This perm is allowed so we save it
      if (BigInt(everyoneOverwrite.allow) & BigInt(perm)) {
        allowedPermissions.add(perm);
      }
    }
  }

  // Is there any remaining permission to check role perms or can we determine that permissions are allowed
  if (permissions.every((perm) => allowedPermissions.has(perm))) return true;

  // Some permission was not explicitly allowed so we default to checking role perms directly
  const hasPerms = await botHasPermission(guild.id, permissions);
  return hasPerms;
}

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(Permissions).filter((perm) => {
    if (typeof perm !== "number") return false;
    return permissionBits & BigInt(Permissions[perm as Permission]);
  }) as Permission[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: Permission[]) {
  return permissions.reduce(
    (bits, perm) => bits |= BigInt(Permissions[perm]),
    BigInt(0),
  ).toString();
}

export async function highestRole(guildID: string, memberID: string) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  const member = guild?.members.get(memberID);
  if (!member) return;

  let memberHighestRole: Role | undefined;

  for (const roleID of member.roles) {
    const role = guild.roles.get(roleID);
    if (!role) continue;

    if (
      !memberHighestRole || memberHighestRole.position < role.position
    ) {
      memberHighestRole = role;
    }
  }

  return memberHighestRole || (guild.roles.get(guild.id) as Role);
}

export async function higherRolePosition(
  guildID: string,
  roleID: string,
  otherRoleID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  const role = guild.roles.get(roleID);
  const otherRole = guild.roles.get(otherRoleID);
  if (!role || !otherRole) return;

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id;
  }

  return role.position > otherRole.position;
}
