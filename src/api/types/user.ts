import { PremiumTypes, UserFlags, VisibilityTypes } from "../../types/mod.ts";
import { Integration } from "./guild.ts";

// used
export interface User {
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
  mfaEnabled?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** whether the email on this account has been verified */
  verified?: boolean;
  /** the user's email */
  email?: string | null;
  /** the flags on a user's account */
  flags?: UserFlags;
  /** the type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes;
  /** the public flags on a user's account */
  publicFlags?: UserFlags;
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export interface Connection {
  /** id of the connection account */
  id: string;
  /** the username of the connection account */
  name: string;
  /** the service of the connection (twitch, youtube) */
  type: string;
  /** whether the connection is revoked */
  revoked?: boolean;
  /** an array of partial server integration */
  integrations?: Partial<Integration>[];
  /** whether the connection is verified */
  verified: boolean;
  /** whhether friend sync is enabled for this connection */
  friendSync: boolean;
  /** whether activities related to this connection will be shown in presence updates */
  showActivity: boolean;
  /** visibility of this connection */
  visibility: VisibilityTypes;
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export interface ModifyCurrentUserOptions {
  /** user's username, if changed may cause the user's discriminator to be randomized */
  username: string;
  /** if passed, modifies the user's avatar */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
export interface GetCurrentUserGuildsOptions {
  /** get guilds before this guild ID, default: absent */
  before?: string;
  /** get guilds after this guild ID, default: absent */
  after?: string;
  /** max number of guilds to return (1-100), default: 100 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/user#create-dm */
export interface CreateDMOptions {
  /** the recipient to open a DM channel with */
  recipientID: string;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm */
export interface CreateGroupDMOptions {
  /** access tokens of users that have granted your app the gdm.join scope */
  accessTokens: string[];
  /** a dictionary of user ids to their respective nicknames */
  nick: {
    [nick: string]: string;
  };
}
