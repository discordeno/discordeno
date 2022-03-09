import { DiscordApplication, DiscordUser } from "../discord.ts";
import { TargetTypes } from "./targetTypes.ts";

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export interface InviteCreate {
  /** The channel the invite is for */
  channelId: string;
  /** The unique invite code */
  code: string;
  /** The time at which the invite was created */
  createdAt: string;
  /** The guild of the invite */
  guildId?: string;
  /** The user that created the invite */
  inviter?: DiscordUser;
  /** How long the invite is valid for (in seconds) */
  maxAge: number;
  /** The maximum number of times the invite can be used */
  maxUses: number;
  /** The type of target for this voice channel invite */
  targetType: TargetTypes;
  /** The target user for this invite */
  targetUser?: DiscordUser;
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Partial<DiscordApplication>;
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean;
  /** How many times the invite has been used (always will be 0) */
  uses: number;
}
