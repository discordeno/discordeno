import { DiscordChannel, DiscordGuild, DiscordUser } from "./mod.ts";

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface DiscordInvite {
  /** the invite code (unique ID) */
  code: string;
  /** the guild this invite is for */
  guild?: Partial<DiscordGuild>;
  /** the channel this invite is for */
  channel: Partial<DiscordChannel>;
  /** the user who created the invite */
  inviter?: DiscordUser;
  /** the target user for this invite */
  target_user?: Partial<DiscordUser>;
  /** the type of user target for this invite */
  target_user_type?: DiscordInviteTargetUserTypes;
  /** approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number;
  /** approximate count of total members */
  approximate_member_count: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export enum DiscordInviteTargetUserTypes {
  STREAM = 1,
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export interface DiscordInviteMetadata extends DiscordInvite {
  /** number of times this invite has been used */
  uses: number;
  /** max number of times this invite can be used */
  max_uses: number;
  /** duration (in seconds) after which the invite expires */
  max_age: number;
  /** whether this invite only grants temporary membership */
  temporary: boolean;
  /** when this invite was created */
  created_at: string;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface DiscordGetInviteURLParams {
  /** whether the invite should contain approximate member counts */
  with_counts?: boolean;
}
