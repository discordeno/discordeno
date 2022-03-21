import { Bot } from "../bot.ts";
import { DiscordAuditLogEntry } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformAuditlogEntry(bot: Bot, payload: DiscordAuditLogEntry) {
  const auditlogEntry = {
    id: bot.transformers.snowflake(payload.id),
    changes: payload.changes?.map((change) => {
      switch (change.key) {
        case "$add":
        case "$remove":
          return {
            key: change.key,
            new: change.new_value?.map((val) => ({
              id: val.id ? bot.transformers.snowflake(val.id) : undefined,
              name: val.name,
            })),
            old: change.old_value?.map((val) => ({
              id: val?.id ? bot.transformers.snowflake(val.id) : undefined,
              name: val?.name,
            })),
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

  return auditlogEntry as Optionalize<typeof auditlogEntry>;
}

export interface AuditLogEntry extends ReturnType<typeof transformAuditlogEntry> {}
