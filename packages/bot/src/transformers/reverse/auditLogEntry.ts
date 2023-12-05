import type { DiscordAuditLogEntry } from '@discordeno/types'
import { iconBigintToHash, type Bot } from '../../index.js'
import type { AuditLogEntry } from '../auditLogEntry.js'

export function transformAuditLogEntryToDiscordAuditLogEntry(bot: Bot, payload: AuditLogEntry): DiscordAuditLogEntry {
  return {
    id: bot.transformers.reverse.snowflake(payload.id),
    // @ts-expect-error: ts can't identify return type of switch case
    changes: payload.changes?.map((change) => {
      switch (change.key) {
        case '$add':
        case '$remove':
          return {
            key: change.key,
            new_value: (
              change.new as Array<{
                id: bigint | undefined
                name: string | undefined
              }>
            )?.map((val) => ({
              id: val.id ? bot.transformers.reverse.snowflake(val.id) : undefined,
              name: val.name,
            })),
            old_value: (
              change.old as
                | Array<{
                    id: bigint | undefined
                    name: string | undefined
                  }>
                | undefined
            )?.map((val) => ({
              id: val?.id ? bot.transformers.reverse.snowflake(val.id) : undefined,
              name: val?.name,
            })),
          }
        case 'rules_channel_id':
        case 'public_updates_channel_id':
        case 'owner_id':
        case 'widget_channel_id':
        case 'system_channel_id':
        case 'application_id':
        case 'permissions':
        case 'allow':
        case 'deny':
        case 'channel_id':
        case 'inviter_id':
        case 'id':
          return {
            key: change.key,
            old_value: change.old ? bot.transformers.reverse.snowflake(change.old as bigint) : '',
            new_value: change.new ? bot.transformers.reverse.snowflake(change.new as bigint) : '',
          }
        case 'discovery_splash_hash':
        case 'banner_hash':
        case 'icon_hash':
        case 'image_hash':
        case 'splash_hash':
        case 'avatar_hash':
          return {
            key: change.key,
            old_value: change.old ? iconBigintToHash(change.old as bigint) : '',
            new_value: change.new ? iconBigintToHash(change.new as bigint) : '',
          }
        case 'name':
        case 'description':
        case 'preferred_locale':
        case 'region':
        case 'afk_channel_id':
        case 'vanity_url_code':
        case 'topic':
        case 'code':
        case 'nick':
        case 'location':
          return {
            key: change.key,
            old_value: change.old,
            new_value: change.new,
          }
        case 'afk_timeout':
        case 'mfa_level':
        case 'verification_level':
        case 'explicit_content_filter':
        case 'default_message_notifications':
        case 'prune_delete_days':
        case 'position':
        case 'bitrate':
        case 'rate_limit_per_user':
        case 'color':
        case 'max_uses':
        case 'uses':
        case 'max_age':
        case 'expire_behavior':
        case 'expire_grace_period':
        case 'user_limit':
        case 'privacy_level':
        case 'entity_type':
        case 'status':
          return {
            key: change.key,
            old_value: change.old ? Number(change.old) : '',
            new_value: change.new ? Number(change.new) : '',
          }
        case 'widget_enabled':
        case 'nsfw':
        case 'hoist':
        case 'mentionable':
        case 'temporary':
        case 'deaf':
        case 'mute':
        case 'enable_emoticons':
          return {
            key: change.key,
            old_value: change.old,
            new_value: change.new,
          }
        case 'permission_overwrites':
          return {
            key: change.key,
            old_value: change.old,
            new_value: change.new,
          }
        default:
          return {
            key: change.key,
            old_value: change.old,
            new_value: change.new,
          }
      }
    }),
    user_id: payload.userId ? bot.transformers.reverse.snowflake(payload.userId) : null,
    target_id: payload.targetId ? bot.transformers.reverse.snowflake(payload.targetId) : null,
    action_type: payload.actionType,

    options: payload.options
      ? {
          // respect transformer as reference than type
          delete_member_days: payload.options.deleteMemberDays === 0 ? payload.options.deleteMemberDays.toString() : '',
          members_removed: payload.options.membersRemoved === 0 ? payload.options.membersRemoved.toString() : '',
          channel_id: payload.options.channelId ? bot.transformers.reverse.snowflake(payload.options.channelId) : '',
          message_id: payload.options.messageId ? bot.transformers.reverse.snowflake(payload.options.messageId) : '',
          count: payload.options.count === 0 ? payload.options.count.toString() : '',
          id: payload.options.id ? bot.transformers.reverse.snowflake(payload.options.id) : '',
          type: payload.options.type.toString(),
          role_name: payload.options.roleName,
          // make up value to make ts shut up, the orginal value do not persevere in transformer
          application_id: '',
          auto_moderation_rule_name: payload.options.autoModerationRuleName,
          auto_moderation_rule_trigger_type: payload.options.autoModerationRuleTriggerType,
          integration_type: payload.options.integrationType,
        }
      : undefined,
    reason: payload.reason,
  }
}
