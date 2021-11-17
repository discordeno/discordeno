import { AuditLogChange } from "./auditLogChange.ts";
import { AuditLogEvents } from "./auditLogEvents.ts";
import { OptionalAuditEntryInfo } from "./optionalAuditEntryInfo.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
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
  actionType: AuditLogEvents;
  /** Additional info for certain action types */
  options?: OptionalAuditEntryInfo;
  /** The reason for the change (0-512 characters) */
  reason?: string;
}
