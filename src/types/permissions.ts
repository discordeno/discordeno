/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export enum BitwisePermissionFlags {
  /** allow creation of instant invites */
  CREATE_INSTANT_INVITE = 0x00000001,
  /** allows kicking members */
  KICK_MEMBERS = 0x00000002,
  /** allows banning members */
  BAN_MEMBERS = 0x00000004,
  /** allows all permissions and bypasses channel permission overwrites */
  ADMINISTRATOR = 0x00000008,
  /** allows management and editing of channels */
  MANAGE_CHANNELS = 0x00000010,
  /** allows management and editing of the guild */
  MANAGE_GUILD = 0x00000020,
  /** allows for the addition of reactions to messages */
  ADD_REACTIONS = 0x00000040,
  /** allows for viewing of audit logs */
  VIEW_AUDIT_LOG = 0x00000080,
  /** Allows for using priority speaker in a voice channel */
  PRIORITY_SPEAKER = 0x00000100,
  /** allows the user to go live */
  STREAM = 0x00000200,
  /** allows guild members to view a channel, which invludes reading messages in text channels */
  VIEW_CHANNEL = 0x00000400,
  /** allows dor sending messages in a channel */
  SEND_MESSAGES = 0x00000800,
  /** allows for sending of /tts messages */
  SEND_TTS_MESSAGES = 0x00001000,
  /** allows for deletion of other user messages */
  MANAGE_MESSAGES = 0x00002000,
  /** links sent by users with this permission will be auto-embedded */
  EMBED_LINKS = 0x00004000,
  /** allows for uploading images and files */
  ATTACH_FILES = 0x00008000,
  /** allows for reading of message history */
  READ_MESSAGE_HISTORY = 0x00010000,
  /** allows for using the everyone tag to notify users in a channel, and the here tag to notify all online users in a channel */
  MENTION_EVERYONE = 0x00020000,
  /** allows the usage of custom emojis from other servers */
  USE_EXTERNAL_EMOJIS = 0x00040000,
  /** allows for viewing guild insights */
  VIEW_GUILD_INSIGHTS = 0x00080000,
  /** allows for joining of a voice channel */
  CONNECT = 0x00100000,
  /** allows for speaking in a voice channel */
  SPEAK = 0x00200000,
  /** allows for muting members in a voice channel */
  MUTE_MEMBERS = 0x00400000,
  /** allows for deafening of members in a voice channel */
  DEAFEN_MEMBERS = 0x00800000,
  /** allows for moving members between voice channels */
  MOVE_MEMBERS = 0x01000000,
  /** allows for using voice-activity-detection in a voice channel */
  USE_VAD = 0x02000000,
  /** allows for modification of own nickname */
  CHANGE_NICKNAME = 0x04000000,
  /** allows for modification of other users nicknames */
  MANAGE_NICKNAMES = 0x08000000,
  /** allows management and editing of roles */
  MANAGE_ROLES = 0x10000000,
  /** allows management and editing of webhooks */
  MANAGE_WEBHOOKS = 0x20000000,
  /** allows management and editing of emojis */
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
