import { Channel } from "../channels/channel.ts";
import { Guild } from "../guilds/guild.ts";
import { TargetTypes } from "./targetTypes.ts";
import { InviteStageInstance } from "./inviteStageInstance.ts";
import { ScheduledEvent } from "../guilds/scheduledEvents.ts";
import { DiscordApplication, DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface Invite {
  /** The invite code (unique Id) */
  code: string;
  /** The guild this invite is for */
  guild?: Partial<Guild>;
  /** The channel this invite is for */
  channel: Partial<Channel> | null;
  /** The user who created the invite */
  inviter?: DiscordUser;
  /** The type of target for this voice channel invite */
  targetType?: TargetTypes;
  /** The target user for this invite */
  targetUser?: DiscordUser;
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Partial<DiscordApplication>;
  /** Approximate count of online members (only present when target_user is set) */
  approximatePresenceCount?: number;
  /** Approximate count of total members */
  approximateMemberCount?: number;
  /** The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true` */
  expiresAt?: string | null;
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stageInstance?: InviteStageInstance;
  /** guild scheduled event data */
  guildScheduledEvent?: ScheduledEvent;
}
