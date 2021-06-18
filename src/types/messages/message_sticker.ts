import { DiscordMessageStickerFormatTypes } from "./message_sticker_format_types.ts";
import type { User } from "../users/user.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export interface MessageSticker {
  /** Id of the sticker */
  id: string;
  /** Id of the pack the sticker is from */
  packId?: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** For guild stickers, a unicode emoji representing the sticker's expression. For Nitro stickers, a comma-separated list of related expressions */
  tags: string;
  /**
   * Sticker asset hash
   * Note: The URL for fetching sticker assets is currently private.
   * @deprecated the value of the asset field will an empty string.
   */
  asset: string;
  /** Type of sticker format */
  formatType: DiscordMessageStickerFormatTypes;
  /**  Whether or not the sticker is available */
  available?: boolean;
  /** Id of the guild that owns this sticker */
  guildId?: string;
  /** The user that uploaded the sticker */
  user?: User;
  /** A sticker's sort order within a pack */
  sortValue?: number;
}
