import { PartialUser } from "../users/partial_user.ts";
import { SnakeCaseProps } from "../util.ts";
import { DiscordTeamMembershipStates } from "./team_membership_states.ts";

export interface TeamMember {
  /** The user's membership state on the team */
  membershipState: DiscordTeamMembershipStates;
  /** Will always be `["*"]` */
  permissions: ["*"];
  /** The id of the parent team of which they are a member */
  teamId: string;
  /** The avatar, discriminator, id, and username of the user */
  user: PartialUser;
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export type DiscordTeamMember = SnakeCaseProps<TeamMember>;
