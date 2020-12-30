import { UserPayload } from "./user.ts";

/** https://discord.com/developers/docs/topics/teams#data-models */
export interface TeamPayload {
  /** a hash of the image of the team's icon */
  icon: string | null;
  /** the unique id of the team */
  id: string;
  /** the members of the team */
  members: TeamMemberPayload[];
  /** the user id of the current team owner */
  owner_user_id: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models */
export interface TeamMemberPayload {
  /** the user's membership state on the team */
  membership_state: MembershipState;
  /** will always be ["*"] */
  permissions: string[];
  /** the id of the parent team of which they are a member */
  team_id: string;
  /** the avatar, discriminator, id, and username of the user */
  user: Partial<UserPayload>;
}

/** https://discord.com/developers/docs/topics/teams#data-models */
export enum MembershipState {
  INVITED = 1,
  ACCEPTED,
}
