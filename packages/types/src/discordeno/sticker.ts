/** Types for: https://docs.discord.com/developers/resources/sticker */

import type { FileContent } from './reference.js';

/** https://docs.discord.com/developers/resources/sticker#create-guild-sticker-form-params */
export interface CreateGuildStickerOptions {
  /**
   * Name of the sticker
   *
   * @remarks
   * Between 2-30 characters.
   */
  name: string;
  /**
   * Description of the sticker
   *
   * @remarks
   * Empty or 2-100 characters.
   */
  description: string;
  /**
   * Autocomplete/suggestion tags for the sticker
   *
   * @remarks
   * Maximum 200 characters.
   */
  tags: string;
  /**
   * The sticker file to upload
   *
   * @remarks
   * Maximum 512 KB.
   *
   * Must be a PNG, APNG, or Lottie JSON file.
   */
  file: FileContent;
}

/** https://docs.discord.com/developers/resources/sticker#modify-guild-sticker-json-params */
export interface EditGuildStickerOptions {
  /**
   * Name of the sticker
   *
   * @remarks
   * Between 2-30 characters.
   */
  name?: string;
  /**
   * Description of the sticker
   *
   * @remarks
   * Empty or 2-100 characters.
   */
  description?: string | null;
  /**
   * Autocomplete/suggestion tags for the sticker
   *
   * @remarks
   * Maximum 200 characters.
   */
  tags?: string;
}
