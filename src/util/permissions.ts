import type { Bot } from "../bot.ts";
import { DiscordenoChannel, separate } from "../transformers/channel.ts";
import type { DiscordenoGuild } from "../transformers/guild.ts";
import type { DiscordenoMember } from "../transformers/member.ts";
import { DiscordenoRole } from "../transformers/role.ts";
import { Overwrite } from "../types/channels/overwrite.ts";
import { Errors } from "../types/discordeno/errors.ts";
import { DiscordBitwisePermissionFlags } from "../types/permissions/bitwise_permission_flags.ts";
import type { PermissionStrings } from "../types/permissions/permission_strings.ts";

export async function getCached(
  bot: Bot,
  table: "guilds",
  key: bigint | DiscordenoGuild
): Promise<DiscordenoGuild | undefined>;
export async function getCached(
  bot: Bot,
  table: "channels",
  key: bigint | DiscordenoChannel
): Promise<DiscordenoChannel | undefined>;
export async function getCached(
  bot: Bot,
  table: "members",
  key: bigint | DiscordenoMember
): Promise<DiscordenoMember | undefined>;
export async function getCached(
  bot: Bot,
  table: "guilds" | "channels" | "members",
  key: bigint | DiscordenoGuild | DiscordenoChannel | DiscordenoMember
) {
  const cached = typeof key === "bigint" ? await bot.cache[table].get(key) : key;

  return typeof cached === "bigint" ? undefined : cached;
}

/** Calculates the permissions this member has in the given guild */
export async function calculateBasePermissions(
  bot: Bot,
  guildOrId: bigint | DiscordenoGuild,
  memberOrId: bigint | DiscordenoMember
) {
  const guild = await bot.utils.getCached(bot, "guilds", guildOrId);
  const member = await bot.utils.getCached(bot, "members", memberOrId);

  if (!guild || !member) return 8n;

  let permissions = 0n;
  // Calculate the role permissions bits, @everyone role is not in memberRoleIds so we need to pass guildId manualy
  permissions |=
    [...member.roles, guild.id]
      .map((id) => guild.roles.get(id)?.permissions)
      // Removes any edge case undefined
      .filter((perm) => perm)
      .reduce((bits, perms) => {
        bits! |= perms!;
        return bits;
      }, 0n) || 0n;

  // If the memberId is equal to the guild ownerId he automatically has every permission so we add ADMINISTRATOR permission
  if (guild.ownerId === member.id) permissions |= 8n;
  // Return the members permission bits as a string
  return permissions;
}

/** Calculates the permissions this member has for the given Channel */
export async function calculateChannelOverwrites(
  bot: Bot,
  channelOrId: bigint | DiscordenoChannel,
  memberOrId: bigint | DiscordenoMember
) {
  const channel = await bot.utils.getCached(bot, "channels", channelOrId);

  // This is a DM channel so return ADMINISTRATOR permission
  if (!channel?.guildId) return 8n;

  const member = await bot.utils.getCached(bot, "members", memberOrId);

  if (!channel || !member) return 8n;

  // Get all the role permissions this member already has
  let permissions = await bot.utils.calculateBasePermissions(bot, channel.guildId, member);

  // First calculate @everyone overwrites since these have the lowest priority
  const overwriteEveryone = channel.permissionOverwrites?.find((overwrite) => {
    const [_, id] = separate(overwrite);
    return id === channel.guildId;
  });
  if (overwriteEveryone) {
    const [type, id, allow, deny] = separate(overwriteEveryone);
    // First remove denied permissions since denied < allowed
    permissions &= ~deny;
    permissions |= allow;
  }

  const overwrites = channel.permissionOverwrites;

  // In order to calculate the role permissions correctly we need to temporarily save the allowed and denied permissions
  let allow = 0n;
  let deny = 0n;
  const memberRoles = member.roles || [];
  // Second calculate members role overwrites since these have middle priority
  for (const overwrite of overwrites || []) {
    const [type, id, allowBits, denyBits] = separate(overwrite);

    if (!memberRoles.includes(id)) continue;

    deny |= denyBits;
    allow |= allowBits;
  }
  // After role overwrite calculate save allowed permissions first we remove denied permissions since "denied < allowed"
  permissions &= ~deny;
  permissions |= allow;

  // Third calculate member specific overwrites since these have the highest priority
  const overwriteMember = overwrites?.find((overwrite) => {
    const [_, id] = separate(overwrite);
    return id === member.id;
  });
  if (overwriteMember) {
    const [type, id, allowBits, denyBits] = separate(overwriteMember);

    permissions &= ~denyBits;
    permissions |= allowBits;
  }

  return permissions;
}

/** Checks if the given permission bits are matching the given permissions. `ADMINISTRATOR` always returns `true` */
export function validatePermissions(permissionBits: bigint, permissions: PermissionStrings[]) {
  if (permissionBits & 8n) return true;

  return permissions.every(
    (permission) =>
      // Check if permission is in permissionBits
      permissionBits & BigInt(DiscordBitwisePermissionFlags[permission])
  );
}

/** Checks if the given member has these permissions in the given guild */
export async function hasGuildPermissions(
  bot: Bot,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  // First we need the role permission bits this member has
  const basePermissions = await bot.utils.calculateBasePermissions(bot, guild, member);
  // Second use the validatePermissions function to check if the member has every permission
  return bot.utils.validatePermissions(basePermissions, permissions);
}

/** Checks if the bot has these permissions in the given guild */
export function botHasGuildPermissions(bot: Bot, guild: bigint | DiscordenoGuild, permissions: PermissionStrings[]) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return bot.utils.hasGuildPermissions(bot, guild, bot.id, permissions);
}

/** Checks if the given member has these permissions for the given channel */
export async function hasChannelPermissions(
  bot: Bot,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  // First we need the overwrite bits this member has
  const channelOverwrites = await bot.utils.calculateChannelOverwrites(bot, channel, member);
  // Second use the validatePermissions function to check if the member has every permission
  return bot.utils.validatePermissions(channelOverwrites, permissions);
}

/** Checks if the bot has these permissions f0r the given channel */
export function botHasChannelPermissions(
  bot: Bot,
  channel: bigint | DiscordenoChannel,
  permissions: PermissionStrings[]
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return bot.utils.hasChannelPermissions(bot, channel, bot.id, permissions);
}

/** Returns the permissions that are not in the given permissionBits */
export function missingPermissions(permissionBits: bigint, permissions: PermissionStrings[]) {
  if (permissionBits & 8n) return [];

  return permissions.filter((permission) => !(permissionBits & BigInt(DiscordBitwisePermissionFlags[permission])));
}

/** Get the missing Guild permissions this member has */
export async function getMissingGuildPermissions(
  bot: Bot,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  // First we need the role permission bits this member has
  const permissionBits = await bot.utils.calculateBasePermissions(bot, guild, member);
  // Second return the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Get the missing Channel permissions this member has */
export async function getMissingChannelPermissions(
  bot: Bot,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  // First we need the role permissino bits this member has
  const permissionBits = await bot.utils.calculateChannelOverwrites(bot, channel, member);
  // Second returnn the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireGuildPermissions(
  bot: Bot,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  const missing = await bot.utils.getMissingGuildPermissions(bot, guild, member, permissions);
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot does not have all permissions */
export function requireBotGuildPermissions(
  bot: Bot,
  guild: bigint | DiscordenoGuild,
  permissions: PermissionStrings[]
) {
  // Since Bot is a normal member we can use the throwOnMissingGuildPermission() function
  return bot.utils.requireGuildPermissions(bot, guild, bot.id, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export async function requireChannelPermissions(
  bot: Bot,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[]
) {
  const missing = await bot.utils.getMissingChannelPermissions(bot, channel, member, permissions);
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot has not all of the given channel permissions */
export function requireBotChannelPermissions(
  bot: Bot,
  channel: bigint | DiscordenoChannel,
  permissions: PermissionStrings[]
) {
  // Since Bot is a normal member we can use the throwOnMissingChannelPermission() function
  return bot.utils.requireChannelPermissions(bot, channel, bot.id, permissions);
}

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(DiscordBitwisePermissionFlags).filter((permission) => {
    // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
    if (Number(permission)) return false;
    // Check if permissionBits has this permission
    return permissionBits & BigInt(DiscordBitwisePermissionFlags[permission as PermissionStrings]);
  }) as PermissionStrings[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: PermissionStrings[]) {
  return permissions
    .reduce((bits, perm) => {
      bits |= BigInt(DiscordBitwisePermissionFlags[perm]);
      return bits;
    }, 0n)
    .toString();
}

/** Internal function to check if the bot has the permissions to set these overwrites */
export async function requireOverwritePermissions(
  bot: Bot,
  guildOrId: bigint | DiscordenoGuild,
  overwrites: Overwrite[]
) {
  let requiredPerms: Set<PermissionStrings> = new Set(["MANAGE_CHANNELS"]);

  overwrites?.forEach((overwrite) => {
    if (overwrite.allow) overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    if (overwrite.deny) overwrite.deny.forEach(requiredPerms.add, requiredPerms);
  });

  // MANAGE_ROLES permission can only be set by administrators
  if (requiredPerms.has("MANAGE_ROLES")) {
    requiredPerms = new Set<PermissionStrings>(["ADMINISTRATOR"]);
  }

  await bot.utils.requireGuildPermissions(bot, guildOrId, bot.id, [...requiredPerms]);
}

/** Gets the highest role from the member in this guild */
export async function highestRole(
  bot: Bot,
  guildOrId: bigint | DiscordenoGuild,
  memberOrId: bigint | DiscordenoMember
) {
  const guild = await bot.utils.getCached(bot, "guilds", guildOrId);

  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  // Get the roles from the member
  const memberRoles = (await bot.utils.getCached(bot, "members", memberOrId))?.roles;
  // This member has no roles so the highest one is the @everyone role
  if (!memberRoles) return guild.roles.get(guild.id)!;

  let memberHighestRole: DiscordenoRole | undefined;

  for (const roleId of memberRoles) {
    const role = guild.roles.get(roleId);
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
  bot: Bot,
  guildOrId: bigint | DiscordenoGuild,
  roleId: bigint,
  otherRoleId: bigint
) {
  const guild = await bot.utils.getCached(bot, "guilds", guildOrId);

  if (!guild) return true;

  const role = guild.roles.get(roleId);
  const otherRole = guild.roles.get(otherRoleId);
  if (!role || !otherRole) throw new Error(Errors.ROLE_NOT_FOUND);

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id;
  }

  return role.position > otherRole.position;
}

/** Checks if the member has a higher position than the given role */
export async function isHigherPosition(
  bot: Bot,
  guildOrId: bigint | DiscordenoGuild,
  memberId: bigint,
  compareRoleId: bigint
) {
  const guild = await bot.utils.getCached(bot, "guilds", guildOrId);

  if (!guild || guild.ownerId === memberId) return true;

  const memberHighestRole = await bot.utils.highestRole(bot, guild, memberId);
  return bot.utils.higherRolePosition(bot, guild.id, memberHighestRole.id, compareRoleId);
}
