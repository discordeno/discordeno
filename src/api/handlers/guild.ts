import { identifyPayload } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import {
  AuditLogEvent,
  AuditLogPayload,
  BanPayload,
  ChannelPayload,
  ChannelTypes,
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  GuildMemberPayload,
  GuildPayload,
  GuildWidgetPayload,
  Intents,
  PremiumTypes,
  RolePayload,
  TemplatePayload,
  UserFlags,
  UserPayload,
  VerificationLevel,
} from "../../types/mod.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { toPermissionOverwritesPayload } from "../../util/converters.ts";
import { botHasPermission, calculateBits } from "../../util/permissions.ts";
import {
  camelKeysToSnakeCase,
  formatImageURL,
  snakeKeysToCamelCase,
  urlToBase64,
} from "../../util/utils.ts";
import { requestAllMembers } from "../../ws/shard_manager.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { Guild, Member, structures, Template } from "../structures/mod.ts";
import {
  AuditLog,
  Ban,
  BanOptions,
  ChannelObject,
  CreateChannelOptions,
  CreateEmojiOptions,
  CreateGuildFromTemplateOptions,
  CreateGuildOptions,
  CreateGuildRoleOptions,
  CreateGuildTemplateOptions,
  EditGuildChannelPositionOptions,
  EditGuildEmojiOptions,
  EditGuildIntegrationOptions,
  EditGuildOptions,
  EditGuildRolePositionOptions,
  EditGuildTemplateOptions,
  Emoji,
  Errors,
  FetchMembersOptions,
  GetGuildAuditLogOptions,
  GetGuildPruneOptions,
  GuildWidget,
  ImageFormats,
  ImageSize,
  Integration,
  Invite,
  RoleObject,
  StartGuildPruneOptions,
  VoiceRegion,
  Webhook,
} from "../types/mod.ts";

/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export async function createServer(options: CreateGuildOptions) {
  const guild = await RequestManager.post(
    endpoints.GUILDS,
    {
      ...options,
      verification_level: options.verificationLevel
        ? VerificationLevel[options.verificationLevel]
        : undefined,
      default_message_notifications: options.defaultMessageNotifications
        ? DefaultMessageNotificationLevel[options.defaultMessageNotifications]
        : undefined,
      explicit_content_filter: options.explicitContentFilter
        ? ExplicitContentFilterLevel[options.explicitContentFilter]
        : undefined,
      channels: options.channels?.map((channel) => {
        return {
          ...channel,
          type: channel.type ? ChannelTypes[channel.type] : undefined,
          permission_overwrites: toPermissionOverwritesPayload(
            channel.permissionOverwrites,
          ),
          recipients: channel.recipients?.map((recipient) => {
            return {
              ...recipient,
              flags: recipient.flags ? UserFlags[recipient.flags] : undefined,
              premiumType: recipient.premiumType
                ? PremiumTypes[recipient.premiumType]
                : undefined,
              publicFlags: recipient.publicFlags
                ? UserFlags[recipient.publicFlags]
                : undefined,
            };
          }),
        };
      }),
    },
  ) as GuildPayload;
  return structures.createGuild(guild, 0);
}

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export function deleteServer(guildID: string) {
  return RequestManager.delete(endpoints.GUILD(guildID));
}

/** Gets an array of all the channels ids that are the children of this category. */
export function categoryChildrenIDs(guildID: string, categoryID: string) {
  return cacheHandlers.filter(
    "channels",
    (channel) => channel.parentID === categoryID && channel.guildID === guildID,
  );
}

/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export function guildIconURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.icon
    ? formatImageURL(endpoints.GUILD_ICON(guild.id, guild.icon), size, format)
    : undefined;
}

/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.splash
    ? formatImageURL(
      endpoints.GUILD_SPLASH(guild.id, guild.splash),
      size,
      format,
    )
    : undefined;
}

/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.banner
    ? formatImageURL(
      endpoints.GUILD_BANNER(guild.id, guild.banner),
      size,
      format,
    )
    : undefined;
}

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createGuildChannel(
  guild: Guild,
  options?: CreateChannelOptions,
) {
  const hasPerm = await botHasPermission(
    guild.id,
    ["MANAGE_CHANNELS"],
  );
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  const result =
    (await RequestManager.post(endpoints.GUILD_CHANNELS(guild.id), {
      ...camelKeysToSnakeCase(options),
      type: options?.type
        ? ChannelTypes[options.type]
        : ChannelTypes.GUILD_TEXT,
      permission_overwrites: toPermissionOverwritesPayload(
        options?.permissionOverwrites,
      ),
    })) as ChannelPayload;

  return structures.createChannel(result);
}

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(
  guildID: string,
  channelID: string,
) {
  const hasPerm = await botHasPermission(
    guildID,
    ["MANAGE_CHANNELS"],
  );
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }

  return snakeKeysToCamelCase(
    await RequestManager.delete(endpoints.CHANNEL(channelID)),
  ) as ChannelObject;
}

/** Returns a list of guild channel objects.
*
* ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
*/
export async function getChannels(guildID: string, addToCache = true) {
  const result = await RequestManager.get(
    endpoints.GUILD_CHANNELS(guildID),
  ) as ChannelPayload[];
  return Promise.all(result.map(async (res) => {
    const channel = await structures.createChannel(res, guildID);
    if (addToCache) {
      await cacheHandlers.set("channels", channel.id, channel);
    }
    return channel;
  }));
}

/** Fetches a single channel object from the api.
*
* ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
*/
export async function getChannel(channelID: string, addToCache = true) {
  const result = await RequestManager.get(
    endpoints.GUILD_CHANNEL(channelID),
  ) as ChannelPayload;
  const channel = await structures.createChannel(result, result.guild_id);
  if (addToCache) await cacheHandlers.set("channels", channel.id, channel);
  return channel;
}

/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
export function swapChannels(
  guildID: string,
  channelPositions: EditGuildChannelPositionOptions[],
) {
  if (channelPositions.length < 2) {
    throw "You must provide at least two channels to be swapped.";
  }
  return RequestManager.patch(
    endpoints.GUILD_CHANNELS(guildID),
    channelPositions,
  );
}

//TODO: add addToCache argument?
//TODO(itohatweb): remove options argument
/** Returns a guild member object for the specified user.
*
* ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
*/
export async function getMember(
  guildID: string,
  memberID: string,
  options?: { force?: boolean },
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild && !options?.force) return;

  const data = await RequestManager.get(
    endpoints.GUILD_MEMBER(guildID, memberID),
  ) as GuildMemberPayload;

  return await structures.createMember(data, guildID);
}

// TODO(itohatweb): throw error if guild not found
/** Returns guild member objects for the specified user by their nickname/username.
*
* ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
*/
export async function getMembersByQuery(
  guildID: string,
  name: string,
  limit = 1,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  return new Promise((resolve) => {
    requestAllMembers(guild, resolve, { query: name, limit });
  }) as Promise<Collection<string, Member>>;
}

/** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
export async function createEmoji(
  guildID: string,
  name: string,
  image: string,
  options: CreateEmojiOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_EMOJIS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }

  if (image && !image.startsWith("data:image/")) {
    image = await urlToBase64(image);
  }

  const result = await RequestManager.post(endpoints.GUILD_EMOJIS(guildID), {
    ...options,
    name,
    image,
  });

  return snakeKeysToCamelCase(result) as Emoji;
}

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(
  guildID: string,
  emojiID: string,
  options: EditGuildEmojiOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_EMOJIS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }

  return snakeKeysToCamelCase(
    await RequestManager.patch(
      endpoints.GUILD_EMOJI(guildID, emojiID),
      options,
    ),
  ) as Emoji;
}

/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export async function deleteEmoji(
  guildID: string,
  emojiID: string,
  reason?: string,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_EMOJIS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }

  return RequestManager.delete(
    endpoints.GUILD_EMOJI(guildID, emojiID),
    { reason },
  );
}

/** Creates a url to the emoji from the Discord CDN. */
export function emojiURL(id: string, animated = false) {
  return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
}

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createGuildRole(
  guildID: string,
  options: CreateGuildRoleOptions,
  reason?: string,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  const result = await RequestManager.post(
    endpoints.GUILD_ROLES(guildID),
    {
      ...options,
      permissions: calculateBits(options?.permissions || []),
      reason,
    },
  ) as RolePayload;

  const role = await structures.createRole(result);
  const guild = await cacheHandlers.get("guilds", guildID);
  guild?.roles.set(role.id, role);
  return role;
}

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(
  guildID: string,
  id: string,
  options: CreateGuildRoleOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  const result = await RequestManager.patch(endpoints.GUILD_ROLE(guildID, id), {
    ...options,
    permissions: options.permissions
      ? calculateBits(options.permissions)
      : undefined,
  }) as RolePayload;

  return structures.createRole(result);
}

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(guildID: string, roleID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  return RequestManager.delete(endpoints.GUILD_ROLE(guildID, roleID));
}

/** Returns a list of role objects for the guild.
*
* ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
* This function does not cache the roles.
*/
export async function getRoles(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  return snakeKeysToCamelCase(
    await RequestManager.get(
      endpoints.GUILD_ROLES(guildID),
    ),
  ) as RoleObject[];
}

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
export async function swapRoles(
  guildID: string,
  rolePositons: EditGuildRolePositionOptions[],
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  const roles = await RequestManager.patch(
    endpoints.GUILD_ROLES(guildID),
    rolePositons,
  ) as RolePayload[];

  return roles.map((role) => structures.createRole(role));
}

/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export async function getPruneCount(
  guildID: string,
  options: GetGuildPruneOptions,
) {
  if (options.days && options.days < 1) {
    throw new Error(Errors.PRUNE_MIN_DAYS);
  }

  const hasPerm = await botHasPermission(guildID, ["KICK_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }

  const result = await RequestManager.get(
    endpoints.GUILD_PRUNE(guildID),
    {
      ...options,
      include_roles: Array.isArray(options.includeRoles)
        ? options.includeRoles.join(",")
        : options.includeRoles,
    },
  ) as { pruned: number };

  return result.pruned;
}

/** Begin pruning all members in the given time period */
export async function pruneMembers(
  guildID: string,
  options: StartGuildPruneOptions,
) {
  if (options.days && options.days < 1) {
    throw new Error(Errors.PRUNE_MIN_DAYS);
  }

  const hasPerm = await botHasPermission(guildID, ["KICK_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }

  const result = await RequestManager.post(
    endpoints.GUILD_PRUNE(guildID),
    {
      ...camelKeysToSnakeCase(options),
      include_roles: Array.isArray(options.includeRoles)
        ? options.includeRoles.join(",")
        : options.includeRoles,
    },
  ) as { pruned: number };

  return result.pruned;
}

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.get()
 *
 * ADVANCED:
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
*/
export function fetchMembers(guild: Guild, options?: FetchMembersOptions) {
  // You can request 1 member without the intent
  if (
    (!options?.limit || options.limit > 1) &&
    !(identifyPayload.intents && Intents.GUILD_MEMBERS)
  ) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  if (options?.userIDs?.length) {
    options.limit = options.userIDs.length;
  }

  return new Promise((resolve) => {
    requestAllMembers(guild, resolve, options);
  }) as Promise<Collection<string, Member>>;
}

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(
  guildID: string,
  options: GetGuildAuditLogOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["VIEW_AUDIT_LOG"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_VIEW_AUDIT_LOG);
  }

  const result = await RequestManager.get(endpoints.GUILD_AUDIT_LOGS(guildID), {
    ...camelKeysToSnakeCase(options),
    action_type: options.actionType
      ? AuditLogEvent[options.actionType]
      : undefined,
    limit: options.limit && options.limit >= 1 && options.limit <= 100
      ? options.limit
      : 50,
  }) as AuditLogPayload;

  return snakeKeysToCamelCase(result) as AuditLog;
}

// TODO(itohatweb): better return type (https://discord.com/developers/docs/resources/guild#get-guild-widget)
// TODO(itohatweb): rename to editWidget
/** Returns the guild embed object. Requires the MANAGE_GUILD permission. */
export async function getEmbed(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return RequestManager.get(endpoints.GUILD_GET_EMBED(guildID));
}

// TODO(itohatweb): rename to editWidget
/** Modify a guild embed object for the guild. Requires the MANAGE_GUILD permission. */
export async function editEmbed(
  guildID: string,
  enabled: boolean,
  channelID?: string | null,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  const result = await RequestManager.patch(
    endpoints.GUILD_EMBED(guildID),
    { enabled, channel_id: channelID },
  ) as GuildWidgetPayload;

  return snakeKeysToCamelCase(result) as GuildWidget;
}

/** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
export async function getVanityURL(guildID: string) {
  return snakeKeysToCamelCase(
    await RequestManager.get(endpoints.GUILD_VANITY_URL(guildID)),
  ) as Partial<Invite>;
}

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return snakeKeysToCamelCase(
    await RequestManager.get(endpoints.GUILD_INTEGRATIONS(guildID)),
  ) as Integration;
}

/** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
export async function editIntegration(
  guildID: string,
  id: string,
  options: EditGuildIntegrationOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return RequestManager.patch(
    endpoints.GUILD_INTEGRATION(guildID, id),
    camelKeysToSnakeCase(options),
  );
}

/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
export async function deleteIntegration(
  guildID: string,
  integrationID: string,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return RequestManager.delete(
    endpoints.GUILD_INTEGRATION(guildID, integrationID),
  );
}

/** Sync an integration. Requires the MANAGE_GUILD permission. */
export async function syncIntegration(guildID: string, id: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return RequestManager.post(endpoints.GUILD_INTEGRATION_SYNC(guildID, id));
}

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["BAN_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }

  const results = await RequestManager.get(
    endpoints.GUILD_BANS(guildID),
  ) as BanPayload[];

  return new Collection<string, Ban>(
    results.map((res) => [res.user.id, snakeKeysToCamelCase(res)]),
  );
}

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(guildID: string, memberID: string) {
  const hasPerm = await botHasPermission(guildID, ["BAN_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }

  return snakeKeysToCamelCase(
    await RequestManager.get(
      endpoints.GUILD_BAN(guildID, memberID),
    ),
  ) as Ban;
}

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function ban(guildID: string, id: string, options: BanOptions) {
  const hasPerm = await botHasPermission(guildID, ["BAN_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }

  return RequestManager.put(
    endpoints.GUILD_BAN(guildID, id),
    snakeKeysToCamelCase(options),
  );
}

/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export async function unban(guildID: string, id: string) {
  const hasPerm = await botHasPermission(guildID, ["BAN_MEMBERS"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }
  return RequestManager.delete(endpoints.GUILD_BAN(guildID, id));
}

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(guildID: string, options: EditGuildOptions) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  if (options.icon && !options.icon.startsWith("data:image/")) {
    options.icon = await urlToBase64(options.icon);
  }

  if (options.banner && !options.banner.startsWith("data:image/")) {
    options.banner = await urlToBase64(options.banner);
  }

  if (options.splash && !options.splash.startsWith("data:image/")) {
    options.splash = await urlToBase64(options.splash);
  }

  return snakeKeysToCamelCase(
    RequestManager.patch(endpoints.GUILD(guildID), {
      ...camelKeysToSnakeCase(options),
      verification_level: options.verificationLevel
        ? VerificationLevel[options.verificationLevel]
        : undefined,
      default_message_notifications: options.defaultMessageNotifications
        ? DefaultMessageNotificationLevel[options.defaultMessageNotifications]
        : undefined,
      explicit_content_filter: options.explicitContentFilter
        ? ExplicitContentFilterLevel[options.explicitContentFilter]
        : undefined,
    }),
  ) as Guild;
}

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }

  return snakeKeysToCamelCase(
    await RequestManager.get(endpoints.GUILD_INVITES(guildID)),
  ) as Invite[];
}

// TODO(itohatweb): rename to leaveServer
/** Leave a guild */
export function leaveGuild(guildID: string) {
  return RequestManager.delete(endpoints.GUILD_LEAVE(guildID));
}

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(guildID: string) {
  return (await RequestManager.get(
    endpoints.GUILD_REGIONS(guildID),
  )) as VoiceRegion[];
}

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(guildID: string) {
  const hasPerm = await botHasPermission(
    guildID,
    ["MANAGE_WEBHOOKS"],
  );
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  return snakeKeysToCamelCase(
    await RequestManager.get(endpoints.GUILD_WEBHOOKS(guildID)),
  ) as Webhook[];
}

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export function getUser(userID: string) {
  return RequestManager.get(endpoints.USER(userID)) as Promise<UserPayload>;
}

/**
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()
 *
 * Advanced Devs:
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 * */
export async function getGuild(guildID: string, withCounts = true) {
  return snakeKeysToCamelCase(
    await RequestManager.get(
      endpoints.GUILD(guildID),
      { with_counts: withCounts },
    ),
  ) as Guild;
}

/** Returns the guild template if it exists */
export function getGuildTemplate(
  guildID: string,
  templateCode: string,
) {
  return RequestManager.get(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
  ) as Promise<Template>;
}

/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export async function createGuildFromTemplate(
  templateCode: string,
  options: CreateGuildFromTemplateOptions,
) {
  if (await cacheHandlers.size("guilds") >= 10) {
    throw new Error(
      "This function can only be used by bots in less than 10 guilds.",
    );
  }

  if (options.icon) {
    options.icon = await urlToBase64(options.icon);
  }

  return snakeKeysToCamelCase(
    await RequestManager.post(
      endpoints.GUILD_TEMPLATE(templateCode),
      options,
    ),
  ) as Guild;
}

/**
 * Returns an array of templates.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function getGuildTemplates(guildID: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) throw new Error(Errors.MISSING_MANAGE_GUILD);

  const templates = await RequestManager.get(
    endpoints.GUILD_TEMPLATES(guildID),
  ) as TemplatePayload[];
  return templates.map((template) => structures.createTemplate(template));
}

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(
  guildID: string,
  templateCode: string,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) throw new Error(Errors.MISSING_MANAGE_GUILD);

  const deletedTemplate = await RequestManager.delete(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
  ) as TemplatePayload;
  return structures.createTemplate(deletedTemplate);
}

/**
 * Creates a template for the guild.
 * Requires the `MANAGE_GUILD` permission.
 * @param name name of the template (1-100 characters)
 * @param description description for the template (0-120 characters
 */
export async function createGuildTemplate(
  guildID: string,
  data: CreateGuildTemplateOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) throw new Error(Errors.MISSING_MANAGE_GUILD);

  if (data.name.length < 1 || data.name.length > 100) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (
    data.description?.length &&
    data.description.length > 120
  ) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const template = await RequestManager.post(
    endpoints.GUILD_TEMPLATES(guildID),
    data,
  ) as TemplatePayload;
  return structures.createTemplate(template);
}

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(guildID: string, templateCode: string) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) throw new Error(Errors.MISSING_MANAGE_GUILD);

  const template = await RequestManager.put(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
  ) as TemplatePayload;
  return structures.createTemplate(template);
}

/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function editGuildTemplate(
  guildID: string,
  templateCode: string,
  data: EditGuildTemplateOptions,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_GUILD"]);
  if (!hasPerm) throw new Error(Errors.MISSING_MANAGE_GUILD);

  if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (
    data.description?.length &&
    data.description.length > 120
  ) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const template = await RequestManager.patch(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
    data,
  ) as TemplatePayload;
  return structures.createTemplate(template);
}
