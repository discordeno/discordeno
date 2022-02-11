import { Channel } from "../channels/channel.ts";
import { Role } from "../permissions/role.ts";
import { DefaultMessageNotificationLevels } from "./defaultMessageNotificationLevels.ts";
import { ExplicitContentFilterLevels } from "./explicitContentFilterLevels.ts";
import { SystemChannelFlags } from "./systemChannelFlags.ts";
import { VerificationLevels } from "./verificationLevels.ts";

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string;
  /** Base64 128x128 image for the guild icon */
  icon?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels;
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels;
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
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags;
}
