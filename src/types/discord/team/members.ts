import { DiscordBaseUser } from "../member/user/base.ts";
import { DiscordMembershipState } from "./state.ts";

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface DiscordTeamMembers {
  /** the user's membership state on the team */
  // deno-lint-ignore camelcase
  membership_state: keyof typeof DiscordMembershipState;
  /** will always be ["*"] */
  permissions: string[];
  /** the id of the parent team of which they are a member */
  // deno-lint-ignore camelcase
  team_id: string;
  /** the avatar, discriminator, id, and username of the user */
  user: DiscordBaseUser;
}
