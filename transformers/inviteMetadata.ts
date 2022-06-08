import { Bot } from "../bot.ts";
import { DiscordInviteMetadata } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformInviteMetadata(bot: Bot, invite: DiscordInviteMetadata) {
  const transformedInvite = {
    ...bot.transformers.invite(bot, invite),
    uses: invite.uses,
    maxUses: invite.max_uses,
    maxAge: invite.max_age,
    temporary: invite.temporary,
    createdAt: invite.created_at ? Date.parse(invite.created_at) : undefined,
  };

  return transformedInvite as Optionalize<typeof transformedInvite>;
}

export interface InviteMetadata extends ReturnType<typeof transformInviteMetadata> {}
