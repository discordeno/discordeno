/** https://discord.com/developers/docs/topics/permissions#permissions */
export enum BitwisePermissionFlags {
  CREATE_INSTANT_INVITE = 0x00000001,
  KICK_MEMBERS = 0x00000002,
  BAN_MEMBERS = 0x00000004,
  ADMINISTRATOR = 0x00000008,
  MANAGE_CHANNELS = 0x00000010,
  MANAGE_GUILD = 0x00000020,
  ADD_REACTIONS = 0x00000040,
  VIEW_AUDIT_LOG = 0x00000080,
  VIEW_CHANNEL = 0x00000400,
  SEND_MESSAGES = 0x00000800,
  SEND_TTS_MESSAGES = 0x00001000,
  MANAGE_MESSAGES = 0x00002000,
  EMBED_LINKS = 0x00004000,
  ATTACH_FILES = 0x00008000,
  READ_MESSAGE_HISTORY = 0x00010000,
  MENTION_EVERYONE = 0x00020000,
  USE_EXTERNAL_EMOJIS = 0x00040000,
  CONNECT = 0x00100000,
  SPEAK = 0x00200000,
  MUTE_MEMBERS = 0x00400000,
  DEAFEN_MEMBERS = 0x00800000,
  MOVE_MEMBERS = 0x01000000,
  USE_VAD = 0x02000000,
  PRIORITY_SPEAKER = 0x00000100,
  STREAM = 0x00000200,
  CHANGE_NICKNAME = 0x04000000,
  MANAGE_NICKNAMES = 0x08000000,
  MANAGE_ROLES = 0x10000000,
  MANAGE_WEBHOOKS = 0x20000000,
  MANAGE_EMOJIS = 0x40000000,
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface RolePayload {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** number representation of hexadecimal color code */
  color: number;
  /** if this role is pinned in the user listing */
  hoist: boolean;
  /** position of this role */
  position: number;
  /** permission bit set */
  permissions: string;
  /** whether this role is managed by an integration */
  managed: boolean;
  /** whether this role is mentionable */
  mentionable: boolean;
  /** the tags this role has */
  tags?: RoleTagsPayload;
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RoleTagsPayload {
  /** the id of the bot this role belongs to */
  bot_id?: string;
  /** the id of the integration this role belongs to */
  integration_id?: string;
  /** whether this is the guild's premium subscriber role */
  premium_subscriber?: null;
}
