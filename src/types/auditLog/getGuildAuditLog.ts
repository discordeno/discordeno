import { AuditLogEvents } from "./auditLogEvents.ts";

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Filter the log for actions made by a user */
  userId?: bigint | string;
  /** The type of audit log event */
  actionType?: AuditLogEvents;
  /** Filter the log before a certain entry id */
  before?: bigint | string;
  /** How many entries are returned (default 50, minimum 1, maximum 100) */
  limit?: number;
}
