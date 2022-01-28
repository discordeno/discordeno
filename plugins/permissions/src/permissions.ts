import {
  BitwisePermissionFlags,
  BotWithCache,
  DiscordenoChannel,
  DiscordenoGuild,
  DiscordenoMember,
  DiscordenoRole,
  Errors,
  Overwrite,
  PermissionStrings,
  separateOverwrites,
} from "../deps.ts";

/** Calculates the permissions this member has in the given guild */
export function calculateBasePermissions(
  bot: BotWithCache,
  guildOrId: bigint | DiscordenoGuild,
  memberOrId: bigint | DiscordenoMember,
) {
  const guild = typeof guildOrId === "bigint"
    ? bot.guilds.get(guildOrId)
    : guildOrId;
  const member = typeof memberOrId === "bigint"
    ? bot.members.get(memberOrId)
    : memberOrId;

  if (!guild || !member) return 8n;

  let permissions = 0n;
  // Calculate the role permissions bits, @everyone role is not in memberRoleIds so we need to pass guildId manualy
  permissions |= [...member.roles, guild.id]
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
export function calculateChannelOverwrites(
  bot: BotWithCache,
  channelOrId: bigint | DiscordenoChannel,
  memberOrId: bigint | DiscordenoMember,
) {
  const channel = typeof channelOrId === "bigint"
    ? bot.channels.get(channelOrId)
    : channelOrId;

  // This is a DM channel so return ADMINISTRATOR permission
  if (!channel?.guildId) return 8n;

  const member = typeof memberOrId === "bigint"
    ? bot.members.get(memberOrId)
    : memberOrId;

  if (!channel || !member) return 8n;

  // Get all the role permissions this member already has
  let permissions = calculateBasePermissions(
    bot,
    channel.guildId,
    member,
  );

  // First calculate @everyone overwrites since these have the lowest priority
  const overwriteEveryone = channel.permissionOverwrites?.find((overwrite) => {
    const [_, id] = separateOverwrites(overwrite);
    return id === channel.guildId;
  });
  if (overwriteEveryone) {
    const [_type, _id, allow, deny] = separateOverwrites(overwriteEveryone);
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
    const [_type, id, allowBits, denyBits] = separateOverwrites(overwrite);

    if (!memberRoles.includes(id)) continue;

    deny |= denyBits;
    allow |= allowBits;
  }
  // After role overwrite calculate save allowed permissions first we remove denied permissions since "denied < allowed"
  permissions &= ~deny;
  permissions |= allow;

  // Third calculate member specific overwrites since these have the highest priority
  const overwriteMember = overwrites?.find((overwrite) => {
    const [_, id] = separateOverwrites(overwrite);
    return id === member.id;
  });
  if (overwriteMember) {
    const [_type, _id, allowBits, denyBits] = separateOverwrites(
      overwriteMember,
    );

    permissions &= ~denyBits;
    permissions |= allowBits;
  }

  return permissions;
}

/** Checks if the given permission bits are matching the given permissions. `ADMINISTRATOR` always returns `true` */
export function validatePermissions(
  permissionBits: bigint,
  permissions: PermissionStrings[],
) {
  if (permissionBits & 8n) return true;

  return permissions.every(
    (permission) =>
      // Check if permission is in permissionBits
      permissionBits & BigInt(BitwisePermissionFlags[permission]),
  );
}

/** Checks if the given member has these permissions in the given guild */
export function hasGuildPermissions(
  bot: BotWithCache,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  // First we need the role permission bits this member has
  const basePermissions = calculateBasePermissions(
    bot,
    guild,
    member,
  );
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(basePermissions, permissions);
}

/** Checks if the bot has these permissions in the given guild */
export function botHasGuildPermissions(
  bot: BotWithCache,
  guild: bigint | DiscordenoGuild,
  permissions: PermissionStrings[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasGuildPermissions(bot, guild, bot.id, permissions);
}

/** Checks if the given member has these permissions for the given channel */
export function hasChannelPermissions(
  bot: BotWithCache,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  // First we need the overwrite bits this member has
  const channelOverwrites = calculateChannelOverwrites(
    bot,
    channel,
    member,
  );
  // Second use the validatePermissions function to check if the member has every permission
  return validatePermissions(channelOverwrites, permissions);
}

/** Checks if the bot has these permissions f0r the given channel */
export function botHasChannelPermissions(
  bot: BotWithCache,
  channel: bigint | DiscordenoChannel,
  permissions: PermissionStrings[],
) {
  // Since Bot is a normal member we can use the hasRolePermissions() function
  return hasChannelPermissions(bot, channel, bot.id, permissions);
}

/** Returns the permissions that are not in the given permissionBits */
export function missingPermissions(
  permissionBits: bigint,
  permissions: PermissionStrings[],
) {
  if (permissionBits & 8n) return [];

  return permissions.filter((permission) =>
    !(permissionBits & BigInt(BitwisePermissionFlags[permission]))
  );
}

/** Get the missing Guild permissions this member has */
export function getMissingGuildPermissions(
  bot: BotWithCache,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  // First we need the role permission bits this member has
  const permissionBits = calculateBasePermissions(
    bot,
    guild,
    member,
  );
  // Second return the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Get the missing Channel permissions this member has */
export function getMissingChannelPermissions(
  bot: BotWithCache,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  // First we need the role permissino bits this member has
  const permissionBits = calculateChannelOverwrites(
    bot,
    channel,
    member,
  );
  // Second returnn the members missing permissions
  return missingPermissions(permissionBits, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export function requireGuildPermissions(
  bot: BotWithCache,
  guild: bigint | DiscordenoGuild,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  const missing = getMissingGuildPermissions(
    bot,
    guild,
    member,
    permissions,
  );
  if (missing.length) {
    // If the member is missing a permission throw an Error
    throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
  }
}

/** Throws an error if the bot does not have all permissions */
export function requireBotGuildPermissions(
  bot: BotWithCache,
  guild: bigint | DiscordenoGuild,
  permissions: PermissionStrings[],
) {
  // Since Bot is a normal member we can use the throwOnMissingGuildPermission() function
  return requireGuildPermissions(bot, guild, bot.id, permissions);
}

/** Throws an error if this member has not all of the given permissions */
export function requireChannelPermissions(
  bot: BotWithCache,
  channel: bigint | DiscordenoChannel,
  member: bigint | DiscordenoMember,
  permissions: PermissionStrings[],
) {
  const missing = getMissingChannelPermissions(
    bot,
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
  bot: BotWithCache,
  channel: bigint | DiscordenoChannel,
  permissions: PermissionStrings[],
) {
  // Since Bot is a normal member we can use the throwOnMissingChannelPermission() function
  return requireChannelPermissions(bot, channel, bot.id, permissions);
}

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(BitwisePermissionFlags).filter((permission) => {
    // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
    if (Number(permission)) return false;
    // Check if permissionBits has this permission
    return permissionBits &
      BigInt(BitwisePermissionFlags[permission as PermissionStrings]);
  }) as PermissionStrings[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: PermissionStrings[]) {
  return permissions
    .reduce((bits, perm) => {
      bits |= BigInt(BitwisePermissionFlags[perm]);
      return bits;
    }, 0n)
    .toString();
}

/** Internal function to check if the bot has the permissions to set these overwrites */
export function requireOverwritePermissions(
  bot: BotWithCache,
  guildOrId: bigint | DiscordenoGuild,
  overwrites: Overwrite[],
) {
  let requiredPerms: Set<PermissionStrings> = new Set(["MANAGE_CHANNELS"]);

  overwrites?.forEach((overwrite) => {
    if (overwrite.allow) {
      overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    }
    if (overwrite.deny) {
      overwrite.deny.forEach(requiredPerms.add, requiredPerms);
    }
  });

  // MANAGE_ROLES permission can only be set by administrators
  if (requiredPerms.has("MANAGE_ROLES")) {
    requiredPerms = new Set<PermissionStrings>(["ADMINISTRATOR"]);
  }

  requireGuildPermissions(bot, guildOrId, bot.id, [
    ...requiredPerms,
  ]);
}

/** Gets the highest role from the member in this guild */
export function highestRole(
  bot: BotWithCache,
  guildOrId: bigint | DiscordenoGuild,
  memberOrId: bigint | DiscordenoMember,
) {
  const guild = typeof guildOrId === "bigint"
    ? bot.guilds.get(guildOrId)
    : guildOrId;
  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  // Get the roles from the member
  const memberRoles =
    (typeof memberOrId === "bigint" ? bot.members.get(memberOrId) : memberOrId)
      ?.roles;
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
export function higherRolePosition(
  bot: BotWithCache,
  guildOrId: bigint | DiscordenoGuild,
  roleId: bigint,
  otherRoleId: bigint,
) {
  const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;
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
export function isHigherPosition(
  bot: BotWithCache,
  guildOrId: bigint | DiscordenoGuild,
  memberId: bigint,
  compareRoleId: bigint,
) {
  const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;

  if (!guild || guild.ownerId === memberId) return true;

  const memberHighestRole = highestRole(bot, guild, memberId);
  return higherRolePosition(
    bot,
    guild.id,
    memberHighestRole.id,
    compareRoleId,
  );
}

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
    const [_type, _id, allowBits, denyBits] = separateOverwrites(overwrite);
    if (BigInt(denyBits) & BigInt(BitwisePermissionFlags[perm])) {
      return false;
    }
    if (BigInt(allowBits) & BigInt(BitwisePermissionFlags[perm])) {
      return true;
    }
  });
}
