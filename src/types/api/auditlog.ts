import {
  DiscordIntegration,
  DiscordOverwrite,
  DiscordRole,
  DiscordUser,
  DiscordWebhook,
} from "./mod.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface DiscordAuditLogPayload {
  /** list of webhooks found in the audit log */
  webhooks: DiscordWebhook[];
  /** list of users found in the audit log */
  users: DiscordUser[];
  /** list of audit log entries */
  audit_log_entries: DiscordAuditLogEntry[];
  /** list of partial integration objects */
  integrations: Partial<DiscordIntegration>[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface DiscordAuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  target_id: string | null;
  /** changes made to the target_id */
  changes?: DiscordAuditLogChange[];
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
export interface DiscordAuditLogChange {
  /** new value of the key. If not present, while old_value is, that means the property that was changed has been reset */
  new_value?: DiscordAuditLogChangeValue;
  /** old value of the key */
  old_value?: DiscordAuditLogChangeValue;
  /** name of audit log change key */
  key: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export type DiscordAuditLogChangeValue =
  | {
    new_value: string;
    old_value: string;
    key:
      | "name"
      | "description"
      | "discovery_splash_hash"
      | "banner_hash"
      | "preferred_locale"
      | "rules_channel_id"
      | "public_updates_channel_id"
      | "icon_hash"
      | "splash_hash"
      | "owner_id"
      | "region"
      | "afk_channel_id"
      | "vanity_url_code"
      | "widget_channel_id"
      | "system_channel_id"
      | "topic"
      | "application_id"
      | "permissions"
      | "allow"
      | "deny"
      | "code"
      | "channel_id"
      | "inviter_id"
      | "nick"
      | "avatar_hash"
      | "id";
  }
  | {
    new_value: number;
    old_value: number;
    key:
      | "afk_timeout"
      | "mfa_level"
      | "verification_level"
      | "explicit_content_filter"
      | "default_messagae_notifications"
      | "prune_delete_days"
      | "position"
      | "bitrate"
      | "rate_limit_per_user"
      | "color"
      | "max_uses"
      | "uses"
      | "max_age"
      | "expire_behavior"
      | "expire_grace_period"
      | "user_limit";
  }
  | {
    new_value: Partial<DiscordRole>;
    old_value: Partial<DiscordRole>;
    key: "$add" | "$remove";
  }
  | {
    new_value: boolean;
    old_value: boolean;
    key:
      | "widget_enabled"
      | "nsfw"
      | "hoist"
      | "mentionable"
      | "temporary"
      | "deaf"
      | "mute"
      | "enable_emoticons";
  }
  | {
    new_value: DiscordOverwrite[];
    old_value: DiscordOverwrite[];
    key: "permission_overwrites";
  }
  | {
    new_value: string | number;
    old_value: string | number;
    key: "type";
  };

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface DiscordGetGuildAuditLogParams {
  /** filter the log for actions made by a user */
  user_id: string;
  /** the type of audit log event */
  action_type: DiscordAuditLogEvent;
  /** filter the log before a certain entry id */
  before: string;
  /** how many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}

export interface DiscordGetAuditLogsOptions {
  /** Filter the logs for actions made by this user. */
  user_id?: string;
  /** The type of audit log. */
  action_type?: DiscordAuditLogEvent;
  /** Filter the logs before a certain log entry. */
  before?: string;
  /** How many entries are returned. Between 1-100. Default 50. */
  limit?: number;
}
