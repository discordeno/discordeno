import { Bot } from "../bot.ts";
import { DiscordTeam } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformTeam(bot: Bot, payload: DiscordTeam) {
  const id = bot.transformers.snowflake(payload.id);

  return {
    name: payload.name,

    id,
    icon: payload.icon ? bot.utils.iconHashToBigInt(payload.icon) : undefined,
    ownerUserId: bot.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: id,
      user: bot.transformers.user(bot, member.user),
    })),
  };
}

export interface Team extends Optionalize<ReturnType<typeof transformTeam>> {}
