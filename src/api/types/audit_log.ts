import { AuditLogEvent } from "../../types/mod.ts";
import { ChannelTypes, Overwrite } from "./channel.ts";
import { Integration } from "./guild.ts";
import { Role } from "./permissions.ts";
import { User } from "./user.ts";
import { Webhook } from "./webhook.ts";

export { AuditLogEvent };

// used
export interface AuditLog {
  /** list of webhooks found in the audit log */
  webhooks: Webhook[];
  /** list of users found in the audit log */
  users: User[];
  /** list of audit log entries */
  auditLogEntries: AuditLogEntry[];
  /** list of partial integration objects */
  integrations: Partial<Integration>[];
}

// used
export interface AuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  targetID: string | null;
  /** changes made to the targetId */
  changes?: AuditLogChange[];
  /** the user who made the changes */
  userID: string;
  /** id of the entry */
  id: string;
  /** type of action that occured */
  actionType: AuditLogEvent;
  /** additional info for certain action types */
  options?: OptionalAuditEntryInfo;
  /** the reason for the change (0-512 characters) */
  reason?: string;
}

// used
export interface OptionalAuditEntryInfo {
  /** number of days after which inactive members were kicked, type: MEMBERPRUNE */
  deleteMessageDays: string;
  /** number of members removed by the prune, type: MEMBERPRUNE */
  membersRemoved: string;
  /** channel in which the entities were targeted, types: MEMBERMOVE & MESSAGEPIN & MESSAGEUNPIN & MESSAGEDELETE */
  channelID: string;
  /** id of the message that was targeted, types: MESSAGEPIN & MESSAGEUNPIN */
  messageID: string;
  /** number of entities that were targeted, types: MESSAGEDELETE & MESSAGEBULKDELETE & MEMBERDISCONNECT & MEMBERMOVE */
  count: string;
  /** id of the overwritten entity, types CHANNELOVERWRITECREATE & CHANNELOVERWRITEUPDATE & CHANNELOVERWRITEDELETE */
  id: string;
  /** type of overwritten entity - "0", for "role", or "1" for "member", types: CHANNELOVERWRITECREATE & CHANNELOVERWRITEUPDATE & CHANNELOVERWRITEDELETE */
  type: "0" | "1";
  /** name of the role if type is "0" (not present if type is "1"), types: CHANNELOVERWRITECREATE & CHANNELOVERWRITEUPDATE & CHANNELOVERWRITEDELETE */
  roleName: string;
}

// used
export interface AuditLogChange {
  /** new value of the key */
  newValue?: AuditLogChangeKey;
  /** old value of the key */
  oldValue?: AuditLogChangeKey;
  /** name of audit log change key */
  key: string;
}

// used
export interface AuditLogChangeKey {
  /** object: guild; name changed */
  name: string;
  /** object: guild; icon changed */
  iconHash: string;
  /** object: guild; invite splash page artwork changed */
  splashHash: string;
  /** object: guild; owner changed */
  ownerID: string;
  /** object: guild; region changed */
  region: string;
  /** object: guild; afk channel changed */
  afkChannelID: string;
  /** object: guild; afk timeout duration changed */
  afkTimeout: number;
  /** object: guild; two-factor auth requirement changed */
  mfaLevel: number;
  /** object: guild; required verification level changed */
  verificationLevel: number;
  /** object: guild; change in whose messages are scanned and deleted for explicit content in the server */
  explicitContentFilter: number;
  /** object: guild; default message notification level changed */
  defaultMessageNotifications: number;
  /** object: guild; guild invite vanity url changed */
  vanityUrlCode: string;
  /** object: guild; new role added */
  $add: Partial<Role>[];
  /** object: guild; role removed */
  $remove: Partial<Role>[];
  /** object: guild;  change in number of days after which inactive and role-unassigned members are kicked */
  pruneDeleteDays: number;
  /** object: guild; server widget enabled/disable */
  widgetEnabled: boolean;
  /** object: guild; channel id of the servere widget changed */
  widgetChannelID: string;
  /** object: guild; id of the system channel changed */
  systemChannelID: string;
  /** object: channel; text or voice channel position changed */
  position: number;
  /** object: channel; text channel topic changed */
  topic: string;
  /** object: channel; voice channel bitrate changed */
  bitrate: number;
  /** object: channel; permissions on a channel changed */
  overwrites: Overwrite[];
  /** object: channel; channel nsfw restriction changed */
  nsfw: boolean;
  /** object: channel; application id of the added or removed webhook or bot */
  applicationID: string;
  /** object: channel; amount of seconds a user has to wait before sending another message changed */
  slowmode: number;
  /** object: role; permissions for a role changed */
  permissions: string;
  /** object: role; role color changed */
  color: number;
  /** object: role; role is now displayed/no longer displayed seperate from online users */
  hoist: boolean;
  /** object: role; rrole is now mentionable/unmentionable */
  mentionable: boolean;
  /** object: role; a permission on a text or voice channel was allowed for a role */
  allow: string;
  /** object: role; a permission on a text or voice channel was denied for a role */
  deny: string;
  /** object: invite; invite code changed */
  code: string;
  /** object: invite; channel for invite code changed */
  channelID: string;
  /** object: invite; person who created invite code changed */
  inviteID: string;
  /** object: invite; change to max number of times invite code can be used */
  maxUses: number;
  /** object: invite; number of times invite code used changed */
  uses: number;
  /** object: invite; how long invite code lasts changed */
  maxAge: number;
  /** object: invite; invite code is temporary/never expires */
  temporary: boolean;
  /** object: user; user server deafened/undeafened */
  deaf: boolean;
  /** object: user; user server muted/unmuted */
  mute: boolean;
  /** object: user; user nickanem changed */
  nick: string;
  /** object: user; user avatar changed */
  avatarHash: string;
  /** object: any; the id of the changed entity - sometimes used in conjunction with other keys */
  id: string;
  /** object: any; type of entity created */
  type: ChannelTypes | string;
  /** object: integration; integration emoticons enabled/disabled */
  enableEmoticons: boolean;
  /** object: integration; integration expiring subscriber behavior changed */
  expireBehavior: number;
  /** object: integration; integration expire grace period changed */
  expireGracePeriod: number;
}

// used
export interface GetGuildAuditLogOptions {
  /** filter the log for actions made by a user */
  userID: string;
  /** the type of audit log event */
  actionType: AuditLogEventType;
  /** filter the log before a certain entry id */
  before: string;
  /** how many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}

// used
export type AuditLogEventType =
  | "GUILD_UPDATE"
  | "CHANNEL_CREATE"
  | "CHANNEL_UPDATE"
  | "CHANNEL_DELETE"
  | "CHANNEL_OVERWRITE_CREATE"
  | "CHANNEL_OVERWRITE_UPDATE"
  | "CHANNEL_OVERWRITE_DELETE"
  | "MEMBER_KICK"
  | "MEMBER_PRUNE"
  | "MEMBER_BAN_ADD"
  | "MEMBER_BAN_REMOVE"
  | "MEMBER_UPDATE"
  | "MEMBER_ROLE_UPDATE"
  | "MEMBER_MOVE"
  | "MEMBER_DISCONNECT"
  | "BOT_ADD"
  | "ROLE_CREATE"
  | "ROLE_UPDATE"
  | "ROLE_DELETE"
  | "INVITE_CREATE"
  | "INVITE_UPDATE"
  | "INVITE_DELETE"
  | "WEBHOOK_CREATE"
  | "WEBHOOK_UPDATE"
  | "WEBHOOK_DELETE"
  | "EMOJI_CREATE"
  | "EMOJI_UPDATE"
  | "EMOJI_DELETE"
  | "MESSAGE_DELETE"
  | "MESSAGE_BULK_DELETE"
  | "MESSAGE_PIN"
  | "MESSAGE_UNPIN"
  | "INTEGRATION_CREATE"
  | "INTEGRATION_UPDATE"
  | "INTEGRATION_DELETE";
