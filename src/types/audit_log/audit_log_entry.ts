import { SnakeCasedPropertiesDeep } from "../util.ts";
import { AuditLogChange } from "./audit_log_change.ts";
import { DiscordAuditLogEvents } from "./audit_log_events.ts";
import { OptionalAuditEntryInfo } from "./optional_audit_entry_info.ts";

export interface AuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  targetId: string | null;
  /** Changes made to the `target_id` */
  changes?: AuditLogChange[];
  /** The user who made the changes */
  userId: string | null;
  /** id of the entry */
  id: string;
  /** Type of action that occured */
  actionType: DiscordAuditLogEvents;
  /** Additional info for certain action types */
  options?: OptionalAuditEntryInfo;
  /** The reason for the change (0-512 characters) */
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export type DiscordAuditLogEntry = SnakeCasedPropertiesDeep<AuditLogEntry>;
