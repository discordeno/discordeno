import { Emoji } from "../emojis/emoji.ts";
import { GuildFeatures } from "./guildFeatures.ts";
import { Sticker } from "../stickers/sticker.ts";

/** https://discord.com/developers/docs/resources/guild#guild-preview-object */
export interface GuildPreview {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characters) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash */
  discoverySplash: string | null;
  /** Custom guild emojis */
  emojis: Emoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Approximate number of members in this guild */
  approximateMemberCount: number;
  /** Approximate number of online members in this guild */
  approximatePresenceCount: number;
  /** The description for the guild, if the guild is discoverable */
  description: string | null;
  /** Custom guild stickers */
  stickers: Sticker[];
}
