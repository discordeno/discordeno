/** Types for: https://discord.com/developers/docs/resources/audit-log */

import type { AuditLogEvents } from '../discord/auditLog.js';
import type { BigString } from '../shared.js';

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-params */
export interface GetGuildAuditLog {
  /** Entries from a specific user ID */
  userId?: BigString;
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents;
  /** Entries with ID less than a specific audit log entry ID. */
  before?: BigString;
  /** Entries with ID greater than a specific audit log entry ID. */
  after?: BigString;
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number;
}
