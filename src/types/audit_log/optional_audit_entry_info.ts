import { SnakeCaseProps } from "../util.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface OptionalAuditEntryInfo {
  /** number of days after which inactive members were kicked, type: MEMBER_PRUNE */
  deleteMemberDays: string;
  /** number of members removed by the prune, type: MEMBER_PRUNE */
  membersRemoved: string;
  /** channel in which the entities were targeted, types: MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE */
  channelId: string;
  /** id of the message that was targeted, types: MESSAGE_PIN & MESSAGE_UNPIN */
  messageId: string;
  /** number of entities that were targeted, types: MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE */
  count: string;
  /** id of the overwritten entity, types CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  id: string;
  /** type of overwritten entity - "0", for "role", or "1" for "member", types: CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  type: string;
  /** name of the role if type is "0" (not present if type is "1"), types: CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE */
  roleName: string;
}

export type DiscordOptionalAuditEntryInfo = SnakeCaseProps<
  OptionalAuditEntryInfo
>;
