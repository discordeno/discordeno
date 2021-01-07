import { Channel } from "./channel.ts";
import { Guild } from "./guild.ts";
import { User } from "./user.ts";

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface Invite {
  /** the invite code (unique ID) */
  code: string;
  /** the guild this invite is for */
  guild?: Partial<Guild>;
  /** the channel this invite is for */
  channel: Partial<Channel>;
  /** the user who created the invite */
  inviter?: User;
  /** the target user for this invite */
  targetUser?: Partial<User>;
  /** the type of user target for this invite */
  targetUserType?: InviteTargetUserType;
  /** approximate count of online members (only present when targetUser is set) */
  approximatePresenceCount?: number;
  /** approximate count of total members */
  approximateMemberCount: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export type InviteTargetUserType = "STREAM";

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export interface InviteMetadata extends Invite {
  /** number of times this invite has been used */
  uses: number;
  /** max number of times this invite can be used */
  maxUses: number;
  /** duration (in seconds) after which the invite expires */
  maxAge: number;
  /** whether this invite only grants temporary membership */
  temporary: boolean;
  /** when this invite was created */
  createdAt: string;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInviteURLOptions {
  /** whether the invite should contain approximate member counts */
  withCounts?: boolean;
}
