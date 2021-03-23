import { botID } from "../bot.ts";
import { cacheHandlers } from "../cache.ts";
import { Channel, Guild, Member, Role } from "../structures/mod.ts";

async function getCached(
  table: "guilds",
  key: string | Guild,
): Promise<Guild>;
async function getCached(
  table: "channels",
  key: string | Channel,
): Promise<Channel>;
async function getCached(
  table: "members",
  key: string | Member,
): Promise<Member>;
async function getCached(
  table: "guilds" | "channels" | "members",
  key: string | Guild | Channel | Member,
) {
  const cached = typeof key === "string"
    ? // @ts-ignore TS is wrong here
      (await cacheHandlers.get(table, key))
    : key;
  if (!cached || typeof cached === "string") {
    throw new Error(
      Errors[`${table.slice(0, -1).toUpperCase()}_NOT_FOUND` as Errors],
    );
  }

  return cached;
}

/** Calculates the permissions this member has in the given guild */
export async function calculateBasePermissions(
  guild: string | Guild,
  member: string | Member,
) {
  guild = await getCached("guilds", guild);
  member = await getCached("members", member);

  let permissions = 0n;
  // Calculate the role permissions bits, @everyone role is not in memberRoleIDs so we need to pass guildID manualy
  permissions |= [...(member.guilds.get(guild.id)?.roles || []), guild.id]
    .map((id) => (guild as Guild).roles.get(id)?.permissions)
    // Removes any edge case undefined
    .filter((perm) => perm)
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
  channel = await getCached("channels", channel);

  // This is a DM channel so return ADMINISTRATOR permission
  if (!channel.guildID) return "8";

  member = await getCached("members", member);

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

    deny |= BigInt(overwrite.deny);
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
  guild: string | Guild,
  member: string | Member,
  permissions: Permission[],
) {
  // First we need the role permission bits this member has
  const basePermissions = await calculateBasePermissions(guild, member);
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(basePermissions, permissions);
}

/** Checks if the bot has these permissions in the given guild */
export function botHasGuildPermissions(
  guild: string | Guild,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasGuildPermissions(guild, botID, permissions);
}

/** Checks if the given member has these permissions for the given channel */
export async function hasChannelPermissions(
  channel: string | Channel,
  member: string | Member,
  permissions: Permission[],
) {
  // First we need the overwrite bits this member has
  const channelOverwrites = await calculateChannelOverwrites(
    channel,
    member,
  );
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(channelOverwrites, permissions);
}

/** Checks if the bot has these permissions f0r the given channel */
export function botHasChannelPermissions(
  channel: string | Channel,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasChannelPermissions(channel, botID, permissions);
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

/** Get the missing Guild permissions this member has */
export async function getMissingGuildPermissions(
  guild: string | Guild,
  member: string | Member,
  permissions: Permission[],
) {
  // First we need the role permissino bits this member has
  const permissionBits = await calculateBasePermissions(guild, member);
  // Second returnn the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Get the missing Channel permissions this member has */
export async function getMissingChannelPermissions(
  channel: string | Channel,
  member: string | Member,
  permissions: Permission[],
) {
  // First we need the role permissino bits this member has
  const permissionBits = await calculateChannelOverwrites(channel, member);
  // Second returnn the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireGuildPermissions(
  guild: string | Guild,
  member: string | Member,
  permissions: Permission[],
) {
  const missing = await getMissingGuildPermissions(guild, member, permissions);
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot does not have all permissions */
export function requireBotGuildPermissions(
  guild: string | Guild,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the throwOnMissingGuildPermission() function
  return requireGuildPermissions(guild, botID, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireChannelPermissions(
  channel: string | Channel,
  member: string | Member,
  permissions: Permission[],
) {
  const missing = await getMissingChannelPermissions(
    channel,
    member,
    permissions,
  );
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot has not all of the given channel permissions */
export function requireBotChannelPermissions(
  channel: string | Channel,
  permissions: Permission[],
) {
  // Since Bot is a normal member we can use the throwOnMissingChannelPermission() function
  return requireChannelPermissions(channel, botID, permissions);
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
    .reduce((bits, perm) => {
      bits |= BigInt(Permissions[perm]);
      return bits;
    }, 0n)
    .toString();
}

/** Gets the highest role from the member in this guild */
export async function highestRole(
  guild: string | Guild,
  member: string | Member,
) {
  guild = await getCached("guilds", guild);

  // Get the roles from the member
  const memberRoles = (
    await getCached("members", member)
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
  guild = await getCached("guilds", guild);

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
  guild = await getCached("guilds", guild);

  if (guild.ownerID === memberID) return true;

  const memberHighestRole = await highestRole(guild, memberID);
  return higherRolePosition(guild.id, memberHighestRole.id, compareRoleID);
}
