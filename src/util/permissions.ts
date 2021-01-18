import { cacheHandlers } from "../api/controllers/cache.ts";
import { Role } from "../api/structures/mod.ts";
import { botID } from "../bot.ts";
import { Errors, Permission, Permissions } from "../types/mod.ts";

/** Calculates the permissions this member has in the given guild */
export async function calculateBasePermissions(
  memberID: string,
  guildID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  // If the memberID is equal to the guild ownerID we don't need to calculate anything so we return ADMINISTRATOR permission
  if (guild.ownerID === memberID) return "8";

  const member = await cacheHandlers.get("members", memberID);
  if (!member) throw new Error(Errors.MEMBER_NOT_FOUND);

  let permissions = BigInt(0);
  // Calculate the role permissions bits, @everyone role is not in memberRoleIDs so we need to pass guildID manualy
  permissions |= [
    ...member.guilds.get(guildID)?.roles || [],
    guildID,
  ]
    .map((id) => guild.roles.get(id)?.permissions)
    // Removes any edge case undefined
    .filter((id) => id)
    .reduce((bits, perms) => {
      bits |= BigInt(perms);
      return bits;
    }, BigInt(0));

  // Return the members permission bits as a string
  return permissions.toString();
}

/** calculates the permissions this member has for the given Channel */
export async function calculateChannelOverwrites(
  memberID: string,
  channelID: string,
) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel) throw Error(Errors.CHANNEL_NOT_FOUND);

  // This is a DM channel so return ADMINISTRATOR permission
  if (!channel.guildID) return "8";

  // Get all the role permissions this member already has
  let permissions = BigInt(calculateBasePermissions(memberID, channel.guildID));

  // Member already has ADMINISTRATOR permission and so overwrites are ignored so we return that
  if (permissions & BigInt(Permissions.ADMINISTRATOR)) return "8";

  const member = await cacheHandlers.get("members", memberID);
  if (!member) throw new Error(Errors.MEMBER_NOT_FOUND);

  // First calculate @everyone overwrites since these have the lowest priority
  const overwriteEveryone = channel?.permissionOverwrites.find((overwrite) =>
    overwrite.id === channel.guildID
  );
  if (overwriteEveryone) {
    // First remove denied permissions since denied < allowed
    permissions &= ~BigInt(overwriteEveryone.deny);
    permissions |= BigInt(overwriteEveryone.allow);
  }

  const overwrites = channel?.permissionOverwrites;

  // In order to calculate the role permissions correctly we need to temporarily save the allowed and denied permissions
  let allow = BigInt(0);
  let deny = BigInt(0);
  const memberRoles = member.guilds.get(channel.guildID)?.roles || [];
  // Second calculate members role overwrites since these have middle priority
  for (const overwrite of overwrites) {
    if (!memberRoles.includes(overwrite.id)) continue;

    deny &= ~BigInt(overwrite.deny);
    allow |= BigInt(overwrite.allow);
  }
  // After role overwrite calculate save allowed permissions first we remove denied permissions since "denied < allowed"
  permissions &= ~deny;
  permissions |= allow;

  // Third calculate member specific overwrites since these have the highest priority
  const overwriteMember = overwrites.find((overwrite) =>
    overwrite.id === memberID
  );
  if (overwriteMember) {
    permissions &= ~BigInt(overwriteMember.deny);
    permissions |= BigInt(overwriteMember.allow);
  }

  return permissions.toString();
}

/** Checks if the given permissionBits are matching the given Permission[]. ADMINISTRATOR always returns true */
export function validatePermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  if (BigInt(permissionBits) & BigInt(8)) return true;

  return permissions.every((permission) =>
    // Check if permission is in permissionBits
    BigInt(permissionBits) & BigInt(Permissions[permission])
  );
}

/** Checks if the given member has these permissions in the given guild */
export async function hasRolePermissions(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  // First we need the role permission bits this member has
  const basePermissions = await calculateBasePermissions(memberID, guildID);
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(basePermissions, permissions);
}

/** Checks if the bot has these permissions in the given guild */
export function botHasRolePermissions(
  guildID: string,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasRolePermissions(guildID, botID, permissions);
}

/** Returns the permissions that are not in the given permissionBits */
export function missingPermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  if (BigInt(permissionBits) & BigInt(8)) return [];

  return permissions.filter((permission) =>
    !(BigInt(permissionBits) & BigInt(permission))
  );
}

/** Throws an error if this member has not all of the given permissions */
export async function requireGuildPermissions(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  // First we need the role permissions bits this member has
  const permissionBits = await calculateBasePermissions(memberID, guildID);
  // Second check if the member is missing any permissions
  const missing = missingPermissions(permissionBits, permissions);
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot does not have all permissions */
export function requireBotGuildPermissions(
  guildID: string,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the throwOnMissingGuildPermission() function
  return requireGuildPermissions(botID, guildID, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireChannelPermissions(
  memberID: string,
  channelID: string,
  permissions: Permission[],
) {
  // First we need the channel overwrite bits this member has
  const permissionBits = await calculateChannelOverwrites(memberID, channelID);
  // Second check if the member is missing any permissions
  const missing = missingPermissions(permissionBits, permissions);
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot has not all of the given channel permissions */
export function requireBotChannelPermissions(
  channelID: string,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the throwOnMissingChannelPermission() function
  return requireChannelPermissions(botID, channelID, permissions);
}

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(Permissions).filter((permission) => {
    // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
    if (Number(permission)) return false;
    // Check if permissionBits has this permission
    return permissionBits & BigInt(Permissions[permission as Permission]);
  }) as Permission[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: Permission[]) {
  return permissions.reduce(
    // Get the bit value for this permission and assign it to bits
    (bits, perm) => bits |= BigInt(Permissions[perm]),
    BigInt(0),
  ).toString();
}

/** Gets the highest role from the member in this guild */
export async function highestRole(guildID: string, memberID: string) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  // Get the roles from the member
  const memberRoles = (await cacheHandlers.get("members", memberID))?.guilds
    .get(
      guildID,
    )?.roles;
  // This member has no roles so the highest one is the @everyone role
  if (!memberRoles) return guild.roles.get(guildID) as Role;

  let memberHighestRole: Role | undefined;

  for (const roleID of memberRoles) {
    const role = guild.roles.get(roleID);
    // Rare edge case handling if undefined
    if (!role) continue;

    // If memberHighestRole is still undefined we want to assign the role,
    // else we want to check if the current role position is higher than the current memberHighestRole
    if (
      !memberHighestRole || memberHighestRole.position < role.position ||
      memberHighestRole.position === role.position
    ) {
      memberHighestRole = role;
    }
  }

  // The member has at least one role so memberHighestRole must exist
  return memberHighestRole!;
}

/** Checks if the first role is higher than the second role */
export async function higherRolePosition(
  guildID: string,
  roleID: string,
  otherRoleID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  const role = guild.roles.get(roleID);
  const otherRole = guild.roles.get(otherRoleID);
  if (!role || !otherRole) throw Error(Errors.ROLE_NOT_FOUND);

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id;
  }

  return role.position > otherRole.position;
}

/** Checks if the member has a higher position than the given role */
export async function isHigherPosition(
  guildID: string,
  memberID: string,
  compareRoleID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  if (guild.ownerID === memberID) return true;

  const memberHighestRole = await highestRole(guildID, memberID);
  return higherRolePosition(guildID, memberHighestRole.id, compareRoleID);
}
