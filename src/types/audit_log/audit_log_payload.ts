import { SnakeCaseProps } from "../util.ts";
import { AuditLogEntry } from "./audit_log_entry.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface AuditLogPayload {
  /** list of webhooks found in the audit log */
  webhooks: Webhook[];
  /** list of users found in the audit log */
  users: User[];
  /** list of audit log entries */
  auditLogEntriesA: AuditLogEntry[];
  /** list of partial integration objects */
  integrations: Partial<Integration>[];
}

export type DiscordAuditLogPayload = SnakeCaseProps<AuditLogPayload>;
