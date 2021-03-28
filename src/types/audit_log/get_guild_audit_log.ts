import { AuditLogEvent } from "./audit_log_event.ts";

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** filter the log for actions made by a user */
  userId: string;
  /** the type of audit log event */
  actionType: AuditLogEvent;
  /** filter the log before a certain entry id */
  before: string;
  /** how many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}
