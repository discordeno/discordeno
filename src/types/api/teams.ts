import { DiscordBaseUser } from "./mod.ts";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam {
  /** a hash of the image of the team's icon */
  icon: string | null;
  /** the unique id of the team */
  id: string;
  /** the members of the team */
  members: DiscordTeamMembers[];
  /** the user id of the current team owner */
  owner_user_id: string;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface DiscordTeamMembers {
  /** the user's membership state on the team */
  membership_state: keyof typeof DiscordMembershipState;
  /** will always be ["*"] */
  permissions: string[];
  /** the id of the parent team of which they are a member */
  team_id: string;
  /** the avatar, discriminator, id, and username of the user */
  user: DiscordBaseUser;
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum DiscordMembershipState {
  INVITED = 1,
  ACCEPTED,
}
