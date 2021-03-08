import { cacheHandlers } from "../api/controllers/cache.ts";
import { Channel, Guild, Member, Role } from "../api/structures/mod.ts";
import { botID } from "../bot.ts";
import { Errors, Permission, Permissions } from "../types/mod.ts";

async function getCached(table: "guild", key: string | Guild): Promise<Guild>;
async function getCached(
  table: "channel",
  key: string | Channel,
): Promise<Channel>;
async function getCached(
  table: "member",
  key: string | Member,
): Promise<Member>;
async function getCached(
  table: "guild" | "channel" | "member",
  key: string | Guild | Channel | Member,
) {
  const cached = typeof key === "string"
    ? // @ts-ignore -
      (await cacheHandlers.get(`${table}s`, key))
    : key;
  if (!cached || typeof cached === "string") {
    throw new Error(Errors[`${table.toUpperCase}_NOT_FOUND` as Errors]);
  }

  return cached;
}

/** Calculates the permissions this member has in the given guild */
export async function calculateBasePermissions(
  guild: string | Guild,
  member: string | Member,
) {
  console.log(guild, await cacheHandlers.get("guilds", "800080308921696296"));
  console.log(guild);
  guild = await getCached("guild", guild);
  console.log(guild);
  member = await getCached("member", member);
  console.log(member);

  let permissions = 0n;
  // Calculate the role permissions bits, @everyone role is not in memberRoleIDs so we need to pass guildID manualy
  permissions |= [...(member.guilds.get(guild.id)?.roles || []), guild.id]
    .map((id) => (guild as Guild).roles.get(id)?.permissions)
    // Removes any edge case undefined
    .filter((id) => id)
    .reduce((bits, perms) => {
      bits |= BigInt(perms);
      return bits;
    }, 0n);

  // If the memberID is equal to the guild ownerID he automatically has every permission so we add ADMINISTRATOR permission
  if (guild.ownerID === member.id) permissions |= 8n;
  // Return the members permission bits as a string
  return permissions.toString();
}

/** Calculates the permissions this member has for the given Channel */
export async function calculateChannelOverwrites(
  channel: string | Channel,
  member: string | Member,
) {
  channel = await getCached("channel", channel);

  // This is a DM channel so return ADMINISTRATOR permission
  if (!channel.guildID) return "8";

  member = await getCached("member", member);

  // Get all the role permissions this member already has
  let permissions = BigInt(
    await calculateBasePermissions(channel.guildID, member),
  );

  // First calculate @everyone overwrites since these have the lowest priority
  const overwriteEveryone = channel?.permissionOverwrites.find(
    (overwrite) => overwrite.id === (channel as Channel).guildID,
  );
  if (overwriteEveryone) {
    // First remove denied permissions since denied < allowed
    permissions &= ~BigInt(overwriteEveryone.deny);
    permissions |= BigInt(overwriteEveryone.allow);
  }

  const overwrites = channel?.permissionOverwrites;

  // In order to calculate the role permissions correctly we need to temporarily save the allowed and denied permissions
  let allow = 0n;
  let deny = 0n;
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
  const overwriteMember = overwrites.find(
    (overwrite) => overwrite.id === (member as Member).id,
  );
  if (overwriteMember) {
    permissions &= ~BigInt(overwriteMember.deny);
    permissions |= BigInt(overwriteMember.allow);
  }

  return permissions.toString();
}

/** Checks if the given permission bits are matching the given permissions. `ADMINISTRATOR` always returns `true` */
export function validatePermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  if (BigInt(permissionBits) & 8n) return true;

  return permissions.every(
    (permission) =>
      // Check if permission is in permissionBits
      BigInt(permissionBits) & BigInt(Permissions[permission]),
  );
}

/** Checks if the given member has these permissions in the given guild */
export async function hasGuildPermissions(
  guildID: string,
  memberID: string,
  permissions: Permission[],
) {
  // First we need the role permission bits this member has
  const basePermissions = await calculateBasePermissions(guildID, memberID);
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(basePermissions, permissions);
}

/** Checks if the bot has these permissions in the given guild */
export function botHasGuildPermissions(
  guildID: string,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasGuildPermissions(guildID, botID, permissions);
}

/** Checks if the given member has these permissions for the given channel */
export async function hasChannelPermissions(
  channelID: string,
  memberID: string,
  permissions: Permission[],
) {
  // First we need the overwrite bits this member has
  const channelOverwrites = await calculateChannelOverwrites(
    channelID,
    memberID,
  );
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(channelOverwrites, permissions);
}

/** Checks if the bot has these permissions f0r the given channel */
export function botHasChannelPermissions(
  channelID: string,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasChannelPermissions(channelID, botID, permissions);
}

/** Returns the permissions that are not in the given permissionBits */
export function missingPermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  if (BigInt(permissionBits) & 8n) return [];

  return permissions.filter(
    (permission) => !(BigInt(permissionBits) & BigInt(Permissions[permission])),
  );
}

/** Throws an error if this member has not all of the given permissions */
export async function requireGuildPermissions(
  guildID: string,
  memberID: string,
  permissions: Permission[],
) {
  // First we need the role permissions bits this member has
  const permissionBits = await calculateBasePermissions(guildID, memberID);
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
  return requireGuildPermissions(guildID, botID, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireChannelPermissions(
  channelID: string,
  memberID: string,
  permissions: Permission[],
) {
  // First we need the channel overwrite bits this member has
  const permissionBits = await calculateChannelOverwrites(channelID, memberID);
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
  return requireChannelPermissions(channelID, botID, permissions);
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
  return permissions
    .reduce(
      // Get the bit value for this permission and assign it to bits
      (bits, perm) => (bits |= BigInt(Permissions[perm])),
      0n,
    )
    .toString();
}

// TODO: move memberID to first position
/** Gets the highest role from the member in this guild */
export async function highestRole(
  guild: string | Guild,
  member: string | Member,
) {
  guild = await getCached("guild", guild);

  // Get the roles from the member
  const memberRoles = (
    await getCached("member", member)
  ).guilds.get(guild.id)?.roles;
  // This member has no roles so the highest one is the @everyone role
  if (!memberRoles) return guild.roles.get(guild.id) as Role;

  let memberHighestRole: Role | undefined;

  for (const roleID of memberRoles) {
    const role = guild.roles.get(roleID);
    // Rare edge case handling if undefined
    if (!role) continue;

    // If memberHighestRole is still undefined we want to assign the role,
    // else we want to check if the current role position is higher than the current memberHighestRole
    if (
      !memberHighestRole ||
      memberHighestRole.position < role.position ||
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
  guild: string | Guild,
  roleID: string,
  otherRoleID: string,
) {
  guild = await getCached("guild", guild);

  const role = guild.roles.get(roleID);
  const otherRole = guild.roles.get(otherRoleID);
  if (!role || !otherRole) throw new Error(Errors.ROLE_NOT_FOUND);

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id;
  }

  return role.position > otherRole.position;
}

/** Checks if the member has a higher position than the given role */
export async function isHigherPosition(
  guild: string | Guild,
  memberID: string,
  compareRoleID: string,
) {
  guild = await getCached("guild", guild);

  if (guild.ownerID === memberID) return true;

  const memberHighestRole = await highestRole(guild.id, memberID);
  return higherRolePosition(guild.id, memberHighestRole.id, compareRoleID);
}
