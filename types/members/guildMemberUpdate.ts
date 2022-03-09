import { DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export interface GuildMemberUpdate {
  /** The id of the guild */
  guildId: string;
  /** User role ids */
  roles: string[];
  /** The user */
  user: DiscordUser;
  /** Nickname of the user in the guild */
  nick?: string | null;
  /** the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting) */
  avatar: string;
  /** When the user joined the guild */
  joinedAt: string;
  /** When the user starting boosting the guild */
  premiumSince?: string | null;
  /** whether the user is deafened in voice channels */
  deaf?: boolean;
  /** whether the user is muted in voice channels */
  mute?: boolean;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
  /** when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
  communicationDisabledUntil?: string;
}
