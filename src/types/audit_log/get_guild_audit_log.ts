import { SnakeCaseProps } from "../util.ts";
import { AuditLogEvents } from "./audit_log_events.ts";

export interface GetGuildAuditLog {
  /** Filter the log for actions made by a user */
  userId: string;
  /** The type of audit log event */
  actionType: AuditLogEvents;
  /** Filter the log before a certain entry id */
  before: string;
  /** How many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export type DiscordGetGuildAuditLog = SnakeCaseProps<GetGuildAuditLog>;
