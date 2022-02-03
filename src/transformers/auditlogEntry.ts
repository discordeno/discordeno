import { Bot } from "../bot.ts";
import { AuditLogEntry } from "../types/auditLog/auditLogEntry.ts";
import { AuditLogEvents } from "../types/auditLog/auditLogEvents.ts";
import { DiscordOverwrite, Overwrite } from "../types/channels/overwrite.ts";
import { Role } from "../types/permissions/role.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";

export function transformAuditlogEntry(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<AuditLogEntry>,
): DiscordenoAuditLogEntry {
  return {
    id: bot.transformers.snowflake(payload.id),
    // @ts-ignore TODO FIX THIS
    changes: payload.changes?.map((change) => {
      switch (change.key) {
        case "$add":
        case "$remove":
          return {
            key: change.key,
            new: {
              id: change.new_value.id ? bot.transformers.snowflake(change.new_value.id) : undefined,
              name: change.new_value.name,
            },
            old: {
              id: change.old_value?.id ? bot.transformers.snowflake(change.old_value.id) : undefined,
              name: change.old_value?.name,
            },
          };
        case "discovery_splash_hash":
        case "banner_hash":
        case "rules_channel_id":
        case "public_updates_channel_id":
        case "icon_hash":
        case "splash_hash":
        case "owner_id":
        case "widget_channel_id":
        case "system_channel_id":
        case "application_id":
        case "permissions":
        case "allow":
        case "deny":
        case "channel_id":
        case "inviter_id":
        case "avatar_hash":
        case "id":
          return {
            key: change.key,
            old: change.old_value ? bot.transformers.snowflake(change.old_value) : undefined,
            new: change.new_value ? bot.transformers.snowflake(change.new_value) : undefined,
          };
        case "name":
        case "description":
        case "preferred_locale":
        case "region":
        case "afk_channel_id":
        case "vanity_url_code":
        case "topic":
        case "code":
        case "nick":
        case "location":
          return {
            key: change.key,
            old: change.old_value,
            new: change.new_value,
          };
        case "afk_timeout":
        case "mfa_level":
        case "verification_level":
        case "explicit_content_filter":
        case "default_messagae_notifications":
        case "prune_delete_days":
        case "position":
        case "bitrate":
        case "rate_limit_per_user":
        case "color":
        case "max_uses":
        case "uses":
        case "max_age":
        case "expire_behavior":
        case "expire_grace_period":
        case "user_limit":
        case "privacy_level":
        case "entity_type":
        case "status":
          return {
            key: change.key,
            old: change.old_value ? Number(change.old_value) : undefined,
            new: change.new_value ? Number(change.new_value) : undefined,
          };
        case "widget_enabled":
        case "nsfw":
        case "hoist":
        case "mentionable":
        case "temporary":
        case "deaf":
        case "mute":
        case "enable_emoticons":
          return {
            key: change.key,
            old: change.old_value ?? false,
            new: change.new_value ?? false,
          };
        case "permission_overwrites":
          return {
            key: change.key,
            old: change.old_value,
            new: change.new_value,
          };
        default:
          return {
            key: change.key,
            old: change.old_value,
            new: change.new_value,
          };
      }
    }),
    userId: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    targetId: payload.target_id ? bot.transformers.snowflake(payload.target_id) : undefined,
    actionType: payload.action_type,
    options: payload.options
      ? {
        deleteMemberDays: payload.options.delete_member_days ? Number(payload.options.delete_member_days) : 0,
        membersRemoved: payload.options.members_removed ? Number(payload.options.members_removed) : 0,
        channelId: payload.options.channel_id ? bot.transformers.snowflake(payload.options.channel_id) : undefined,
        messageId: payload.options.message_id ? bot.transformers.snowflake(payload.options.message_id) : undefined,
        count: payload.options.count ? Number(payload.options.count) : 0,
        id: payload.options.id ? bot.transformers.snowflake(payload.options.id) : undefined,
        type: Number(payload.options.type),
        roleName: payload.options.role_name,
      }
      : undefined,
    reason: payload.reason,
  };
}

export interface DiscordenoAuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  targetId?: bigint;
  /** Changes made to the `target_id` */
  changes?: DiscordenoAuditLogChange[];
  /** The user who made the changes */
  userId?: bigint;
  /** id of the entry */
  id: bigint;
  /** Type of action that occured */
  actionType: AuditLogEvents;
  /** Additional info for certain action types */
  options?: {
    /** Number of days after which inactive members were kicked */
    deleteMemberDays: number;
    /** Number of members removed by the prune */
    membersRemoved: number;
    /** Channel in which the entities were targeted */
    channelId?: bigint;
    /** id of the message that was targeted, types: MESSAGE_PIN & MESSAGE_UNPIN & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE */
    messageId?: bigint;
    /** Number of entities that were targeted */
    count: number;
    /** id of the overwritten entity */
    id?: bigint;
    /** type of overwritten entity - "0", for "role", or "1" for "member" */
    type?: number;
    /** Name of the role if type is "0" (not present if type is "1") */
    roleName?: string;
  };
  /** The reason for the change (0-512 characters) */
  reason?: string;
}

export type DiscordenoAuditLogChange =
  | {
    new: bigint;
    old: bigint;
    key:
      | "discovery_splash_hash"
      | "banner_hash"
      | "rules_channel_id"
      | "public_updates_channel_id"
      | "icon_hash"
      | "splash_hash"
      | "owner_id"
      | "widget_channel_id"
      | "system_channel_id"
      | "application_id"
      | "permissions"
      | "allow"
      | "deny"
      | "channel_id"
      | "inviter_id"
      | "avatar_hash"
      | "id";
  }
  | {
    new: string;
    old: string;
    key:
      | "name"
      | "description"
      | "preferred_locale"
      | "region"
      | "afk_channel_id"
      | "vanity_url_code"
      | "topic"
      | "code"
      | "nick";
  }
  | {
    new: number;
    old: number;
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
      | "user_limit"
      | "privacy_level";
  }
  | {
    new: {
      name: string;
      id: bigint;
    };
    old: {
      name: string;
      id: bigint;
    };
    key: "$add" | "$remove";
  }
  | {
    new: boolean;
    old: boolean;
    key: "widget_enabled" | "nsfw" | "hoist" | "mentionable" | "temporary" | "deaf" | "mute" | "enable_emoticons";
  }
  | {
    new: DiscordOverwrite[];
    old: DiscordOverwrite[];
    key: "permission_overwrites";
  }
  | {
    new: string | number;
    old: string | number;
    key: "type";
  };
