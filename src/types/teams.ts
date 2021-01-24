import { UserPayload } from "./guild.ts";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface TeamPayload {
  /** a hash of the image of the team's icon */
  icon: string | null;
  /** the unique id of the team */
  id: string;
  /** the members of the team */
  members: TeamMembersPayload[];
  /** the user id of the current team owner */
  owner_user_id: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface TeamMembersPayload {
  /** the user's membership state on the team */
  membership_state: MembershipState;
  /** will always be ["*"] */
  permissions: string[];
  /** the id of the parent team of which they are a member */
  team_id: string;
  /** the avatar, discriminator, id, and username of the user */
  user: Partial<UserPayload>;
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum MembershipState {
  INVITED = 1,
  ACCEPTED,
}
