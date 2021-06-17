import { DiscordMessageStickerFormatTypes } from "./message_sticker_format_types.ts";
import type { User } from "../users/user.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export interface MessageSticker {
  /** id of the sticker */
  id: string;
  /** id of the pack the sticker is from */
  packId: string;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** A comma-separated list of tags for the sticker */
  tags?: string;
  /**
   * Sticker asset hash
   * Note: The URL for fetching sticker assets is currently private.
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
