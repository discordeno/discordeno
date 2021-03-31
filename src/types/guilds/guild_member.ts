import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";

export interface GuildMember {
  /** The user this guild member represents */
  user?: User;
  /** This users guild nickname */
  nick?: string | null;
  /** Array of role object ids */
  roles: string[];
  /** When the user joined the guild */
  joinedAt: string;
  /** When the user started boosing the guild */
  premiumSince?: string | null;
  /** Whether the user is deafened in voice channels */
  deaf: boolean;
  /** Whether the user is muted in voice channels */
  mute: boolean;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
  // TODO: maybe an InteractionMember interface?
  /** Total permissions of the member in the channel, including overrides, returned when in the interaction object */
  permissions?: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export type DiscordGuildMember = SnakeCaseProps<GuildMember>;
