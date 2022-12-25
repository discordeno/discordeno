import type { Camelize, DiscordAuditLogEntry } from '@discordeno/types'

export function c1amelize1AuditLogEntry (payload: DiscordAuditLogEntry): Camelize<DiscordAuditLogEntry> {
  return {
    id: payload.id,
    reason: payload.reason,

    userId: payload.user_id,
    targetId: payload.target_id,
    actionType: payload.action_type,

    changes: payload.changes?.map(change => ({
      key: change.key,

      oldValue: change.old_value,
      newValue: change.new_value
    }))
  }
}
