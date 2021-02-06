import { DiscordUser, DiscordWebhookPayload, DiscordIntegrationPayload, DiscordChannelTypes, DiscordRole, DiscordOverwrite } from "./mod.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface DiscordAuditLogPayload {
  /** list of webhooks found in the audit log */
  webhooks: DiscordWebhookPayload[];
  /** list of users found in the audit log */
  users: DiscordUser[];
  /** list of audit log entries */
  audit_log_entries: DiscordAuditLogEntryPayload[];
  /** list of partial integration objects */
  integrations: Partial<DiscordIntegrationPayload>[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface DiscordAuditLogEntryPayload {
  /** id of the affected entity (webhook, user, role, etc.) */
  target_id: string | null;
  /** changes made to the target_id */
  changes?: DiscordAuditLogChangePayload[];
  /** the user who made the changes */
  user_id: string;
  /** id of the entry */
  id: string;
  /** type of action that occured */
  action_type: DiscordAuditLogEvent;
  /** additional info for certain action types */
  options?: DiscordOptionalAuditEntryInfoParam;
  /** the reason for the change (0-512 characters) */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum DiscordAuditLogEvent {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE,
  CHANNEL_DELETE,
  CHANNEL_OVERWRITE_CREATE,
  CHANNEL_OVERWRITE_UPDATE,
  CHANNEL_OVERWRITE_DELETE,
  MEMBER_KICK = 20,
  MEMBER_PRUNE,
  MEMBER_BAN_ADD,
  MEMBER_BAN_REMOVE,
  MEMBER_UPDATE,
  MEMBER_ROLE_UPDATE,
  MEMBER_MOVE,
  MEMBER_DISCONNECT,
  BOT_ADD,
  ROLE_CREATE = 30,
  ROLE_UPDATE,
  ROLE_DELETE,
  INVITE_CREATE = 40,
  INVITE_UPDATE,
  INVITE_DELETE,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE,
  WEBHOOK_DELETE,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE,
  EMOJI_DELETE,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE,
  MESSAGE_PIN,
  MESSAGE_UNPIN,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE,
  INTEGRATION_DELETE,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface DiscordOptionalAuditEntryInfoParam {
  /** number of days after which inactive members were kicked, type: MEMBER_PRUNE */
  delete_member_days: string;
  /** number of members removed by the prune, type: MEMBER_PRUNE */
  members_removed: string;
  /** channel in which the entities were targeted, types: MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE */
  channel_id: string;
  /** id of the message that was targeted, types: MESSAGE_PIN & MESSAGE_UNPIN */
  message_id: string;
  /** number of entities that were targeted, types: MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE */
  count: string;
  /** id of the overwritten entity, types CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  id: string;
  /** type of overwritten entity - "0", for "role", or "1" for "member", types: CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  type: string;
  /** name of the role if type is "0" (not present if type is "1"), types: CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  role_name: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface DiscordAuditLogChangePayload {
  /** new value of the key */
  new_value?: DiscordAuditLogChangeKeyPayload;
  /** old value of the key */
  old_value?: DiscordAuditLogChangeKeyPayload;
  /** name of audit log change key */
  key: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key */
export interface DiscordAuditLogChangeKeyPayload {
  /** object: guild; name changed */
  name: string;
  /** object: guild; icon changed */
  icon_hash: string;
  /** object: guild; invite splash page artwork changed */
  splash_hash: string;
  /** object: guild; owner changed */
  owner_id: string;
  /** object: guild; region changed */
  region: string;
  /** object: guild; afk channel changed */
  afk_channel_id: string;
  /** object: guild; afk timeout duration changed */
  afk_timeout: number;
  /** object: guild; two-factor auth requirement changed */
  mfa_level: number;
  /** object: guild; required verification level changed */
  verification_level: number;
  /** object: guild; change in whose messages are scanned and deleted for explicit content in the server */
  explicit_content_filter: number;
  /** object: guild; default message notification level changed */
  default_message_notifications: number;
  /** object: guild; guild invite vanity url changed */
  vanity_url_code: string;
  /** object: guild; new role added */
  $add: Partial<DiscordRole>[];
  /** object: guild; role removed */
  $remove: Partial<DiscordRole>[];
  /** object: guild;  change in number of days after which inactive and role-unassigned members are kicked */
  prune_delete_days: number;
  /** object: guild; server widget enabled/disable */
  widget_enabled: boolean;
  /** object: guild; channel id of the servere widget changed */
  widget_channel_id: string;
  /** object: guild; id of the system channel changed */
  system_channel_id: string;
  /** object: channel; text or voice channel position changed */
  position: number;
  /** object: channel; text channel topic changed */
  topic: string;
  /** object: channel; voice channel bitrate changed */
  bitrate: number;
  /** object: channel; permissions on a channel changed */
  permission_overwrites: DiscordOverwrite[];
  /** object: channel; channel nsfw restriction changed */
  nsfw: boolean;
  /** object: channel; application id of the added or removed webhook or bot */
  application_id: string;
  /** object: channel; amount of seconds a user has to wait before sending another message changed */
  rate_limit_per_user: number;
  /** object: role; permissions for a role changed */
  permissions: string;
  /** object: role; role color changed */
  color: number;
  /** object: role; role is now displayed/no longer displayed seperate from online users */
  hoist: boolean;
  /** object: role; rrole is now mentionable/unmentionable */
  mentionable: boolean;
  /** object: role; a permission on a text or voice channel was allowed for a role */
  allow: string;
  /** object: role; a permission on a text or voice channel was denied for a role */
  deny: string;
  /** object: invite; invite code changed */
  code: string;
  /** object: invite; channel for invite code changed */
  channel_id: string;
  /** object: invite; person who created invite code changed */
  invite_id: string;
  /** object: invite; change to max number of times invite code can be used */
  max_uses: number;
  /** object: invite; number of times invite code used changed */
  uses: number;
  /** object: invite; how long invite code lasts changed */
  max_age: number;
  /** object: invite; invite code is temporary/never expires */
  temporary: boolean;
  /** object: user; user server deafened/undeafened */
  deaf: boolean;
  /** object: user; user server muted/unmuted */
  mute: boolean;
  /** object: user; user nickanem changed */
  nick: string;
  /** object: user; user avatar changed */
  avatar_hash: string;
  /** object: any; the id of the changed entity - sometimes used in conjunction with other keys */
  id: string;
  /** object: any; type of entity created */
  type: DiscordChannelTypes | string;
  /** object: integration; integration emoticons enabled/disabled */
  enable_emoticons: boolean;
  /** object: integration; integration expiring subscriber behavior changed */
  expire_behavior: number;
  /** object: integration; integration expire grace period changed */
  expire_grace_period: number;
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLogParams {
  /** filter the log for actions made by a user */
  user_id: string;
  /** the type of audit log event */
  action_type: DiscordAuditLogEvent;
  /** filter the log before a certain entry id */
  before: string;
  /** how many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}