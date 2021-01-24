import { Guild } from "../api/structures/mod.ts";
import { ChannelCreatePayload } from "./channel.ts";
import { UserPayload } from "./guild.ts";

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface InvitePayload {
  /** the invite code (unique ID) */
  code: string;
  /** the guild this invite is for */
  guild?: Partial<Guild>;
  /** the channel this invite is for */
  channel: Partial<ChannelCreatePayload>;
  /** the user who created the invite */
  inviter?: UserPayload;
  /** the target user for this invite */
  target_user?: Partial<UserPayload>;
  /** the type of user target for this invite */
  target_user_type?: InviteTargetUserTypes;
  /** approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number;
  /** approximate count of total members */
  approximate_member_count: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export enum InviteTargetUserTypes {
  STREAM = 1,
}
