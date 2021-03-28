export interface ModifyCurrentUser {
  /** User's username, if changed may cause the user's discriminator to be randomized. */
  username?: string;
  /** If passed, modifies the user's avatar */
  avatar?: string;
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export type DiscordModifyCurrentUser = ModifyCurrentUser;
