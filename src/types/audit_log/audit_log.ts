import { Integration } from "../integration/integration.ts";
import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { Webhook } from "../webhooks/webhook.ts";
import { AuditLogEntry } from "./audit_log_entry.ts";

export interface AuditLog {
  /** List of webhooks found in the audit log */
  webhooks: Webhook[];
  /** List of users found in the audit log */
  users: User[];
  /** List of audit log entries */
  auditLogEntries: AuditLogEntry[];
  /** List of partial integration objects */
  integrations: Partial<Integration>[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export type DiscordAuditLog = SnakeCasedPropertiesDeep<AuditLog>;
