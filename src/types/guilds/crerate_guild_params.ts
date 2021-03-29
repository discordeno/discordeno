import { Channel } from "../channels/channel.ts";
import { SnakeCaseProps } from "../util.ts";
import { DefaultMessageNotificationLevel } from "./default_message_notification_level.ts";
import { ExplicitContentFilterLevel } from "./explicit_content_filter_level.ts";
import { VerificationLevel } from "./verification_level.ts";

export interface CreateGuildParams {
  /** Name of the guild (2-100 characters) */
  name: string;
  /** Voice region id */
  region?: string;
  /** Base64 128x128 image for the guild icon */
  icon?: string;
  /** Verification level */
  verificationLevel?: VerificationLevel;
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevel;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevel;
  /** New guild roles (first role is the everyone role) */
  roles?: Role[];
  /** New guild's channels */
  channels?: Partial<Channel>[];
  /** Id for afk channel */
  afkChannelId?: string;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string;
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export type DiscordCreateGuildParams = SnakeCaseProps<CreateGuildParams>;
