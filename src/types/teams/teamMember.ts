import { User } from "../users/user.ts";
import { TeamMembershipStates } from "./teamMembershipStates.ts";

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface TeamMember {
  /** The user's membership state on the team */
  membershipState: TeamMembershipStates;
  /** Will always be `["*"]` */
  permissions: ["*"];
  /** The id of the parent team of which they are a member */
  teamId: string;
  /** The avatar, discriminator, id, and username of the user */
  user: Partial<User> & Pick<User, "avatar" | "discriminator" | "id" | "username">;
}
