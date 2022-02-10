import { Bot } from "../bot.ts";
import { Team } from "../types/teams/team.ts";
import { TeamMembershipStates } from "../types/teams/teamMembershipStates.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";

export function transformTeam(bot: Bot, payload: SnakeCasedPropertiesDeep<Team>): DiscordenoTeam {
  const id = bot.transformers.snowflake(payload.id);

  return {
    name: payload.name,

    id,
    icon: payload.icon ? bot.utils.iconHashToBigInt(payload.icon) : undefined,
    ownerUserId: bot.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      // TODO: think about this seems useless to add ["*"] to everything
      permissions: member.permissions,
      // TODO: think about this seems useless to add another id here when its also on the one above
      teamId: id,
      user: bot.transformers.user(bot, member.user),
    })),
  };
}

export interface DiscordenoTeam {
  /** A hash of the image of the team's icon */
  icon?: bigint;
  /** The unique id of the team */
  id: bigint;
  /** The members of the team */
  members: {
    /** The user's membership state on the team */
    membershipState: TeamMembershipStates;
    /** Will always be `["*"]` */
    permissions: "*"[];
    /** The id of the parent team of which they are a member */
    teamId: bigint;
    /** The avatar, discriminator, id, and username of the user */
    user: Partial<DiscordenoUser>;
  }[];
  /** The name of the team */
  name: string;
  /** The user id of the current team owner */
  ownerUserId: bigint;
}
