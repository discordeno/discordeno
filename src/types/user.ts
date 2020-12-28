/** https://discord.com/developers/docs/resources/user#users-resource */
export interface UserPayload {
  /**the user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** the user's 4-digit discord-tag */
  discriminator: string;
  /** the user's avatar hash */
  avatar: string | null;
  /** whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** whether the user has two factor enabled on their account */
  mfa_enabled?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** whether the email on this account has been verified */
  verified?: boolean;
  /** the user's email */
  email?: string | null;
  /** the flags on a user's account */
  flags?: UserFlags;
  /** the type of Nitro subscription on a user's account */
  premium_type?: PremiumTypes;
  /** the public flags on a user's account */
  public_flags?: UserFlags;
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export enum UserFlags {
  NONE = 0,
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPE_SQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  SYSTEM = 1 << 12,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export enum PremiumTypes {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export interface ConnectionPayload {
  /** id of the connection account */
  id: string;
  /** the username of the connection account */
  name: string;
  /** the service of the connection (twitch, youtube) */
  type: string;
  /** whether the connection is revoked */
  revoked?: boolean;
  /** an array of partial server integration */
  integrations?: Partial<IntegrationPayload>[];
  /** whether the connection is verified */
  verified: boolean;
  /** whhether friend sync is enabled for this connection */
  friend_sync: boolean;
  /** whether activities related to this connection will be shown in presence updates */
  show_activity: boolean;
  /** visibility of this connection */
  visibility: VisibilityTypes;
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export enum VisibilityTypes {
  /** invisible to everyone except the user themselves */
  NONE = 0,
  /** visible to everyone */
  EVERYONE = 1,
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export interface ModifyCurrentUserParams {
  /** user's username, if changed may cause the user's discriminator to be randomized */
  username: string;
  /** if passed, modifies the user's avatar */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
export interface GetCurrentUserGuildsParams {
  /** get guilds before this guild ID, default: absent */
  before?: string;
  /** get guilds after this guild ID, default: absent */
  after?: string;
  /** max number of guilds to return (1-100), default: 100 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/user#create-dm */
export interface CreateDMParams {
  /** the recipient to open a DM channel with */
  recipient_id: string;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm */
export interface CreateGroupDMParams {
  /** access tokens of users that have granted your app the gdm.join scope */
  access_tokens: string[];
  /** a dictionary of user ids to their respective nicknames */
  nick: {
    [nick: string]: string;
  };
}
