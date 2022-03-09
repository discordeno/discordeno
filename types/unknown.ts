import { OAuth2Scopes } from "./discordeno.ts";

/** https://discord.com/developers/docs/resources/user#create-dm */
export interface CreateDM {
  /** The recipient to open a DM channel with */
  recipientId: string;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm */
export interface CreateGroupDM {
  /** Access tokens of users that have granted your app the `gdm.join` scope */
  accessTokens: string[];
  /** A dictionary of user ids to their respective nicknames */
  nicks: Record<string, string>;
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export interface ModifyCurrentUser {
  /** User's username, if changed may cause the user's discriminator to be randomized. */
  username?: string;
  /** If passed, modifies the user's avatar */
  avatar?: string;
}

/** https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters */
export interface BotAuthenticationFlowQuery {
  /** App's client id */
  clientId: string;
  /** Needs to include bot for the bot flow */
  scope: OAuth2Scopes[];
  /** The permissions you're requesting */
  permissions: string;
  /** Pre-fills the dropdown picker with a guild for the user */
  guildId: string;
  /** True or false—disallows the user from changing the guild dropdown */
  disableGuildSelect: boolean;
}
