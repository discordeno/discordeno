import { SnakeCaseProps } from "../util.ts";
import { AuditLogChange } from "./audit_log_change.ts";
import { AuditLogEvent } from "./audit_log_event.ts";
import { OptionalAuditEntryInfo } from "./optional_audit_entry_info.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface AuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  targetId: string | null;
  /** changes made to the target_id */
  changes?: AuditLogChange[];
  /** the user who made the changes */
  userId: string;
  /** id of the entry */
  id: string;
  /** type of action that occured */
  actionType: AuditLogEvent;
  /** additional info for certain action types */
  options?: OptionalAuditEntryInfo;
  /** the reason for the change (0-512 characters) */
  reason?: string;
}

export type DiscordAuditLogEntry = SnakeCaseProps<AuditLogEntry>;
