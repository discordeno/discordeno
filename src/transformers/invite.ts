import { Bot } from "../bot.ts";
import { InviteCreate, DiscordTargetTypes, User, Application } from "../types/mod.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoApplication } from "./application.ts";
import { DiscordenoUser } from "./member.ts";

export function transformInvite(bot: Bot, invite: SnakeCasedPropertiesDeep<InviteCreate>): DiscordenoInvite {
  return {
    /** The channel the invite is for */
    channelId: bot.transformers.snowflake(invite.channel_id),
    /** The unique invite code */
    code: invite.code,
    /** The time at which the invite was created */
    createdAt: Date.parse(invite.created_at),
    /** The guild of the invite */
    guildId: invite.guild_id ? bot.transformers.snowflake(invite.guild_id) : undefined,
    /** The user that created the invite */
    inviter: invite.inviter ? bot.transformers.user(bot, invite.inviter) : undefined,
    /** How long the invite is valid for (in seconds) */
    maxAge: invite.max_age,
    /** The maximum number of times the invite can be used */
    maxUses: invite.max_uses,
    /** The type of target for this voice channel invite */
    targetType: invite.target_type,
    /** The target user for this invite */
    targetUser: invite.target_user ? bot.transformers.user(bot, invite.target_user) : undefined,
    /** The embedded application to open for this voice channel embedded application invite */
    targetApplication: invite.target_application
    // @ts-ignore should not break anything even though its partial. if it does blame wolf :)
      ? bot.transformers.application(bot, invite.target_application)
      : undefined,
    /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
    temporary: invite.temporary,
    /** How many times the invite has been used (always will be 0) */
    uses: invite.uses,
  };
}

export interface DiscordenoInvite {
  /** The channel the invite is for */
  channelId: bigint;
  /** The unique invite code */
  code: string;
  /** The time at which the invite was created */
  createdAt: number;
  /** The guild of the invite */
  guildId?: bigint;
  /** The user that created the invite */
  inviter?: DiscordenoUser;
  /** How long the invite is valid for (in seconds) */
  maxAge: number;
  /** The maximum number of times the invite can be used */
  maxUses: number;
  /** The type of target for this voice channel invite */
  targetType: DiscordTargetTypes;
  /** The target user for this invite */
  targetUser?: DiscordenoUser;
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Partial<DiscordenoApplication>;
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** How many times the invite has been used (always will be 0) */
  uses: number;
}
