import { SnakeCaseProps } from "../util.ts";
import { AuditLogChangeValue } from "./audit_log_change_value.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface AuditLogChange {
  /** new value of the key. If not present, while oldValue is, that means the property that was changed has been reset */
  newValue?: AuditLogChangeValue;
  /** old value of the key */
  oldValue?: AuditLogChangeValue;
  /** name of audit log change key */
  key: string;
}

export type DiscordAuditLogChange = SnakeCaseProps<AuditLogChange>;
